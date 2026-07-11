# Money-Manager — Pip the bookkeeper

Pip is a small blob character that floats on top of your macOS desktop and helps you keep two sets of books — **personal** and **AU small business** — with the help of Claude.

- **Type to Pip.** "$47 fuel BP today, business" → Pip parses it, shows a review dialog, and files it once you approve.
- **Bank CSV drops.** Point Pip at a folder; drop a CSV export from your bank; Pip categorises every row (entity, category, GST) and shows a one-click approve.
- **Receipts.** Drop images or PDFs into a folder; Pip reads them with Claude's vision, extracts vendor / date / total / GST, and files them.
- **GST + BAS.** Every business transaction tracks its GST. The Reports tab shows the current quarter's G1 / 1A / 1B and net GST owing.
- **Ask Pip about your books.** "How much fuel this quarter?" "What's my GST owing?" Pip queries the ledger directly and answers with real numbers.

Xero sync is stubbed for a later release — the schema already has the seams (`xero_pushed`, `xero_id`, `xero_account_code`).

## Requirements

- macOS
- Node.js 18+
- Xcode Command Line Tools (needed for `better-sqlite3` native build): `xcode-select --install`

## Install

```bash
npm install
```

If `better-sqlite3` fails to build, you probably need Xcode CLT installed (`xcode-select --install`) or a newer Node.

## Run

```bash
npm start
```

A small blob will appear near the top-left of your screen, always on top. Drag Pip anywhere with the mouse; click Pip to open the chat panel; hit `×` to collapse.

## First-run setup

Open Settings (in the panel) and fill in:

1. **Anthropic API key** — get one at https://console.anthropic.com. Pip needs it to think.
2. **Business name** and **ABN** (optional but nice for BAS).
3. **Bank CSV drop folder** — pick a folder. Any `.csv` you save there gets ingested.
4. **Receipts folder** — pick a folder. Any `.jpg`, `.png`, `.pdf` you save there gets read.

Save. That's it.

## Talking to Pip

Pip lives on your desktop. Click to open. Some things to try:

- `"$12.50 coffee today, personal"`
- `"$1,320 stripe payout yesterday, business"`
- `"$88 domain renewal, business, category software"`
- `"How much did I spend on fuel this quarter?"`
- `"What's my GST owing for Q1 FY26?"`
- `"Show me last month's business expenses by category"`

When Pip proposes a transaction, the review dialog lets you edit anything before saving.

## Storage

Everything lives locally in an SQLite database at:

```
~/Library/Application Support/money-manager/pip.db
```

Amounts are stored as **integer AUD cents**. Negative amount = money out (expense); positive = money in (income). GST tracks the same sign.

## AU tax notes

- GST rate: 10%.
- Amounts you tell Pip are treated as **GST-inclusive** by default. GST component of a GST-inclusive total = `round(total / 11)`.
- BAS quarters follow the AU financial year:
  - Q1: Jul–Sep
  - Q2: Oct–Dec
  - Q3: Jan–Mar
  - Q4: Apr–Jun

## Packaging

```bash
npm run dist:mac
```

Produces a `.dmg` in `dist/`. Code signing / notarisation is not configured.

## Project layout

```
src/
  main/         # Electron main process: DB, Claude, watchers, IPC
  preload/      # contextBridge -> window.pip
  renderer/     # HTML/CSS/JS for the blob + panel
migrations/     # SQLite schema
categories/     # AU defaults for personal + business categories
```

## What's not built yet

- Xero OAuth + sync (interface stubbed in `src/main/xero.js`).
- Editing individual CSV rows before approving the batch.
- Payroll (W1/W2) on BAS.
- Automatic backups of the SQLite file.

## License

Private. UNLICENSED.
