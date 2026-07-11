const db = require('./db');

/**
 * BAS quarter mapping (Australian FY).
 *   quarter 1: Jul–Sep of (year-1)
 *   quarter 2: Oct–Dec of (year-1)
 *   quarter 3: Jan–Mar of year
 *   quarter 4: Apr–Jun of year
 * where `year` = the calendar year the financial year ENDS
 * (so FY26 = year 2026, running Jul 2025 → Jun 2026).
 */
function quarterRange(quarter, fyEndYear) {
  const y = fyEndYear;
  const ranges = {
    1: [`${y - 1}-07-01`, `${y - 1}-09-30`],
    2: [`${y - 1}-10-01`, `${y - 1}-12-31`],
    3: [`${y}-01-01`, `${y}-03-31`],
    4: [`${y}-04-01`, `${y}-06-30`],
  };
  if (!ranges[quarter]) throw new Error(`Invalid quarter: ${quarter}`);
  return { from: ranges[quarter][0], to: ranges[quarter][1] };
}

function summary(quarter, fyEndYear) {
  const { from, to } = quarterRange(quarter, fyEndYear);
  const conn = db.get();
  const row = conn.prepare(`
    SELECT
      COALESCE(SUM(CASE WHEN amount_cents > 0 THEN amount_cents ELSE 0 END), 0) AS g1_total_sales_cents,
      COALESCE(SUM(CASE WHEN amount_cents > 0 THEN gst_cents ELSE 0 END), 0)    AS one_a_gst_on_sales_cents,
      COALESCE(SUM(CASE WHEN amount_cents < 0 THEN -gst_cents ELSE 0 END), 0)   AS one_b_gst_on_purchases_cents,
      COALESCE(SUM(CASE WHEN amount_cents < 0 THEN -amount_cents ELSE 0 END), 0) AS total_purchases_cents,
      COUNT(*) AS n_transactions
    FROM transactions
    WHERE entity = 'business' AND date >= ? AND date <= ?
  `).get(from, to);

  const net = row.one_a_gst_on_sales_cents - row.one_b_gst_on_purchases_cents;
  return {
    label: `Q${quarter} FY${String(fyEndYear).slice(-2)}`,
    from, to,
    g1_total_sales_cents: row.g1_total_sales_cents,
    one_a_gst_on_sales_cents: row.one_a_gst_on_sales_cents,
    one_b_gst_on_purchases_cents: row.one_b_gst_on_purchases_cents,
    net_gst_owing_cents: net,
    total_purchases_cents: row.total_purchases_cents,
    n_transactions: row.n_transactions,
  };
}

function currentQuarter(today = new Date()) {
  const m = today.getMonth() + 1;
  const y = today.getFullYear();
  if (m >= 7 && m <= 9)  return { quarter: 1, fyEndYear: y + 1 };
  if (m >= 10 && m <= 12) return { quarter: 2, fyEndYear: y + 1 };
  if (m >= 1 && m <= 3)  return { quarter: 3, fyEndYear: y };
  return { quarter: 4, fyEndYear: y };
}

module.exports = { summary, quarterRange, currentQuarter };
