# 06 — Scenario Modelling (S1–S4)

**Engagement:** Cross-Border Tax Position Review — Theo Holmes
**Prepared:** 10 July 2026
**Phase:** 2 (Scenario modelling; sequential; consumes Phase 1 outputs 01–05)
**Status:** DECISION-SUPPORT ONLY. Not advice; not a filing position. Every dollar/baht
figure is ILLUSTRATIVE, built on the brief's own approximate and (for ATM) expressly
unsubstantiated figures. No number here is an established liability.

---

## 0. Modelling basis and health warning (read first)

The brief asks that scenarios be modelled on **ACTUAL cash flows** from `01-facts-and-flows.md`.
**There are no actual cash flows** — the repository contains no statements, invoices or
travel records (Phase 0 stop condition; gaps G-01 to G-06). This phase therefore models the
**mechanics** of each scenario and populates them with a single, clearly-labelled
**illustrative dataset** drawn from the engagement brief, so the adviser can see how the tax
behaves. It does not and cannot produce a real tax number.

**Illustrative dataset (ALL ASSUMED — see 01/03, gaps G-21/G-22):**

| Input | Value used | Label |
|---|---|---|
| HA + T&H receipts, FY2025–26 | AUD 24,543 (19,000 CBA + 5,543 T&H) | ASSUMED |
| ATM cash withdrawals in Thailand | up to AUD 24,860 | ASSUMED, "unsubstantiated" |
| FX | AUD 1 = THB 23.0 | ASSUMED illustrative |
| Thai residency (≥180 days) 2025 & 2026 | met | ASSUMED (A1, unproven) |
| Pre-2024 Por 162 savings pool | nil assumed (maximum base) | ASSUMED |
| Income character (Thai s.40) | s.40(2) 50%/THB100k cap | ASSUMED |
| Theo AU residency | foreign resident | ASSUMED |
| Work physically performed in AU | none | ASSUMED (gap G-17) |

**Cross-references:** NZ law = `02`; Thai law + parameterised tax = `03` §8; AU law +
company risk = `04`; treaty mapping = `05`. Legal citations are not repeated here; they live
in those memos (all verified 10 July 2026).

---

## 1. The four scenarios

- **S1 — Remain NZ tax resident** (status quo; add Thai filing if legally required anyway).
- **S2 — Sole Thai residency** (NZ residency deliberately ceased; Thai remittance tax on the
  real pattern, under current law and under the draft exemption).
- **S3 — Dual residency resolved by treaty tie-breaker** (the most likely *actual* current
  position pending evidence).
- **S4 — Restructured extraction** (contractor fees vs director's fees vs dividends) on a
  Thai-resident base — only structures a licensed adviser could plausibly implement.

Each is assessed on: total tax across NZ/AU/Thailand; compliance cost; enforcement/penalty
risk; reversibility; and second-order effects on HA Pty Ltd and T&H Collective (and thus on
Hadleigh Vernall and Henry Holmes).

---

## 2. S1 — Remain NZ tax resident

**Mechanism.** Theo stays NZ tax-resident (whether by choice or because a NZ permanent place
of abode persists — `02` §2, Van Uden). NZ taxes **worldwide** income; the HA/T&H services
income is returned in NZ on an IR3. Australia has no taxing right over the services income if
it is not Australian-source and there is no AU PE (`04` §1; `05` Art 7, 2009 treaty). Thailand
taxes only if Theo is **also** Thai-resident (≥180 days) and remits — if so, NZ gives a
foreign tax credit / the NZ–Thailand DTA relieves.

**Illustrative tax (AUD 24,543 services income):**
- **NZ:** taxed at NZ marginal rates on worldwide business income. On ~NZD 27k of net income
  (rough AUD→NZD parity assumed) the NZ tax is roughly **NZD 3,000–4,000** at the 10.5%/17.5%
  steps, before ACC levies and expenses. ILLUSTRATIVE — depends on actual income, expenses,
  provisional tax, and the AUD/NZD rate.
- **Australia:** nil on services income (non-resident, non-AU-source).
- **Thailand:** if also ≥180 days resident, Thai remittance tax per `03` §8 (illustrative
  THB 18k–110k), **credited/relieved** against NZ under the DTA to avoid double tax (net
  additional cost is the *higher* of the two systems on the remitted slice, plus Thai
  compliance).

**Compliance cost.** Moderate: NZ IR3 (and provisional tax/GST if registered), plus — if
Thai-resident — a Thai PND 90. Two filing systems.

**Enforcement/penalty risk.** Low–moderate. NZ is the "safe" filing home. The live exposure
is an **omitted Thai return** if Theo is in fact Thai-resident and has remitted (see S3) —
that risk exists in S1 too and is not cured by remaining NZ-resident.

**Reversibility.** Fully reversible — it is the status quo; no irreversible step taken.

**Second-order effects on HA/T&H.** None from Theo's residence. The company CM&C/Thai-PE risk
(`04` C.1) is **independent** of Theo's personal residence and persists in every scenario.

---

## 3. S2 — Sole Thai residency (NZ residency ceased)

**Mechanism.** Theo deliberately ceases NZ residency: 325-day absence achieved **and** every
NZ permanent place of abode abandoned (`02` §1.3, §3 — both are required; Van Uden means a
retained NZ home defeats this). NZ then taxes only NZ-source income (likely nil on the
services income). Thailand taxes foreign-source income **on remittance** under Por 161/162
(`03`). Australia unchanged (nil on non-AU-source services; `04`).

**Illustrative tax:**
- **NZ:** nil on services income once genuinely non-resident (subject to a part-year IR3 in
  the cessation year, and any GST deemed-supply exit cost — `02` §5).
- **Australia:** nil on services income (unchanged).
- **Thailand (current law, Por 161/162):** illustrative **THB 18,000–110,000 (~AUD 780–4,800)**
  per year on remittances (`03` §8), driven mainly by whether the ~AUD 24,860 ATM line is a
  remittance of assessable income and by characterisation. A genuine evidenced pre-2024
  savings pool (Por 162) could reduce this materially, potentially toward nil, if remittances
  trace to pre-2024 capital.
- **Thailand (hypothetical draft exemption — NOT enacted, `03` §3):** THB 0 on 2025/2026
  income remitted in-year. **This relies on law that does not exist in July 2026** — see the
  sensitivity note §6.

**Compliance cost.** Low–moderate: one primary system (Thai PND 90) once NZ cessation is
complete, plus the one-off NZ exit compliance (part-year IR3, GST s 52/s 5(3) if registered).

**Enforcement/penalty risk.** **Moderate–high**, and asymmetric:
- NZ side: the cessation must be *real*. If IRD later finds a retained NZ PPOA (Van Uden),
  Theo was NZ-resident all along and has under-returned worldwide income — with use-of-money
  interest and shortfall penalties.
- Thai side: if a PND 90 was required for 2025 and not filed, s.27 surcharge (1.5%/month) and
  s.35 fine apply, and an officer assessment can carry 100–200% penalties (`03` §6).
- CRS makes both sides visible (`03` §9).

**Reversibility.** **Low — this is the irreversible-class decision.** Ceasing NZ residency
(abandoning the PPOA, exiting GST, triggering a deemed supply) is costly and slow to undo, and
re-establishing NZ residence has its own consequences. The brief is explicit that this is
irreversible-class; the modelling must not treat it as a light switch.

**Second-order effects on HA/T&H.** None from Theo's residence directly; company CM&C/Thai-PE
risk persists independently (`04` C.1).

---

## 4. S3 — Dual residency resolved by treaty tie-breaker

**This is most likely the *actual current* position for 2025–26 on the brief's own facts**
(NZ domestic residence sticky via PPOA + Thai residence via ≥180 days), pending evidence. It
is a description of reality, not an elective structure.

**Mechanism.** Theo is resident under **both** NZ and Thai domestic law. The **NZ–Thailand DTA
Art 4** tie-breaker (`05` §4) assigns a single treaty-residence: permanent home → centre of
vital interests → habitual abode → nationality → MAP. The winner determines which counterparty
treaty frames the Australian income (`05` §5):
- Tie-breaks to **Thailand** → AU income framed by the **Australia–Thailand 1989 DTA** (Art 14
  IPS / Art 7).
- Tie-breaks to **NZ** → AU income framed by the **NZ–Australia 2009 DTA** (Art 7 business
  profits).

**Likely direction (INFERRED, fact-gated, `05` §4):** if **no** NZ dwelling remains available,
step 1 resolves to **Thailand**. If a NZ home remains available and vital interests are split
(personal ties Phuket; economic ties NZ registration/banking + AU customers), it can run to
**nationality (NZ)** or MAP.

**Illustrative tax.** Same underlying flows as S1/S2; the tie-break decides *which system is
primary and which relieves*:
- If Thai treaty-residence wins: **Thailand primary** (remittance tax as `03` §8); NZ must
  relieve as the loser state / Theo files NZ non-resident; **AU nil** on services (no AU PE /
  fixed base assumed).
- If NZ treaty-residence wins: **NZ primary** (worldwide, as S1); Thailand relieves on the
  remitted slice; AU nil.
- **Net cost ≈ the higher of the two systems on the overlapping slice** (double tax is
  relieved, not stacked) **plus dual compliance** while the position is unresolved.

**Compliance cost.** **Highest of all scenarios** while unresolved: returns in **both** NZ and
Thailand, foreign tax credit claims, and potentially a **MAP** request (`05` §8 Q7) if the
competent authorities must resolve residence. This is the cost of *not* deciding.

**Enforcement/penalty risk.** Moderate: the exposure is temporary double taxation and
mismatched credits pending resolution; plus the omitted-Thai-return risk if filings lag.
Australia's source-taxing rights over any **directors' fees/dividends** sit *on top* of an
unsettled residence question (`05` §5).

**Reversibility.** High — no irreversible step; it is a transitional state that resolves once
evidence fixes the tie-breaker facts. This argues for **resolving the facts before electing
S1 or S2**, not for locking in a structure now.

**Second-order effects on HA/T&H.** Company CM&C/Thai-PE risk persists (`04` C.1).

---

## 5. S4 — Restructured extraction (Thai-resident base)

**Scope discipline (operating rule 4).** No offshore entities or trusts are proposed. This
scenario only compares the **three existing extraction characters** for the money Theo already
receives, on a Thai-resident base, as a licensed adviser could implement. It assumes S2/S3 has
settled Theo as Thai treaty-resident.

**Three characters (per `04` §3 and `05` §6):**

| Route | Australia | Thailand | Notes |
|---|---|---|---|
| **Contractor fees** (current) | Nil if non-AU-source & no AU fixed base (Art 14, 1989 DTA); AU may tax attributable portion if AU fixed base/day threshold met | Assessable on remittance (Por 161/162); s.40(2) or (8) character | Simplest; status quo; source gap G-17 decisive |
| **Director's fees** (if Theo is a director) | **Australia MAY tax at source** (Art 16, 1989 DTA), PAYG withholding by company (`04` §3.2) | Thailand (residence) taxes with credit for AU tax | Worse than contractor route if AU taxes at source; only if duties genuinely performed for AU-resident company |
| **Dividends** (if Theo is a shareholder) | **Franked: nil** AU WHT; **unfranked: 30%** less treaty relief (Art 10 → 15%/20%) (`04` §3.1) | Thailand taxes dividend on remittance with credit for AU WHT | Requires company profits + franking capacity; interacts with HA/T&H company tax already paid |

**Illustrative comparison (per AUD 24,543 extracted, Thai-resident base, ILLUSTRATIVE):**
- **Contractor fees:** AU nil; Thai ~THB 18k–110k (`03` §8). **Lowest combined**, on assumed
  facts. Total ≈ AUD 780–4,800.
- **Director's fees:** if AU asserts source, AU PAYG at non-resident rates on the fee **plus**
  Thai tax with credit → generally **higher** combined than contractor fees, unless duties are
  clearly performed outside Australia (then it collapses back toward the contractor result).
- **Fully franked dividends:** AU WHT nil, but the **company** has already paid ~25–30% AU
  company tax to generate franking — so the *economic* total (company + shareholder) is
  **higher** than the contractor route, and Thai remittance tax still applies with a credit for
  AU tax. Only attractive where profits must in any event be retained/taxed at the company
  level.

**Compliance cost.** Higher: requires company-level accounting (franking accounts, dividend
documentation, or director-fee PAYG), Thai returns, and treaty credit claims. Legal/adviser
set-up cost across two or three jurisdictions.

**Enforcement/penalty risk.** Moderate–high: any *re-characterisation* of existing
Australian-performed work into an offshore/dividend form must survive **Part IVA** (`04` §4) —
objective dominant-purpose test. Re-papering to reduce tax is exactly what Part IVA targets.

**Reversibility.** Route choice is moderately reversible year-to-year, **but** it is entangled
with the S2 irreversible NZ-cessation step it presupposes.

**Second-order effects on HA/T&H (material).** Director's-fee and dividend routes pull the
**companies** into the arrangement: franking capacity, company tax, PAYG registration for
director fees, shareholder agreements, and — critically — the **CM&C/Thai-PE risk** (`04` C.1)
is **aggravated** if Theo's role is recast as a director/decision-maker operating from
Thailand. That risk lands on **Hadleigh Vernall and Henry Holmes**, not just Theo. A route that
lowers Theo's personal tax by making him a Thailand-based director could *increase* the
companies' exposure — a direct conflict to flag.

---

## 6. Sensitivity note — the unenacted Thai decree (mandatory)

Every scenario's Thai number has **two states**:
- **Under current law (Por 161/162 — the enacted base case):** remittances of post-2024
  foreign income are assessable; illustrative Thai tax THB 18k–110k/year (`03` §8).
- **Under the draft two-year remittance exemption:** THB 0 on in-year/next-year remittances.

**The draft exemption is NOT enacted as at July 2026** (`03` §3; orchestrator-verified twice
by web search). It stalled through the 8 Feb 2026 election and government formation. **No
scenario may be recommended on the basis that the exemption will pass.** Any plan whose
advantage depends on the exemption is, in July 2026, betting on legislation that does not
exist and may never pass in that form. If a scenario looks attractive *only* under the
exemption, that is a red flag, not a plan (see `07` red-team).

---

## 7. Comparison table

| Dimension | S1 Remain NZ | S2 Sole Thai | S3 Dual (tie-break) | S4 Restructure |
|---|---|---|---|---|
| **NZ tax** | Worldwide (illus. NZD 3–4k) | Nil once ceased (+ exit costs) | Higher-of, relieved | As S2 |
| **AU tax (Theo)** | Nil on services | Nil on services | Nil on services | Route-dependent (dividends/dir. fees can add AU) |
| **Thai tax** | Only if ≥180 days; relieved | THB 18–110k (0 under unenacted draft) | THB 18–110k, primary or relief | THB 18–110k + route effects |
| **Combined (illus.)** | NZD ~3–4k + Thai if resident | ~AUD 780–4,800 | ~higher-of the two | Contractor lowest; dir/div higher |
| **Compliance cost** | Moderate (NZ + maybe Thai) | Low–moderate (Thai + NZ exit) | **Highest** (dual + MAP) | High (company-level + treaty) |
| **Enforcement/penalty risk** | Low–moderate | Moderate–high (cessation must be real; omitted Thai return) | Moderate (temp. double tax) | Moderate–high (Part IVA) |
| **Reversibility** | Full | **Low (irreversible-class)** | High | Low (presupposes S2) |
| **Effect on HA/T&H (co-owners)** | Neutral | Neutral | Neutral | **Adverse** if Thai-director route (CM&C/PE) |
| **Relies on unenacted decree?** | No | Only the "THB 0" variant | No | No (unless it leans on draft) |

**Headline (ILLUSTRATIVE, not advice):** the Thai tax at stake on the brief's figures is
**small in absolute terms (~AUD 780–4,800/year)**. That materially weakens the case for taking
an **irreversible** NZ-cessation step (S2) primarily to save Thai tax — especially when (a) the
NZ PPOA test may keep Theo NZ-resident anyway (`02`), (b) the biggest number in the model is an
**unsubstantiated** ATM figure, and (c) the "THB 0" outcome depends on an **unenacted** decree.
The disciplined path is to **resolve the evidence and the tie-breaker (S3) before electing S1
or S2** — the decision does not need to be made irreversibly now, and the sums do not justify
haste.

---

## 8. What is required before any of this is real

- Day counts (G-01/03) → confirms Thai residency and NZ cessation timing.
- Remittance map + 31 Dec 2023 balances (G-04/06) → fixes the Thai base and the Por 162 pool.
- Invoices + characterisation (G-05/16) → selects the treaty article and Thai s.40 character.
- NZ dwelling / ties (G-07) → decides the PPOA and the tie-breaker.
- Directorship/shareholding + work-in-Australia facts (G-16/17) → S4 feasibility and AU source.

---

## Revision log (responses to Phase 3 red-team)

*To be completed after `07-redteam.md`. Each red-team finding will be answered here.*
