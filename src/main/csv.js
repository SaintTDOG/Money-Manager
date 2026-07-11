const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const { parse } = require('csv-parse/sync');
const Anthropic = require('@anthropic-ai/sdk');
const settings = require('./settings');
const db = require('./db');

const MODEL = 'claude-sonnet-5';

function sha256File(p) {
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

function pickCol(headers, candidates) {
  const lower = headers.map((h) => (h || '').toLowerCase().trim());
  for (const c of candidates) {
    const idx = lower.findIndex((h) => h === c || h.includes(c));
    if (idx !== -1) return idx;
  }
  return -1;
}

function normaliseDate(s) {
  if (!s) return null;
  const t = s.trim();
  // ISO
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) return t.slice(0, 10);
  // DD/MM/YYYY or D/M/YY (AU default)
  const m = t.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (m) {
    const [_, d, mo, y] = m;
    const yy = y.length === 2 ? (Number(y) > 70 ? `19${y}` : `20${y}`) : y;
    return `${yy}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }
  const parsed = new Date(t);
  if (!isNaN(parsed)) return parsed.toISOString().slice(0, 10);
  return null;
}

function parseAmountCents(raw) {
  if (raw == null || raw === '') return null;
  const t = String(raw).replace(/[\$, ]/g, '').replace(/[()]/g, (m) => (m === '(' ? '-' : ''));
  const n = Number(t);
  if (isNaN(n)) return null;
  return Math.round(n * 100);
}

function readCsvRows(p) {
  const content = fs.readFileSync(p, 'utf8');
  const records = parse(content, { columns: false, skip_empty_lines: true, trim: true, relax_column_count: true });
  if (!records.length) return { headers: [], rows: [] };
  const [headers, ...rows] = records;
  return { headers, rows };
}

/**
 * Given raw CSV rows, produce normalised drafts:
 *   { date, description, amount_cents, source_ref }
 * Separate credit/debit columns are combined.
 */
function normaliseRows({ headers, rows }) {
  const iDate = pickCol(headers, ['date', 'transaction date', 'posted']);
  const iDesc = pickCol(headers, ['description', 'narration', 'details', 'transaction description', 'reference', 'memo']);
  const iAmount = pickCol(headers, ['amount', 'value']);
  const iDebit = pickCol(headers, ['debit', 'debits', 'withdrawal', 'withdrawals']);
  const iCredit = pickCol(headers, ['credit', 'credits', 'deposit', 'deposits']);

  const drafts = [];
  for (const r of rows) {
    const date = normaliseDate(r[iDate]);
    if (!date) continue;
    const desc = iDesc >= 0 ? r[iDesc] : '';
    let amount_cents = null;
    if (iAmount >= 0) {
      amount_cents = parseAmountCents(r[iAmount]);
    } else if (iDebit >= 0 || iCredit >= 0) {
      const debit = iDebit >= 0 ? parseAmountCents(r[iDebit]) : null;
      const credit = iCredit >= 0 ? parseAmountCents(r[iCredit]) : null;
      if (debit != null && debit !== 0) amount_cents = -Math.abs(debit);
      else if (credit != null && credit !== 0) amount_cents = Math.abs(credit);
    }
    if (amount_cents == null) continue;
    drafts.push({
      date,
      description: String(desc || '').trim(),
      amount_cents,
      source_ref: r.join(' | '),
    });
  }
  return drafts;
}

const CATEGORISE_TOOL = {
  name: 'categorise_batch',
  description: 'Return a categorised classification for each transaction in order.',
  input_schema: {
    type: 'object',
    required: ['items'],
    properties: {
      items: {
        type: 'array',
        items: {
          type: 'object',
          required: ['entity', 'category', 'gst_cents'],
          properties: {
            entity: { type: 'string', enum: ['personal', 'business'] },
            category: { type: 'string' },
            gst_cents: { type: 'integer', description: 'Same sign as the row amount. 0 for personal / GST-exempt.' },
            vendor: { type: 'string' },
            notes: { type: 'string' },
          },
        },
      },
    },
  },
};

async function categoriseBatch(drafts) {
  const apiKey = settings.get('apiKey');
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set.');
  if (!drafts.length) return [];
  const client = new Anthropic({ apiKey });
  const businessCats = db.listCategories('business').map((c) => c.name);
  const personalCats = db.listCategories('personal').map((c) => c.name);

  const prompt = `Categorise these ${drafts.length} bank transactions. For each, decide entity (personal or business), pick the best category from the lists, and compute the GST cents.

Business categories: ${businessCats.join(', ')}
Personal categories: ${personalCats.join(', ')}

Rules:
- amount_cents is signed (negative = expense, positive = income). gst_cents follows the same sign.
- For business rows in GST-liable categories (most except Bank Fees, Insurance, Wages, Superannuation, Tax Payments, Interest*), GST = round(amount_cents / 11).
- For personal rows, gst_cents = 0.
- If ambiguous personal vs business, default to personal.
- Preserve item order.

Transactions:
${JSON.stringify(drafts.map((d, i) => ({ i, date: d.date, description: d.description, amount_cents: d.amount_cents })), null, 0)}`;

  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    tools: [CATEGORISE_TOOL],
    tool_choice: { type: 'tool', name: 'categorise_batch' },
    messages: [{ role: 'user', content: prompt }],
  });
  const toolUse = resp.content.find((b) => b.type === 'tool_use');
  if (!toolUse) throw new Error('Claude did not return a categorise_batch tool call.');
  const items = toolUse.input.items || [];
  if (items.length !== drafts.length) {
    throw new Error(`categorise_batch returned ${items.length} items for ${drafts.length} drafts.`);
  }
  return drafts.map((d, i) => ({
    ...d,
    entity: items[i].entity,
    category: items[i].category || 'Uncategorised',
    gst_cents: Number(items[i].gst_cents) || 0,
    vendor: items[i].vendor || null,
    notes: items[i].notes || null,
    source: 'csv',
  }));
}

async function importCsv(filePath) {
  const abs = path.resolve(filePath);
  const sha = sha256File(abs);
  if (db.alreadyImported(sha)) {
    return { skipped: true, reason: 'already-imported', path: abs };
  }
  const raw = readCsvRows(abs);
  const normalised = normaliseRows(raw);
  if (!normalised.length) return { skipped: true, reason: 'no-rows-parsed', path: abs };
  const categorised = await categoriseBatch(normalised);
  return { skipped: false, path: abs, sha, drafts: categorised };
}

function commitImport({ path: p, sha, drafts }) {
  db.insertTransactionsBulk(drafts);
  db.recordCsvImport({ path: p, sha256: sha, rows_imported: drafts.length });
  return { rows_imported: drafts.length };
}

module.exports = { importCsv, commitImport };
