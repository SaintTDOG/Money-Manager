const path = require('node:path');
const fs = require('node:fs');
const { app, BrowserWindow, ipcMain, dialog, screen } = require('electron');

const settings = require('./settings');
const db = require('./db');
const bas = require('./bas');
const reports = require('./reports');
const claude = require('./claude');
const csv = require('./csv');
const receipts = require('./receipts');
const watchers = require('./watchers');
const xero = require('./xero');

let mainWindow = null;
let chatHistory = [];              // in-memory Anthropic messages history
const pendingReviews = new Map();  // requestId -> resolver from onProposeTransaction

const IDLE_SIZE = { width: 160, height: 160 };
const EXPANDED_SIZE = { width: 460, height: 640 };

function seedCategoriesFromJson() {
  const bizPath = path.join(__dirname, '..', '..', 'categories', 'business.json');
  const perPath = path.join(__dirname, '..', '..', 'categories', 'personal.json');
  const biz = JSON.parse(fs.readFileSync(bizPath, 'utf8'))
    .map((c) => ({ entity: 'business', name: c.name, gst_default: c.gst_default }));
  const per = JSON.parse(fs.readFileSync(perPath, 'utf8'))
    .map((c) => ({ entity: 'personal', name: c.name, gst_default: c.gst_default }));
  db.seedCategories([...biz, ...per]);
}

function createWindow() {
  const pos = settings.get('blobPosition') || { x: 40, y: 40 };
  mainWindow = new BrowserWindow({
    width: IDLE_SIZE.width,
    height: IDLE_SIZE.height,
    x: pos.x,
    y: pos.y,
    frame: false,
    transparent: true,
    hasShadow: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    fullscreenable: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });
  mainWindow.setAlwaysOnTop(true, 'floating');
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('move', () => {
    const [x, y] = mainWindow.getPosition();
    settings.set('blobPosition', { x, y });
  });
}

async function onProposeTransaction({ draft }) {
  const requestId = `rev_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
  return new Promise((resolve) => {
    pendingReviews.set(requestId, resolve);
    mainWindow.webContents.send('pip:review-request', { requestId, draft });
  });
}

function bootWatchers() {
  const csvFolder = settings.get('csvDropFolder');
  const rcpFolder = settings.get('receiptsFolder');
  watchers.watch({
    id: 'csv',
    folder: csvFolder,
    patterns: ['.csv'],
    onFile: async (p) => {
      const result = await csv.importCsv(p);
      if (result.skipped) return;
      mainWindow.webContents.send('pip:csv-ready', result);
    },
  });
  watchers.watch({
    id: 'receipts',
    folder: rcpFolder,
    patterns: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf'],
    onFile: async (p) => {
      const result = await receipts.extractReceipt(p);
      if (result.skipped) return;
      mainWindow.webContents.send('pip:receipt-ready', result);
    },
  });
}

function registerIpc() {
  ipcMain.handle('pip:get-settings', () => settings.all());
  ipcMain.handle('pip:save-settings', (_e, patch) => {
    for (const [k, v] of Object.entries(patch)) settings.set(k, v);
    bootWatchers();
    return settings.all();
  });

  ipcMain.handle('pip:chat', async (_e, { text }) => {
    try {
      const { text: reply, history } = await claude.chat(chatHistory, text, {
        onProposeTransaction,
      });
      chatHistory = history;
      return { text: reply };
    } catch (err) {
      return { error: String(err && err.message || err) };
    }
  });
  ipcMain.handle('pip:chat-clear', () => { chatHistory = []; return true; });

  ipcMain.on('pip:review-response', (_e, { requestId, action, transaction }) => {
    const resolve = pendingReviews.get(requestId);
    if (!resolve) return;
    pendingReviews.delete(requestId);
    if (action === 'approved' || action === 'edited') {
      try {
        const { id } = db.insertTransaction({ ...transaction, source: transaction.source || 'typed' });
        resolve({ action, transaction: { ...transaction, id } });
      } catch (err) {
        resolve({ action: 'error', error: String(err && err.message || err) });
      }
    } else {
      resolve({ action: 'rejected' });
    }
  });

  ipcMain.handle('pip:commit-batch', (_e, { path: p, sha, drafts }) => {
    return csv.commitImport({ path: p, sha, drafts });
  });
  ipcMain.handle('pip:commit-transaction', (_e, draft) => {
    return db.insertTransaction({ ...draft, source: draft.source || 'typed' });
  });

  ipcMain.handle('pip:list-categories', (_e, entity) => db.listCategories(entity));
  ipcMain.handle('pip:query', (_e, params) => db.queryTransactions(params || {}));
  ipcMain.handle('pip:sum-by-category', (_e, params) => db.sumByCategory(params || {}));
  ipcMain.handle('pip:bas-summary', (_e, { quarter, fyEndYear }) => bas.summary(quarter, fyEndYear));
  ipcMain.handle('pip:current-quarter', () => bas.currentQuarter());
  ipcMain.handle('pip:monthly', (_e, params) => reports.monthlySummary(params || {}));
  ipcMain.handle('pip:eofy', (_e, params) => reports.eofySummary(params));

  ipcMain.handle('pip:pick-folder', async () => {
    const r = await dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] });
    if (r.canceled || !r.filePaths.length) return null;
    return r.filePaths[0];
  });

  ipcMain.on('pip:expand', (_e, expanded) => {
    const target = expanded ? EXPANDED_SIZE : IDLE_SIZE;
    if (!mainWindow) return;
    const [x, y] = mainWindow.getPosition();
    mainWindow.setBounds({ x, y, width: target.width, height: target.height }, true);
  });

  ipcMain.on('pip:move', (_e, { x, y }) => {
    if (!mainWindow) return;
    const displays = screen.getAllDisplays();
    const primary = displays[0].workArea;
    const clampedX = Math.max(primary.x, Math.min(primary.x + primary.width - IDLE_SIZE.width, x));
    const clampedY = Math.max(primary.y, Math.min(primary.y + primary.height - IDLE_SIZE.height, y));
    mainWindow.setPosition(Math.round(clampedX), Math.round(clampedY));
  });

  ipcMain.handle('pip:xero-status', () => ({ connected: xero.isConnected(), note: 'Xero sync coming later.' }));
}

async function boot() {
  await settings.init();
  const userData = app.getPath('userData');
  db.open(path.join(userData, 'pip.db'));
  seedCategoriesFromJson();
  registerIpc();
  createWindow();
  bootWatchers();
}

app.whenReady().then(boot);

app.on('window-all-closed', () => {
  watchers.stopAll();
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
