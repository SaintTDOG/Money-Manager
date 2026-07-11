CREATE TABLE IF NOT EXISTS transactions (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  entity        TEXT NOT NULL CHECK (entity IN ('personal','business')),
  date          TEXT NOT NULL,
  description   TEXT,
  vendor        TEXT,
  amount_cents  INTEGER NOT NULL,
  gst_cents     INTEGER NOT NULL DEFAULT 0,
  category      TEXT,
  source        TEXT NOT NULL CHECK (source IN ('typed','csv','receipt')),
  source_ref    TEXT,
  receipt_path  TEXT,
  notes         TEXT,
  xero_pushed   INTEGER NOT NULL DEFAULT 0,
  xero_id       TEXT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_tx_entity_date ON transactions(entity, date);
CREATE INDEX IF NOT EXISTS idx_tx_category ON transactions(category);
CREATE INDEX IF NOT EXISTS idx_tx_vendor ON transactions(vendor);

CREATE TABLE IF NOT EXISTS categories (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  entity            TEXT NOT NULL CHECK (entity IN ('personal','business')),
  name              TEXT NOT NULL,
  gst_default       INTEGER NOT NULL DEFAULT 0,
  xero_account_code TEXT,
  UNIQUE(entity, name)
);

CREATE TABLE IF NOT EXISTS receipts (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  path           TEXT NOT NULL,
  sha256         TEXT NOT NULL UNIQUE,
  extracted_json TEXT,
  created_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS csv_imports (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  path           TEXT NOT NULL,
  sha256         TEXT NOT NULL UNIQUE,
  rows_imported  INTEGER NOT NULL DEFAULT 0,
  imported_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT
);
