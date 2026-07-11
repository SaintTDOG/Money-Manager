const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const Anthropic = require('@anthropic-ai/sdk');
const settings = require('./settings');
const db = require('./db');

const MODEL = 'claude-sonnet-5';

const EXTRACT_TOOL = {
  name: 'extract_receipt',
  description: 'Extract structured fields from a scanned receipt or invoice.',
  input_schema: {
    type: 'object',
    required: ['date', 'total_cents'],
    properties: {
      vendor: { type: 'string' },
      date: { type: 'string', description: 'YYYY-MM-DD' },
      total_cents: { type: 'integer', description: 'Total in AUD cents, positive (this represents an expense).' },
      gst_cents: { type: 'integer', description: 'GST portion in AUD cents (0 if not shown).' },
      description: { type: 'string' },
      suggested_category: { type: 'string' },
      likely_entity: { type: 'string', enum: ['personal', 'business'] },
      confidence: { type: 'number' },
    },
  },
};

function sha256File(p) {
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

function mediaType(p) {
  const ext = path.extname(p).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.pdf') return 'application/pdf';
  return null;
}

async function extractReceipt(filePath) {
  const abs = path.resolve(filePath);
  const sha = sha256File(abs);
  const existing = db.receiptSeen(sha);
  if (existing) return { skipped: true, reason: 'already-processed', path: abs };

  const apiKey = settings.get('apiKey');
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set.');

  const mt = mediaType(abs);
  if (!mt) return { skipped: true, reason: 'unsupported-type', path: abs };

  const data = fs.readFileSync(abs).toString('base64');
  const client = new Anthropic({ apiKey });

  const contentBlock = mt === 'application/pdf'
    ? { type: 'document', source: { type: 'base64', media_type: mt, data } }
    : { type: 'image', source: { type: 'base64', media_type: mt, data } };

  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    tools: [EXTRACT_TOOL],
    tool_choice: { type: 'tool', name: 'extract_receipt' },
    messages: [{
      role: 'user',
      content: [
        contentBlock,
        { type: 'text', text: 'Extract the receipt fields. Amounts are in AUD. If the receipt shows a GST amount explicitly, use it; otherwise leave gst_cents at round(total_cents/11) if GST is mentioned as included, else 0.' },
      ],
    }],
  });

  const toolUse = resp.content.find((b) => b.type === 'tool_use');
  if (!toolUse) throw new Error('Claude did not return an extract_receipt tool call.');
  const extracted = toolUse.input;

  db.recordReceipt({ path: abs, sha256: sha, extracted_json: extracted });

  // Present as an expense draft (negative amount) for review.
  const draft = {
    entity: extracted.likely_entity || 'business',
    date: extracted.date,
    vendor: extracted.vendor || null,
    description: extracted.description || null,
    amount_cents: -Math.abs(Number(extracted.total_cents) || 0),
    gst_cents: -Math.abs(Number(extracted.gst_cents) || 0),
    category: extracted.suggested_category || 'Uncategorised',
    source: 'receipt',
    source_ref: abs,
    receipt_path: abs,
    notes: null,
  };

  return { skipped: false, path: abs, sha, draft, confidence: extracted.confidence };
}

module.exports = { extractReceipt };
