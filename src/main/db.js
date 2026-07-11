const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3');

let db = null;

function open(dbPath) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  const sql = fs.readFileSync(
    path.join(__dirname, '..', '..', 'migrations', '001_init.sql'),
    'utf8'
  );
  db.exec(sql);
  return db;
}

function get() {
  if (!db) throw new Error('DB not initialised. Call open() first.');
  return db;
}

function seedCategories(categories) {
  const stmt = db.prepare(
    'INSERT OR IGNORE INTO categories (entity, name, gst_default) VALUES (?, ?, ?)'
  );
  const tx = db.transaction((rows) => {
    for (const r of rows) stmt.run(r.entity, r.name, r.gst_default ? 1 : 0);
  });
  tx(categories);
}

function listCategories(entity) {
  return db
    .prepare('SELECT id, entity, name, gst_default, xero_account_code FROM categories WHERE entity = ? ORDER BY name')
    .all(entity);
}

function upsertCategory({ entity, name, gst_default = 0, xero_account_code = null }) {
  const stmt = db.prepare(
    `INSERT INTO categories (entity, name, gst_default, xero_account_code)
     VALUES (@entity, @name, @gst_default, @xero_account_code)
     ON CONFLICT(entity, name) DO UPDATE SET
       gst_default = excluded.gst_default,
       xero_account_code = excluded.xero_account_code`
  );
  return stmt.run({ entity, name, gst_default: gst_default ? 1 : 0, xero_account_code });
}

function insertTransaction(tx) {
  const stmt = db.prepare(
    `INSERT INTO transactions
       (entity, date, description, vendor, amount_cents, gst_cents, category,
        source, source_ref, receipt_path, notes)
     VALUES
       (@entity, @date, @description, @vendor, @amount_cents, @gst_cents, @category,
        @source, @source_ref, @receipt_path, @notes)`
  );
  const result = stmt.run({
    description: null,
    vendor: null,
    gst_cents: 0,
    category: 'Uncategorised',
    source_ref: null,
    receipt_path: null,
    notes: null,
    ...tx,
  });
  return { id: result.lastInsertRowid };
}

function insertTransactionsBulk(rows) {
  const stmt = db.prepare(
    `INSERT INTO transactions
       (entity, date, description, vendor, amount_cents, gst_cents, category,
        source, source_ref, receipt_path, notes)
     VALUES
       (@entity, @date, @description, @vendor, @amount_cents, @gst_cents, @category,
        @source, @source_ref, @receipt_path, @notes)`
  );
  const insertMany = db.transaction((items) => {
    const ids = [];
    for (const t of items) {
      const r = stmt.run({
        description: null,
        vendor: null,
        gst_cents: 0,
        category: 'Uncategorised',
        source_ref: null,
        receipt_path: null,
        notes: null,
        ...t,
      });
      ids.push(r.lastInsertRowid);
    }
    return ids;
  });
  return insertMany(rows);
}

function queryTransactions({ entity, from, to, category, vendor, minCents, maxCents, limit = 500 } = {}) {
  const where = [];
  const params = {};
  if (entity) { where.push('entity = @entity'); params.entity = entity; }
  if (from) { where.push('date >= @from'); params.from = from; }
  if (to) { where.push('date <= @to'); params.to = to; }
  if (category) { where.push('category = @category'); params.category = category; }
  if (vendor) { where.push('vendor LIKE @vendor'); params.vendor = `%${vendor}%`; }
  if (minCents != null) { where.push('amount_cents >= @minCents'); params.minCents = minCents; }
  if (maxCents != null) { where.push('amount_cents <= @maxCents'); params.maxCents = maxCents; }
  const sql = `SELECT * FROM transactions
     ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
     ORDER BY date DESC, id DESC
     LIMIT ${Number(limit)}`;
  return db.prepare(sql).all(params);
}

function sumByCategory({ entity, from, to } = {}) {
  const where = [];
  const params = {};
  if (entity) { where.push('entity = @entity'); params.entity = entity; }
  if (from) { where.push('date >= @from'); params.from = from; }
  if (to) { where.push('date <= @to'); params.to = to; }
  const sql = `SELECT category, SUM(amount_cents) AS total_cents, SUM(gst_cents) AS gst_cents, COUNT(*) AS n
    FROM transactions
    ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
    GROUP BY category
    ORDER BY total_cents DESC`;
  return db.prepare(sql).all(params);
}

function alreadyImported(sha256) {
  return db.prepare('SELECT id FROM csv_imports WHERE sha256 = ?').get(sha256);
}

function recordCsvImport({ path: p, sha256, rows_imported }) {
  db.prepare(
    'INSERT INTO csv_imports (path, sha256, rows_imported) VALUES (?, ?, ?)'
  ).run(p, sha256, rows_imported);
}

function receiptSeen(sha256) {
  return db.prepare('SELECT id FROM receipts WHERE sha256 = ?').get(sha256);
}

function recordReceipt({ path: p, sha256, extracted_json }) {
  const r = db.prepare(
    'INSERT INTO receipts (path, sha256, extracted_json) VALUES (?, ?, ?)'
  ).run(p, sha256, JSON.stringify(extracted_json));
  return { id: r.lastInsertRowid };
}

module.exports = {
  open,
  get,
  seedCategories,
  listCategories,
  upsertCategory,
  insertTransaction,
  insertTransactionsBulk,
  queryTransactions,
  sumByCategory,
  alreadyImported,
  recordCsvImport,
  receiptSeen,
  recordReceipt,
};
