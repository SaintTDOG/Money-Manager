const Anthropic = require('@anthropic-ai/sdk');
const settings = require('./settings');
const db = require('./db');
const bas = require('./bas');

const MODEL = 'claude-sonnet-5';
const MAX_HISTORY = 20;

const SYSTEM_PROMPT = `You are Pip, a warm, meticulous bookkeeper who lives as a small blob character on the user's screen. You keep two sets of books: **personal** and **business** (strictly separate). You use Australian English spellings. Amounts are always in AUD, stored internally as integer cents. Signs: negative = money out (expense), positive = money in (income/refund).

How you work:
- When the user tells you about a transaction ("$47 fuel BP today, business"), call **propose_transaction** with your best parse. Never save silently — the tool surfaces a review dialog. You will get back {action: 'approved' | 'edited' | 'rejected', transaction: {...}} and should respond briefly.
- When the user asks about their books, use the read-only tools (query_transactions, sum_by_category, bas_summary, list_categories). Never invent figures.
- If entity (personal vs business) or amount is missing, ask one short clarifying question. Otherwise infer sensibly: today's date if none given; GST = amount / 11 for business rows in a GST-liable category; personal rows have gst_cents = 0.
- Be brief. One or two short sentences plus a tool call. Do not narrate what you're about to do.

AU tax: GST rate 10%. Users' totals are GST-inclusive unless they say otherwise. GST component of a GST-inclusive total = round(total_cents / 11).

Categories you may use:
- business: Sales, Cost of Goods Sold, Motor Vehicle, Fuel, Office Supplies, Software & Subscriptions, Telephone & Internet, Advertising & Marketing, Professional Fees, Bank Fees, Rent, Utilities, Repairs & Maintenance, Travel, Meals & Entertainment, Insurance, Wages, Superannuation, Tax Payments, Uncategorised.
- personal: Groceries, Fuel, Dining Out, Coffee, Rent / Mortgage, Utilities, Phone & Internet, Streaming & Subscriptions, Health, Fitness, Transport, Travel & Holidays, Shopping, Gifts & Donations, Household, Kids, Income, Savings & Investments, Bank Fees, Uncategorised.

Tone: warm, tidy, quietly celebratory. No emoji. Sign off with "— Pip" only on longer messages.`;

const TOOLS = [
  {
    name: 'propose_transaction',
    description: 'Show the user a review dialog for a new transaction they described. They can approve, edit, or reject. The tool result tells you what they did.',
    input_schema: {
      type: 'object',
      required: ['entity', 'date', 'amount_cents'],
      properties: {
        entity: { type: 'string', enum: ['personal', 'business'] },
        date: { type: 'string', description: 'YYYY-MM-DD' },
        vendor: { type: 'string' },
        description: { type: 'string' },
        amount_cents: { type: 'integer', description: 'Signed AUD cents. Negative for expenses, positive for income.' },
        gst_cents: { type: 'integer', description: 'GST component in cents, same sign as amount_cents. 0 for personal or GST-exempt.' },
        category: { type: 'string' },
        notes: { type: 'string' },
      },
    },
  },
  {
    name: 'query_transactions',
    description: 'Read-only search of the ledger. Returns matching rows.',
    input_schema: {
      type: 'object',
      properties: {
        entity: { type: 'string', enum: ['personal', 'business'] },
        from: { type: 'string', description: 'YYYY-MM-DD lower bound (inclusive)' },
        to: { type: 'string', description: 'YYYY-MM-DD upper bound (inclusive)' },
        category: { type: 'string' },
        vendor: { type: 'string' },
        limit: { type: 'integer', default: 25 },
      },
    },
  },
  {
    name: 'sum_by_category',
    description: 'Totals per category for a period.',
    input_schema: {
      type: 'object',
      properties: {
        entity: { type: 'string', enum: ['personal', 'business'] },
        from: { type: 'string' },
        to: { type: 'string' },
      },
    },
  },
  {
    name: 'list_categories',
    description: 'List available categories for an entity.',
    input_schema: {
      type: 'object',
      required: ['entity'],
      properties: { entity: { type: 'string', enum: ['personal', 'business'] } },
    },
  },
  {
    name: 'bas_summary',
    description: 'Compute G1 (total sales), 1A (GST on sales), 1B (GST on purchases) for a BAS quarter.',
    input_schema: {
      type: 'object',
      required: ['quarter', 'year'],
      properties: {
        quarter: { type: 'integer', minimum: 1, maximum: 4 },
        year: { type: 'integer' },
      },
    },
  },
];

function client() {
  const apiKey = settings.get('apiKey');
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set. Open Settings and paste your key.');
  return new Anthropic({ apiKey });
}

async function runReadOnlyTool(name, input) {
  switch (name) {
    case 'query_transactions':
      return db.queryTransactions({
        entity: input.entity,
        from: input.from,
        to: input.to,
        category: input.category,
        vendor: input.vendor,
        limit: input.limit || 25,
      });
    case 'sum_by_category':
      return db.sumByCategory({ entity: input.entity, from: input.from, to: input.to });
    case 'list_categories':
      return db.listCategories(input.entity);
    case 'bas_summary':
      return bas.summary(input.quarter, input.year);
    default:
      throw new Error(`Unknown read-only tool: ${name}`);
  }
}

/**
 * chat(messagesHistory, userText, { onProposeTransaction })
 *   messagesHistory: array of {role, content} in Anthropic format (persists across calls)
 *   onProposeTransaction: async ({draft}) => ({action, transaction})  (main.js wires this to renderer IPC)
 *   returns: { text, history } — assistant final text, updated history (capped)
 */
async function chat(history, userText, { onProposeTransaction }) {
  const c = client();
  const msgs = [...history, { role: 'user', content: userText }];

  let finalText = '';
  // Cap loop iterations defensively.
  for (let step = 0; step < 12; step++) {
    const resp = await c.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: [{
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      }],
      tools: TOOLS,
      messages: msgs,
    });

    // Collect assistant text so far.
    const assistantBlocks = resp.content;
    msgs.push({ role: 'assistant', content: assistantBlocks });

    if (resp.stop_reason !== 'tool_use') {
      finalText = assistantBlocks
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('\n')
        .trim();
      break;
    }

    // Execute each tool_use block, gather tool_result blocks.
    const toolResults = [];
    for (const block of assistantBlocks) {
      if (block.type !== 'tool_use') continue;
      let result;
      let isError = false;
      try {
        if (block.name === 'propose_transaction') {
          const decision = await onProposeTransaction({ draft: block.input });
          result = decision;
        } else {
          result = await runReadOnlyTool(block.name, block.input);
        }
      } catch (err) {
        isError = true;
        result = { error: String(err && err.message || err) };
      }
      toolResults.push({
        type: 'tool_result',
        tool_use_id: block.id,
        content: JSON.stringify(result),
        is_error: isError,
      });
    }
    msgs.push({ role: 'user', content: toolResults });
  }

  // Cap history to avoid unbounded growth.
  const capped = msgs.slice(-MAX_HISTORY);
  return { text: finalText || '…', history: capped };
}

module.exports = { chat };
