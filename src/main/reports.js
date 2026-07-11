const db = require('./db');

function monthLabel(y, m) {
  return `${y}-${String(m).padStart(2, '0')}`;
}

function monthlySummary({ entity, months = 6 } = {}) {
  const conn = db.get();
  const rows = conn.prepare(`
    SELECT substr(date, 1, 7) AS ym,
           SUM(CASE WHEN amount_cents > 0 THEN amount_cents ELSE 0 END) AS income_cents,
           SUM(CASE WHEN amount_cents < 0 THEN -amount_cents ELSE 0 END) AS expenses_cents,
           SUM(gst_cents) AS gst_cents_net,
           COUNT(*) AS n
      FROM transactions
     WHERE (@entity IS NULL OR entity = @entity)
     GROUP BY ym
     ORDER BY ym DESC
     LIMIT @months
  `).all({ entity: entity || null, months });
  return rows;
}

function categoryBreakdown({ entity, from, to } = {}) {
  return db.sumByCategory({ entity, from, to });
}

function eofySummary({ entity, fyEndYear }) {
  const from = `${fyEndYear - 1}-07-01`;
  const to = `${fyEndYear}-06-30`;
  const conn = db.get();
  const totals = conn.prepare(`
    SELECT
      SUM(CASE WHEN amount_cents > 0 THEN amount_cents ELSE 0 END) AS income_cents,
      SUM(CASE WHEN amount_cents < 0 THEN -amount_cents ELSE 0 END) AS expenses_cents,
      SUM(CASE WHEN amount_cents > 0 THEN gst_cents ELSE 0 END) AS gst_collected_cents,
      SUM(CASE WHEN amount_cents < 0 THEN -gst_cents ELSE 0 END) AS gst_paid_cents,
      COUNT(*) AS n
    FROM transactions
    WHERE entity = @entity AND date >= @from AND date <= @to
  `).get({ entity, from, to });
  const byCat = db.sumByCategory({ entity, from, to });
  return { entity, fyEndYear, from, to, ...totals, byCategory: byCat };
}

module.exports = { monthlySummary, categoryBreakdown, eofySummary };
