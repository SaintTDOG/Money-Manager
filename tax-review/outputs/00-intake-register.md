# 00 — Intake Register

**Engagement:** Cross-Border Tax Position Review — Theo Holmes
**Prepared:** 10 July 2026
**Phase:** 0 (Repo discovery and intake)
**Status:** STOPPED at Phase 0 gate — critical evidence absent. Phase 1 not commenced.

---

## 1. Purpose of this register

This register records every document actually present in the repository, what each
document evidences, and every item from the engagement brief's document request
(section 4, items 1–19) that is MISSING. Under operating rule 1, missing or ambiguous
documents are logged rather than assumed, and no figure or fact is fabricated to fill a
gap.

---

## 2. Repository discovery — what is actually present

A full scan of the repository was performed at the start of Phase 0.

| Location | Contents found | Notes |
|---|---|---|
| Repository root | Empty working tree; no commits in history | The git repository was initialised but carries no tracked files and no commit history. |
| `tax-review/inputs/` | **Empty** (directory created during Phase 0) | No source documents were dropped here as the companion prompt instructs. |
| `tax-review/outputs/` | This register and `gaps.md` only | Created during Phase 0. |

**Financial data expected by the companion prompt but NOT found:** no Revolut CSV or
statement, no bank exports, no invoices, no CSV/spreadsheet of any kind. There is no
pre-existing money-manager application code or data in this repository either.

**KNOWN:** The repository contains no input evidence of any kind. The only source
materials available to this simulation are the two briefing PDFs themselves (the
companion prompt and the engagement brief). Those briefs are instructions and a
summary of prior work; they are not primary evidence and several of the figures they
quote are expressly flagged as approximate or unsubstantiated.

---

## 3. Document request status (engagement brief section 4)

Naming convention requested: `YYYY-MM-DD_source_description`. No file matching any
request item exists.

### 4.1 Physical presence (highest priority — analysis-critical)

| # | Requested item | Present? | What it would evidence | Status |
|---|---|---|---|---|
| 1 | Passport stamp photos / immigration records, 1 Jan 2024 – today | No | Entry/exit dates for the day-count table (all three countries) | **MISSING — CRITICAL** |
| 2 | Flight itineraries / booking confirmations for every international movement | No | Corroboration and gap-filling of movements between stamps | **MISSING — CRITICAL** |
| 3 | Day-count table per calendar year (TH/NZ/AU/other; part-days count as full days for Thailand) | No | The single most important input; drives every residency test | **MISSING — CRITICAL** |

### 4.2 New Zealand ties

| # | Requested item | Present? | What it would evidence | Status |
|---|---|---|---|---|
| 4 | NZ dwelling owned/leased/habitually available (incl. family homes, stored belongings) | No | Permanent place of abode test (YD 1) | **MISSING — HIGH** |
| 5 | NZ bank account statements (all accounts), 1 Jan 2024 – 30 Jun 2026 | No | Ongoing NZ ties; NZ-source income; enduring relationship with NZ | **MISSING — HIGH** |
| 6 | KiwiSaver statement; NZ insurance; NZ vehicle; electoral enrolment; NZ health enrolment | No | Secondary residency ties (permanent place of abode factors) | **MISSING — MEDIUM** |
| 7 | Last NZ tax return filed (IR3) and IRD correspondence | No | Baseline filing position; prior residency treatment | **MISSING — HIGH** |

### 4.3 Thai position

| # | Requested item | Present? | What it would evidence | Status |
|---|---|---|---|---|
| 8 | Sivana Place lease and any other Thai accommodation contracts | No | Thai place of abode; duration of presence; DTV conditions | **MISSING — HIGH** |
| 9 | Thai bank statements (if any); Thai TIN (if obtained); DTV grant letter and conditions | No | Thai residency footprint; filing status; visa terms | **MISSING — HIGH** |
| 10 | Schedule of all money brought into Thailand since 1 Jan 2024 (transfers in, ATM withdrawals, THB card spend) | No | Remittance map — the Thai tax base under Por 161/162 | **MISSING — CRITICAL** |
| 11 | Closing balances of every account at 31 Dec 2023 | No | Pre-2024 exempt savings pool under Por 162/2566 | **MISSING — HIGH** |

### 4.4 Australian entities and income

| # | Requested item | Present? | What it would evidence | Status |
|---|---|---|---|---|
| 12 | Written services agreement between Theo and each of HA Pty Ltd and T&H Collective | No | Characterisation of income; source; PE analysis | **MISSING — HIGH (structural gap if none exists)** |
| 13 | All invoices to both entities FY2024–25 and FY2025–26 | No | Income schedule; dates; amounts; characterisation | **MISSING — CRITICAL** |
| 14 | HA and T&H financial statements, shareholder agreements, any trust deed | No | Company-level CM&C / PE exposure; extraction routes | **MISSING — HIGH** |
| 15 | Characterisation of each payment (contractor fee / director's fee / dividend / loan / reimbursement) | No | Treaty article selection; AU withholding; Thai remittance treatment | **MISSING — HIGH** |
| 16 | Confirmation of whether any work is performed while physically in Australia | No | AU source rules for personal services income | **MISSING — HIGH** |

### 4.5 Plans and projections

| # | Requested item | Present? | What it would evidence | Status |
|---|---|---|---|---|
| 17 | Income projection FY2027–FY2028 (HA 50-deal / $750K target; expected personal draw) | No | Phase 2 forward projections (S1–S4 to FY2028) | **MISSING — MEDIUM** |
| 18 | Intended country of residence next 3 years; planned NZ/AU return; planned Thai property / large remittance | No | Residency intention; future remittance exposure | **MISSING — MEDIUM** |
| 19 | Any visa upgrade under consideration (e.g. LTR Work-from-Thailand Professional) | No | LTR Royal Decree exemption pathway; USD 80,000 salary threshold | **MISSING — MEDIUM** |

---

## 4. Figures quoted in the briefs (NOT evidence — do not model on these)

The engagement brief quotes the following. Each is labelled per operating rule 3. None
is supported by a source document in this repository, so none may be used as a modelled
input without the underlying evidence.

| Figure quoted in brief | Label | Why it cannot be modelled yet |
|---|---|---|
| ~AUD 19,000 via CBA transfers (FY2025–26) | ASSUMED | Approximate; no bank statement or invoice on file |
| AUD 5,543 from T&H Collective | ASSUMED | No invoice or statement on file |
| "plus other business receipts" | ASSUMED | Amount unknown; unquantified |
| ~AUD 24,860 ATM cash withdrawals in Thailand | ASSUMED | Brief itself flags this as "unsubstantiated" |
| Resident in Phuket since May 2025 on DTV | INFERRED | Stated in brief; no DTV grant letter or lease to confirm |
| Exceeded 180 days in Thailand in 2025 (A1) | ASSUMED | No passport/flight evidence; this is the pivotal fact |

---

## 5. Critical stop condition — TRIGGERED

The companion prompt (Phase 0) is explicit:

> "Stop and report the missing list to Theo before Phase 1 if the day-count evidence
> (passport stamps / flight records) is absent — the entire analysis is unsafe without it."

The day-count evidence (items 1–3) is entirely absent. So is the remittance evidence
(item 10) and the income evidence (item 13). **This is not a partial gap — no primary
evidence exists at all.** Every downstream conclusion in Phases 1–4 (residency per year,
Thai remittance tax, AU source and PE risk, treaty tie-breakers, scenario tax numbers)
depends on facts that cannot be established from the material on hand.

Proceeding to spawn the Phase 1 extraction and research agents would force them either
to fabricate a fact base (prohibited by operating rules 1 and 3) or to produce law-only
memos with no facts to apply them to (of limited value and outside the designed control
flow). The correct action under the engagement's own rules is to STOP here and report.

**Phase 1 has not been commenced. No residency conclusion, tax figure, or scenario has
been produced.**

---

## 6. Recommended next step

Provide the section 4 documents into `tax-review/inputs/` using the requested naming
convention, or state "not available" per item (a stated non-availability is itself a
finding and lets the analysis proceed with an explicit gap). At minimum, the
analysis-critical items must be supplied before Phase 1 can safely run:

1. Passport stamps / immigration records (items 1–2) → day-count table (item 3)
2. Revolut statement + any Wise/other rails + ATM/card records (item 10) → remittance map
3. All invoices to HA and T&H (item 13) → income schedule
4. 31 Dec 2023 account closing balances (item 11) → Por 162 exempt-pool baseline

See `gaps.md` for the consolidated, numbered gap list that will seed the adviser
question pack.
