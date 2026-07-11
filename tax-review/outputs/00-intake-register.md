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

**At the time this register was first written, Phase 1 had not been commenced and no
residency conclusion, tax figure, or scenario had been produced.**

### 5.1 Reconciliation — re-scope after the stop was reported (added post-review, RT-01)

The Phase 0 stop condition was reported to the client (Theo) as required. The client then
directed the work to **continue**. On that instruction the engagement was **re-scoped**, and
the later phases were produced on that basis:

- **What was produced despite the empty evidence base:** law-only research memos (`02`–`05`,
  fully cited) and a **parameterised illustration** (`03` §8, `06`) built exclusively on the
  brief's own approximate, expressly-labelled ASSUMED figures.
- **What was NOT done:** no fact was fabricated; no figure is presented as an established
  liability; no residency **conclusion of fact** is asserted; `tax-review/inputs/` remains
  empty.
- **Status of the numbers:** every dollar/baht figure in `03` and `06` is an ILLUSTRATIVE
  placeholder demonstrating mechanics, not a finding. The red-team review (`07`) records this
  as its central caution (RT-01, RT-02, RT-04); the position paper (`08`) leads with it.

This note removes the contradiction the red team identified between this register (which
originally said "no scenario produced") and the existence of `03`/`06`. The correct reading:
**the modelled layer exists only as a mechanics illustration produced after the stop was
reported and continuation was authorised; it is not, and must not be read as, an evidenced
result.**

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

---

## 7. Update — local computer scan of 11 July 2026 (evidence located, not yet delivered)

A scan of Theo's local machine (`~/Desktop`, `~/Documents`, `~/Downloads`) was run on
11 July 2026 and catalogued which of the 19 items exist on disk. **Important environment
note:** that scan and its files live on Theo's **local computer**. This review runs in a
**remote container** that cannot reach `~/Desktop`; the actual data files have **not** been
delivered into `tax-review/inputs/` (still empty) and their contents have not been read here.
So the analysis remains law-only/illustrative — but the availability picture is now much
sharper. Statuses below: **STAGED/ON-DISK** = the file exists and can be provided;
**NOT AVAILABLE** = nothing found (a valid finding in itself).

### Tier 1 — analysis-critical
| # | Item | Scan result |
|---|---|---|
| 1 | Passport stamps / immigration record | **RECEIVED 11 Jul 2026** — bio page + eight stamped spreads supplied and transcribed in `01-passport-daycount.md` (provisional photo-based count). Physical-passport verification + an official Thai immigration movement record still needed. Supersedes the earlier "bio-page only" status. |
| 2 | Flight itineraries | **PARTIAL** — only 2 movements on disk (VietJet PVG→BKK booked 01/07/2025; a Spirit US-domestic boarding pass 31/10/2023). Full 2024→2026 history **NOT AVAILABLE** (pull from Gmail/airline accounts). |
| 3 | Day-count table | **NOT AVAILABLE** — derived; blocked on items 1–2. |
| 4 | Money into Thailand | **PARTIAL** — Wise export **18 Oct 2024 → 20 Oct 2025** (1,668 txns) on disk. **Revolut NOT AVAILABLE**; Wise Jan–Oct 2024 and post-Oct 2025 **NOT AVAILABLE**. Remittance map still incomplete. |
| 5 | Invoices to HA / T&H | **PARTIAL** — HA invoice(s) mid-2024 on disk (e.g. HOA-INV004, 27 May 2024). **Invoices to T&H NOT AVAILABLE; any FY2025–26 invoices NOT AVAILABLE.** |
| 6 | 31 Dec 2023 balances | **PARTIAL/CORE OK** — ASB Streamline statement spanning 20 Sep 2023 → 20 Mar 2024 covers the 31 Dec 2023 balance. Other accounts (Revolut/Thai/other) at 31 Dec 2023 **NOT AVAILABLE** — pool not yet fully fixed. |

### Tier 2 — high
| # | Item | Scan result |
|---|---|---|
| 7 | NZ dwelling (PPOA) | **NOT AVAILABLE (circumstantial only)** — no lease/ownership doc; ASB shows transfers with MRS V P HOLMES / MR H G HOLMES (consistent with a family home available to Theo, but not evidenced). Decisive for Van Uden — must be confirmed. |
| 8 | NZ bank statements (all accts) | **PARTIAL** — ASB Streamline statements/exports across parts of 2023–2025. Coverage gaps ~Apr–Oct 2024 and Oct 2025→Jun 2026. Other NZ banks **NOT AVAILABLE/unconfirmed**. |
| 9 | IR3 / IRD correspondence | **PARTIAL** — an unidentified "IRD FORM.pdf" on disk (type unconfirmed). Filed **IR3 NOT AVAILABLE**. |
| 10/11 | Sivana lease; DTV grant; Thai bank/TIN | **NOT AVAILABLE** — no Thai lease, no DTV approval/conditions letter, no Thai bank statement, no TIN found. |
| 12 | Services agreements Theo↔HA / Theo↔T&H | **NOT AVAILABLE** — none found. **Structural gap** (its non-existence is itself a finding; drives fee-vs-dividend characterisation). |
| 13 | HA/T&H financials, shareholder agreements, trust deed | **PARTIAL** — ASIC/company **extracts** for HA and T&H on disk. Full **financial statements, shareholder agreements, trust deed NOT AVAILABLE**. |
| 15 | Directorship + AU-physical-work | **PARTIAL** — directorship/shareholding shown in the company extracts. **Record of any work performed while physically in Australia NOT AVAILABLE** (drives the company Thai-PE risk). |

### Tier 3 — medium
| # | Item | Scan result |
|---|---|---|
| 16 | Secondary NZ ties | **PARTIAL** — NZ StudyLink allowance + SIT enrolment (a study tie) on disk. KiwiSaver / insurance / vehicle / electoral / health **NOT AVAILABLE**. |
| 17–19 | Projections / intentions / visa plans | **NOT AVAILABLE** — narrative items to be provided by Theo. |

### What this update changes
- The **PPOA question (item 7)** now has a circumstantial signal (family-account transfers with V P and H G Holmes) pointing toward a NZ family home available to Theo — which, if confirmed, would push the NZ residency and treaty tie-breaker **toward NZ** (Van Uden), not Thailand. This strengthens `08`'s recommendation against a premature NZ cessation.
- The **NZ study ties (item 16)** and StudyLink allowance are further NZ-connection factors.
- The **remittance base (item 4)** is now partly evidenced (Wise), but **Revolut is absent** and the ATM figure remains unsubstantiated — the RT-04 caution stands.
- **T&H invoices and any services agreements remain absent** — characterisation (G-16) and the T&H income schedule cannot be built.

**None of this lifts the Phase 0 stop for the quantitative analysis in this remote session,**
because the files themselves are not readable here. To proceed, the actual files must be
delivered to this session (see §8).

### 8. How to actually deliver the evidence to this (remote) session
The `cp` commands in the local scan register only work in a **local** Claude Code session. In
this remote session, either:
1. **Upload the actual files** (Wise CSV, ASB statements/exports, the HA invoices, HA & T&H
   company extracts, the IRD form, StudyLink) directly into the chat — they will be readable
   and I will parse them into `01-facts-and-flows.md` / `01-remittances.csv`; or
2. **Run the analysis locally** — open a Claude Code session on Theo's own machine, run the
   scan register's `cp` commands to stage `inputs/`, and re-run Phases 1–4 there against the
   real files; or
3. **Commit the files** into `tax-review/inputs/` on the branch (if appropriate for these
   sensitive documents — consider privacy before committing bank/passport data to git).
