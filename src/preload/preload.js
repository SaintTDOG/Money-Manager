const { contextBridge, ipcRenderer } = require('electron');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt({ html: false, linkify: true, breaks: true });

contextBridge.exposeInMainWorld('pip', {
  renderMarkdown: (text) => md.render(String(text || '')),
  getSettings: () => ipcRenderer.invoke('pip:get-settings'),
  saveSettings: (patch) => ipcRenderer.invoke('pip:save-settings', patch),
  chat: (text) => ipcRenderer.invoke('pip:chat', { text }),
  chatClear: () => ipcRenderer.invoke('pip:chat-clear'),
  reviewRespond: (payload) => ipcRenderer.send('pip:review-response', payload),
  commitBatch: (payload) => ipcRenderer.invoke('pip:commit-batch', payload),
  commitTransaction: (draft) => ipcRenderer.invoke('pip:commit-transaction', draft),
  listCategories: (entity) => ipcRenderer.invoke('pip:list-categories', entity),
  query: (params) => ipcRenderer.invoke('pip:query', params),
  sumByCategory: (params) => ipcRenderer.invoke('pip:sum-by-category', params),
  basSummary: (payload) => ipcRenderer.invoke('pip:bas-summary', payload),
  currentQuarter: () => ipcRenderer.invoke('pip:current-quarter'),
  monthly: (params) => ipcRenderer.invoke('pip:monthly', params),
  eofy: (params) => ipcRenderer.invoke('pip:eofy', params),
  pickFolder: () => ipcRenderer.invoke('pip:pick-folder'),
  expand: (expanded) => ipcRenderer.send('pip:expand', expanded),
  move: (pos) => ipcRenderer.send('pip:move', pos),
  xeroStatus: () => ipcRenderer.invoke('pip:xero-status'),
  onReviewRequest: (cb) => ipcRenderer.on('pip:review-request', (_e, payload) => cb(payload)),
  onCsvReady: (cb) => ipcRenderer.on('pip:csv-ready', (_e, payload) => cb(payload)),
  onReceiptReady: (cb) => ipcRenderer.on('pip:receipt-ready', (_e, payload) => cb(payload)),
});
