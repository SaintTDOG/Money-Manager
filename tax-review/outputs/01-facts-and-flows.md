# 01 — Facts and Flows (Data Extraction and Cash-Flow Mapping)

**Engagement:** Cross-Border Tax Position Review — Theo Holmes
**Prepared:** 10 July 2026
**Agent:** 1 (Data extraction and cash-flow mapping)
**Status:** NO PRIMARY DATA AVAILABLE. This file documents the absence, provides the
extraction templates to be populated when evidence arrives, and records the brief's
approximate figures as ASSUMED (not established facts). No figure here may be relied upon.

---

## 0. Data-availability statement

Agent 1's task is to extract, from statements and invoices, four things: (a) a day-count
table, (b) an income schedule, (c) a remittance map, and (d) the pre-2024 savings pool.

**None of these can be produced, because the repository contains no statements, no
invoices, no travel records and no bank exports.** See `00-intake-register.md`. Under
operating rule 1, nothing is fabricated. The templates below define exactly what each
output will contain once the source documents in `00-intake-register.md` section 3 are
supplied. The companion CSV `01-remittances.csv` is delivered as an empty, correctly
headed template.

---

## (a) Day-count table — PARTIALLY EVIDENCED (passport stamps received 11 Jul 2026)

**Update:** nine passport photographs (bio page + eight stamped spreads) were supplied on
11 July 2026 and transcribed in **`01-passport-daycount.md`**. That is now the working
day-count source. It is a provisional, confidence-flagged photo transcription — **not a
certified count** — and must be verified against the physical passport and flight records.
**Part-days count as full days for Thailand.**

Provisional Thai day-count (ranges; see `01a` for the full chronology and confidence flags):

| Calendar year | Thai days (provisional) | Thai resident ≥180? | NZ / AU days | Source |
|---|---|---|---|---|
| 2024 | ~100–160 | **Likely NOT** (below 180) | not evidenced (no NZ/AU stamps) | passport + G-02 flights |
| 2025 | ~180–205 | **Likely, but BORDERLINE** | not evidenced | passport + G-02 flights |
| 2026 (to 30 Jun) | ~140–160 so far | on track | not evidenced | passport + G-02 flights |

Thresholds (see 02/03 for law and citations):
- Thailand: 180 days in a calendar year → Thai tax resident (Section 41).
- NZ: 183-day presence / 325-day absence rules, overlaid by the permanent place of abode test.
- Australia: 183-day test (no AU stamps seen; flights needed to confirm).

**Status: MATERIALLY ADVANCED but not final.** Two changes to the brief's assumptions:
(i) **2024 Thai residency now looks NEGATIVE** (removes 2024 from the Thai charge; supports NZ
residence); (ii) the brief's assumption A1 (≥180 days in Thailand in 2025) is **not safely
established — 2025 is genuinely borderline** and must be counted to the day. Also flagged: the
stamp pattern (tourist-exemption entries, border runs, overstay fines through 2025; a ~180-day
DTV-style admission only from Apr 2026) appears **inconsistent with "on a DTV since May 2025"**
— confirm the DTV grant date (G-12). NZ/AU days remain unevidenced pending flights (G-02).

---

## (b) Income schedule — TEMPLATE (unpopulated)

Source will be all invoices to HA Pty Ltd and T&H Collective (item 13) reconciled against
Revolut and any other account statements (items 5, 10).

| Date | Payer | Amount (AUD) | Rail (CBA/Revolut/Wise) | Characterisation | Source doc |
|---|---|---|---|---|---|
| (pending) | Homeowner Assist Pty Ltd | (pending) | (pending) | contractor fee? (item 15) | items 12-13 |
| (pending) | T&H Collective Pty Ltd | (pending) | (pending) | contractor fee? (item 15) | items 12-13 |
| (pending) | other | (pending) | (pending) | (pending) | (pending) |

**Figures quoted in the engagement brief — labelled ASSUMED, NOT extracted from evidence:**

| Item | Amount quoted in brief | Label | Note |
|---|---|---|---|
| FY2025-26 income via CBA transfers | approx. AUD 19,000 | ASSUMED | Approximate; no statement/invoice on file (G-22) |
| From T&H Collective | AUD 5,543 | ASSUMED | No invoice/statement on file (G-22) |
| Other business receipts | unquantified | ASSUMED | Amount unknown |

Characterisation of every receipt (contractor fee / director's fee / dividend / loan /
reimbursement) is undocumented — gap G-16. Characterisation drives both the treaty
article (see 05) and the Thai remittance treatment (see 03), so it cannot be left open in
the final analysis.

---

## (c) Remittance map — TEMPLATE (unpopulated), delivered as 01-remittances.csv

"Remittance" for Thai purposes = value brought into Thailand in a calendar year while Thai
resident: inbound bank transfers, ATM withdrawals in Thailand from foreign accounts, and
foreign-card spend settled in THB. Source will be item 10 (Revolut already expected on
file but ABSENT here; supplement with Wise/other rails).

CSV columns: `date, calendar_year, type, description, currency_in, amount_in_original,
assumed_fx_to_thb, amount_thb, source_account, evidence_doc, characterisation, label`.

**Figures quoted in the brief — ASSUMED, NOT verified:**

| Remittance channel (2025-26) | Amount quoted | Label | Note |
|---|---|---|---|
| ATM cash withdrawals in Thailand | approx. AUD 24,860 | ASSUMED | Brief itself flags "unsubstantiated" (G-21) |
| CBA transfers (may be income and/or remittance) | approx. AUD 19,000 | ASSUMED | Double-counting risk vs income schedule; must reconcile |

Two unresolved technical points, both flagged for the Thai adviser (see 03):
1. Whether ATM withdrawals and THB card spend are "remittances of assessable income" at
   all, and how they are traced to income vs pre-2024 savings.
2. Ordering/tracing rules: are remittances presumed to come from current-year income or
   from the Por 162 pre-2024 exempt pool first?

---

## (d) Pre-2024 savings pool at 31 Dec 2023 — TEMPLATE (unpopulated)

Under Por 162/2566, foreign income earned before 1 Jan 2024 remains exempt when later
remitted. Establishing the 31 Dec 2023 closing balances of every account (item 11) fixes
the size of this exempt pool — potentially the difference between a material Thai tax bill
and none, if remittances can be traced to pre-2024 savings.

| Account | Closing balance 31 Dec 2023 | Currency | Evidence doc | Label |
|---|---|---|---|---|
| (pending) | (pending) | (pending) | item 11 | (pending) |

**Status: ASSUMED unresolved.** No 31 Dec 2023 balances on file. Gap G-06. This is a
high-value gap: a large evidenced pre-2024 pool could substantially reduce Thai exposure.

---

## Summary for orchestrator

- (a)-(d) cannot be produced: zero source documents.
- The brief's figures (~AUD 19,000 CBA; AUD 5,543 T&H; ~AUD 24,860 ATM) are ASSUMED and
  the ATM figure is expressly unsubstantiated — they are recorded for traceability only
  and must NOT be modelled as facts.
- Highest-value missing items: day counts (G-01/03), remittance schedule (G-04), invoices
  (G-05), 31 Dec 2023 balances (G-06), payment characterisation (G-16).
- `01-remittances.csv` delivered as an empty headed template.
