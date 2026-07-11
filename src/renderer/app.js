// Pip renderer app: chat, review modal, books, reports, settings, toasts.
(() => {
  const stage = document.getElementById('stage');
  const panel = document.getElementById('panel');
  const tabsBar = document.getElementById('tabs');
  const collapseBtn = document.getElementById('collapse');
  const messagesEl = document.getElementById('messages');
  const composer = document.getElementById('composer');
  const input = document.getElementById('input');
  const reviewModal = document.getElementById('review-modal');
  const reviewForm = document.getElementById('review-form');
  const settingsForm = document.getElementById('settings-form');
  const settingsStatus = document.getElementById('settings-status');
  const xeroStatusEl = document.getElementById('xero-status');
  const booksList = document.getElementById('books-list');
  const booksEntity = document.getElementById('books-entity');
  const booksRefresh = document.getElementById('books-refresh');
  const basCard = document.getElementById('bas-card');
  const monthlyCard = document.getElementById('monthly-card');
  const categoryCard = document.getElementById('category-card');

  const state = {
    tab: 'chat',
    settings: null,
    reviewCtx: null, // { requestId } from Claude tool loop, or null for direct
  };

  const AUD = (cents) => {
    const dollars = (cents || 0) / 100;
    return dollars.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
  };

  const todayISO = () => new Date().toISOString().slice(0, 10);

  function switchTab(name) {
    state.tab = name;
    for (const btn of tabsBar.querySelectorAll('button')) {
      btn.classList.toggle('active', btn.dataset.tab === name);
    }
    for (const t of document.querySelectorAll('.tab')) {
      t.hidden = t.dataset.tab !== name;
    }
    if (name === 'books') refreshBooks();
    if (name === 'reports') refreshReports();
    if (name === 'settings') loadSettings();
  }

  tabsBar.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-tab]');
    if (btn) switchTab(btn.dataset.tab);
  });

  window.PipUI = {
    expand() {
      stage.dataset.mode = 'expanded';
      panel.hidden = false;
      window.pip.expand(true);
      setTimeout(() => input.focus(), 100);
    },
    collapse() {
      stage.dataset.mode = 'idle';
      panel.hidden = true;
      window.pip.expand(false);
    },
  };
  collapseBtn.addEventListener('click', () => window.PipUI.collapse());

  // ---- Chat ----
  function appendMessage(role, contentHtml) {
    const el = document.createElement('div');
    el.className = 'msg ' + role;
    el.innerHTML = contentHtml;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function greetIfEmpty() {
    if (messagesEl.children.length) return;
    const html = window.pip.renderMarkdown(
      "Hello — I'm **Pip**. Tell me about a transaction (\"$47 fuel BP today, business\"), ask me about your books (\"how much fuel this quarter?\"), or drop a bank CSV or a receipt into your watched folders. Amounts are AUD. — Pip"
    );
    appendMessage('pip', html);
  }

  composer.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    appendMessage('user', escapeHtml(text));
    window.PipBlob.setEmotion('thinking');
    const sendBtn = composer.querySelector('button');
    sendBtn.disabled = true;

    try {
      const resp = await window.pip.chat(text);
      if (resp.error) {
        appendMessage('system', 'Pip stumbled: ' + escapeHtml(resp.error));
      } else {
        appendMessage('pip', window.pip.renderMarkdown(resp.text));
      }
    } catch (err) {
      appendMessage('system', 'Chat failed: ' + escapeHtml(String(err)));
    } finally {
      window.PipBlob.setEmotion('idle');
      sendBtn.disabled = false;
      input.focus();
    }
  });

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ---- Review modal ----
  async function openReviewModal(draft, ctx) {
    state.reviewCtx = ctx || null;
    reviewModal.hidden = false;
    const dollars = (cents) => (Math.abs(Number(cents) || 0) / 100).toFixed(2);

    reviewForm.entity.value = draft.entity || 'business';
    reviewForm.date.value = draft.date || todayISO();
    reviewForm.vendor.value = draft.vendor || '';
    reviewForm.description.value = draft.description || '';
    reviewForm.amount_dollars.value = dollars(draft.amount_cents);
    reviewForm.direction.value = (Number(draft.amount_cents) >= 0) ? 'income' : 'expense';
    reviewForm.gst_dollars.value = dollars(draft.gst_cents);
    reviewForm.notes.value = draft.notes || '';
    await populateCategoryDropdown(reviewForm.category, reviewForm.entity.value, draft.category);
    reviewForm.entity.onchange = () => populateCategoryDropdown(reviewForm.category, reviewForm.entity.value);
    reviewForm._sourceMeta = { source: draft.source, source_ref: draft.source_ref, receipt_path: draft.receipt_path };
  }

  async function populateCategoryDropdown(select, entity, preselect) {
    const cats = await window.pip.listCategories(entity);
    select.innerHTML = '';
    for (const c of cats) {
      const opt = document.createElement('option');
      opt.value = c.name;
      opt.textContent = c.name;
      if (preselect && preselect === c.name) opt.selected = true;
      select.appendChild(opt);
    }
  }

  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dir = reviewForm.direction.value === 'income' ? 1 : -1;
    const amountCents = Math.round(Number(reviewForm.amount_dollars.value || 0) * 100) * dir;
    const gstCents = Math.round(Number(reviewForm.gst_dollars.value || 0) * 100) * (dir === 0 ? 1 : dir);
    const transaction = {
      entity: reviewForm.entity.value,
      date: reviewForm.date.value,
      vendor: reviewForm.vendor.value || null,
      description: reviewForm.description.value || null,
      amount_cents: amountCents,
      gst_cents: gstCents,
      category: reviewForm.category.value,
      notes: reviewForm.notes.value || null,
      ...(reviewForm._sourceMeta || {}),
    };
    reviewModal.hidden = true;

    if (state.reviewCtx && state.reviewCtx.requestId) {
      window.pip.reviewRespond({
        requestId: state.reviewCtx.requestId,
        action: 'edited',
        transaction,
      });
    } else {
      await window.pip.commitTransaction(transaction);
      appendMessage('system', 'Saved.');
      window.PipBlob.setEmotion('happy');
      setTimeout(() => window.PipBlob.setEmotion('idle'), 1500);
    }
    state.reviewCtx = null;
  });

  reviewForm.querySelector('[data-action="reject"]').addEventListener('click', () => {
    reviewModal.hidden = true;
    if (state.reviewCtx && state.reviewCtx.requestId) {
      window.pip.reviewRespond({ requestId: state.reviewCtx.requestId, action: 'rejected' });
    }
    state.reviewCtx = null;
  });

  window.pip.onReviewRequest(({ requestId, draft }) => {
    window.PipUI.expand();
    openReviewModal(draft, { requestId });
  });

  window.pip.onReceiptReady(({ draft, path }) => {
    window.PipBlob.showBubble('Receipt found — click to review.');
    window.PipUI.expand();
    openReviewModal(draft, null);
    appendMessage('system', 'Receipt: ' + escapeHtml(path));
  });

  window.pip.onCsvReady(async ({ path, sha, drafts }) => {
    const n = drafts.length;
    window.PipUI.expand();
    appendMessage(
      'pip',
      window.pip.renderMarkdown(
        `I read **${n}** rows from \`${path.split('/').pop()}\`. Approve all and I'll file them, or open **Books** after to edit any details.`
      ) + `<div style="margin-top:6px"><button id="csv-approve-${sha}" style="padding:6px 10px;border-radius:8px;border:none;background:#3fb08f;color:#fff;font-weight:600;cursor:pointer">Approve all ${n}</button></div>`
    );
    setTimeout(() => {
      const btn = document.getElementById(`csv-approve-${sha}`);
      if (!btn) return;
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        btn.textContent = 'Saving…';
        await window.pip.commitBatch({ path, sha, drafts });
        btn.textContent = `Saved ${n} rows`;
        window.PipBlob.setEmotion('happy');
        setTimeout(() => window.PipBlob.setEmotion('idle'), 1500);
      });
    }, 0);
  });

  // ---- Books ----
  async function refreshBooks() {
    const params = {};
    if (booksEntity.value) params.entity = booksEntity.value;
    const rows = await window.pip.query(params);
    renderBooks(rows);
  }
  function renderBooks(rows) {
    booksList.innerHTML = '';
    if (!rows.length) {
      booksList.innerHTML = '<p style="color:#6a7a75;font-size:12px;padding:8px">Nothing here yet. Tell me about a transaction in Chat, or drop a CSV/receipt into your watched folders.</p>';
      return;
    }
    for (const r of rows) {
      const el = document.createElement('div');
      el.className = 'tx-row';
      const isExpense = r.amount_cents < 0;
      el.innerHTML = `
        <div>
          <div class="date">${escapeHtml(r.date)}</div>
          <div class="meta">${escapeHtml(r.source || '')}</div>
        </div>
        <div>
          <div>
            <span class="badge ${escapeHtml(r.entity)}">${escapeHtml(r.entity)}</span>
            <strong>${escapeHtml(r.vendor || r.description || 'Untitled')}</strong>
          </div>
          <div class="meta">${escapeHtml(r.category || '')}${r.gst_cents ? ' · GST ' + AUD(Math.abs(r.gst_cents)) : ''}</div>
        </div>
        <div class="amount ${isExpense ? 'expense' : 'income'}">${AUD(r.amount_cents)}</div>
      `;
      booksList.appendChild(el);
    }
  }
  booksEntity.addEventListener('change', refreshBooks);
  booksRefresh.addEventListener('click', refreshBooks);

  // ---- Reports ----
  async function refreshReports() {
    const q = await window.pip.currentQuarter();
    const bas = await window.pip.basSummary({ quarter: q.quarter, fyEndYear: q.fyEndYear });
    basCard.innerHTML = `
      <h4>BAS · ${escapeHtml(bas.label)} (${escapeHtml(bas.from)} → ${escapeHtml(bas.to)})</h4>
      <div class="stat-row">
        <div class="stat"><span class="label">G1 total sales</span><span class="value pos">${AUD(bas.g1_total_sales_cents)}</span></div>
        <div class="stat"><span class="label">Purchases (excl.)</span><span class="value neg">${AUD(bas.total_purchases_cents)}</span></div>
        <div class="stat"><span class="label">1A GST on sales</span><span class="value pos">${AUD(bas.one_a_gst_on_sales_cents)}</span></div>
        <div class="stat"><span class="label">1B GST on purchases</span><span class="value neg">${AUD(bas.one_b_gst_on_purchases_cents)}</span></div>
        <div class="stat"><span class="label">Net GST ${bas.net_gst_owing_cents >= 0 ? 'owing' : 'refund'}</span><span class="value ${bas.net_gst_owing_cents >= 0 ? 'neg' : 'pos'}">${AUD(Math.abs(bas.net_gst_owing_cents))}</span></div>
        <div class="stat"><span class="label">Transactions</span><span class="value">${bas.n_transactions}</span></div>
      </div>
    `;

    const monthly = await window.pip.monthly({ entity: null, months: 6 });
    monthlyCard.innerHTML = `<h4>Monthly summary (last 6 months, all entities)</h4>` + (
      monthly.length ? monthly.map((m) => `
        <div class="tx-row">
          <div class="date">${escapeHtml(m.ym)}</div>
          <div>
            <div>Income <span class="amount income">${AUD(m.income_cents || 0)}</span></div>
            <div class="meta">Expenses <span class="amount expense">${AUD(m.expenses_cents || 0)}</span></div>
          </div>
          <div class="meta">${m.n} tx</div>
        </div>
      `).join('') : '<p style="color:#6a7a75;font-size:12px">No months yet.</p>'
    );

    const cats = await window.pip.sumByCategory({});
    categoryCard.innerHTML = `<h4>By category (all time, all entities)</h4>` + (
      cats.length ? cats.slice(0, 12).map((c) => `
        <div class="tx-row">
          <div>${escapeHtml(c.category || 'Uncategorised')}</div>
          <div class="meta">${c.n} tx</div>
          <div class="amount ${c.total_cents < 0 ? 'expense' : 'income'}">${AUD(c.total_cents)}</div>
        </div>
      `).join('') : '<p style="color:#6a7a75;font-size:12px">No transactions yet.</p>'
    );
  }

  // ---- Settings ----
  async function loadSettings() {
    const s = await window.pip.getSettings();
    state.settings = s;
    settingsForm.apiKey.value = s.apiKey || '';
    settingsForm.businessName.value = s.businessName || '';
    settingsForm.abn.value = s.abn || '';
    settingsForm.csvDropFolder.value = s.csvDropFolder || '';
    settingsForm.receiptsFolder.value = s.receiptsFolder || '';
    const xero = await window.pip.xeroStatus();
    xeroStatusEl.textContent = xero.connected ? 'Xero connected.' : xero.note;
  }
  settingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const patch = {
      apiKey: settingsForm.apiKey.value.trim(),
      businessName: settingsForm.businessName.value.trim(),
      abn: settingsForm.abn.value.trim(),
      csvDropFolder: settingsForm.csvDropFolder.value.trim(),
      receiptsFolder: settingsForm.receiptsFolder.value.trim(),
    };
    await window.pip.saveSettings(patch);
    settingsStatus.textContent = 'Saved.';
    setTimeout(() => (settingsStatus.textContent = ''), 2000);
  });
  settingsForm.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-pick]');
    if (!btn) return;
    const key = btn.dataset.pick;
    const p = await window.pip.pickFolder();
    if (p) settingsForm[key].value = p;
  });

  // ---- Boot ----
  greetIfEmpty();
})();
