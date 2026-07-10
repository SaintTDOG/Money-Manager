# 07 — Red-Team Review (Adversarial)

**Engagement:** Cross-Border Tax Position Review — Theo Holmes
**Prepared:** 10 July 2026
**Reviewer role:** Sceptical senior tax reviewer, no involvement in producing memos 00–06.
**Mandate:** Attack the pack. Australian English. Severity-ranked. This memo is itself
**not advice and not a filing position** — it is an internal challenge document.

---

## 0. How to read this

Findings are ranked **Critical → High → Medium → Low**. Each carries an ID, the file and
section it attacks, the specific defect, why it matters, and a required fix or challenge
question. Offending text is quoted where it sharpens the point. A short "What the pack got
RIGHT" section follows, then the five things that must change before any adviser sign-off.

The blunt headline: **the pack is a competent statement of law wrapped around a tax
computation that has no evidentiary foundation and no primary-source verification.** It is
safe to hand a licensed adviser as a research scaffold. It is **not** safe for anyone to
read the recurring "≈ AUD 780–4,800" range, the "nil AU tax" cells, or the "disciplined
path is…" steer as conclusions. Several of those presentations invite exactly that misread.

---

## CRITICAL

### RT-01 — The pack was produced past its own declared hard-stop, and the intake record was never reconciled
**Attacks:** `00-intake-register.md` §5–§6; `gaps.md` "Status"; against the mere existence
of `02`–`06`.

`00` states, in terms: *"Phase 1 has not been commenced. No residency conclusion, tax
figure, or scenario has been produced."* `gaps.md` closes: *"No Phase 1 agent has been
spawned and no figure has been modelled."* Yet `03` §8 models a Thai tax range, `06`
produces four fully-worked scenarios and a comparison table, and the task list marks every
phase complete. `01` and `03` both confirm `tax-review/inputs/` is **still empty** — so no
new evidence arrived to lift the stop. The engagement's own Phase 0 gate ("the entire
analysis is unsafe without" day-count evidence) was therefore crossed without the condition
that triggered it ever being cleared, and the intake register was never updated to say so.

**Why it matters:** A reader opening `06` sees scenarios and dollar figures; a reader
opening `00` is told none exist. The two cannot both be true. Whichever is authoritative,
the document set is internally contradictory on the single most important control question —
*is there an evidence base?* — and a downstream synthesiser or client could easily treat the
illustrative numbers as findings.

**Required fix:** Reconcile explicitly. Either (a) formally re-scope the engagement as
"law-only research plus a labelled illustration, produced notwithstanding the Phase 0 stop,
on zero primary evidence," and amend `00`/`gaps.md` to record that decision and who
authorised it; or (b) withdraw the modelled layer. Until reconciled, no number in the pack
may be relied upon and the synthesis must lead with this contradiction.

### RT-02 — No primary legal text was actually verified; the KNOWN/INFERRED labels overstate reliability
**Attacks:** `02` §0 and Tool note; `03` (all "verified 10 July 2026" tags); `04` §8;
`05` §0 and Egress note.

Every memo concedes that `legislation.govt.nz`, `taxtechnical.ird.govt.nz`, AustLII, the
Thai Revenue Department, the ATO and Treasury all returned **HTTP 403** to the research
tool, and that propositions were "verified" only through **web-search indexing and secondary
professional summaries**. That means **not one statute section, case holding, treaty article
or rate in this pack was read against its primary source.** Yet the memos deploy a **KNOWN**
label as if primary-verified (e.g. `02` "KNOWN law"; `05` §1 "IN FORCE (KNOWN)"; `03`
"KNOWN (enacted law)"). "KNOWN" here means, at best, "consistently reported by secondary
sources a search surfaced in July 2026."

**Why it matters:** Secondary sources paraphrase, lag, and occasionally err on the very
things that decide this case (part-day counting asymmetry, exact tie-breaker wording, WHT
tiers, whether a separate IPS article survives). A pack that cannot open the primary text
cannot distinguish "settled law" from "widely-repeated summary," and the label implies a
confidence the method cannot support.

**Required fix:** Re-cast the labels. Nothing egress-blocked should read "KNOWN" unqualified;
it should read "reported/secondary-verified — not primary-checked." The adviser must
line-check the primary text for every load-bearing proposition (RT-05 lists the priority
list). Do not let a synthesis inherit "KNOWN" at face value.

---

## HIGH

### RT-03 — The NZ "currency alert" (IS 25/16 replaces IS 16/03) is contradicted by its own citation
**Attacks:** `02` §0 "Currency alert", §2.3, §9.

`02` asserts, in bold, that *"IS 16/03 has been replaced by IS 25/16 'Tax residence'
(issued May 2025)"* and cites IS 25/16 "throughout." But the landing-page URL it gives for
that statement is `…/interpretation-statements/is-1603-tax-residence` — i.e. the slug for
**IS 16/03** — reused in §1.1, §2.3 and §9. The case-summary URL in §2.1 is the same
`is-1603` page. Only a single PDF link (`…/is-25-16.pdf`) points at the claimed new
statement, and that too is egress-blocked, so the replacement was never confirmed.

**Why it matters:** This is precisely the "stale vs current source" risk the engagement
told me to hunt. If IS 25/16 does not exist, or does not say what the memo attributes to it,
the entire PPOA framework in `02` (the pack's dominant NZ risk) rests on an unverified
currency claim whose own footnote points back at the superseded statement.

**Required fix:** Line-check on the IRD Tax Technical site whether IS 25/16 exists, its issue
date, and that it replaced IS 16/03. Correct every URL that currently points at `is-1603`.
Until confirmed, flag the PPOA analysis as resting on an **unverified** interpretation
statement.

### RT-04 — The remittance base conflates "income received" with "brought into Thailand", and the flagged double-count is not honoured in the model
**Attacks:** `01` (b) and (c); `03` §8.2; `06` §0 dataset and S2.

`01`(c) itself warns: *"CBA transfers (may be income and/or remittance) … Double-counting
risk vs income schedule; must reconcile."* The model then ignores its own warning: `03` §8.2
and `06` build `R` (assessable **remittances**) as `19,000 CBA + 5,543 T&H (+ 24,860 ATM)` —
i.e. it drops the **income** figures straight into the **remittance** base. But "CBA" is the
Commonwealth Bank of **Australia**: "income via CBA transfers" most naturally describes funds
**received in Australia**, which is **not a remittance into Thailand at all**. If that is
right, the entire "low case" `R` (≈ THB 564,500) is largely phantom, and the only genuine
Thai remittance in the dataset is the **expressly unsubstantiated** ATM line. Separately, the
memo's own §4 identifies **foreign-card THB spend** as a probable remittance, yet omits it
from `R` — so the base is simultaneously over-inclusive (CBA income that never entered
Thailand) and under-inclusive (card spend).

**Why it matters:** Remittance, not receipt, is the Thai charging event (`03` §1). A base
that mixes the two produces a number that is wrong in both directions and cannot be trusted
even as an illustration. The headline range is driven by this muddle plus an unsubstantiated
figure.

**Required fix:** Rebuild the base from a true "money into Thailand" schedule (item 10):
inbound transfers to Thai accounts, ATM withdrawals in Thailand, and THB card settlement —
each traced to income vs pre-2024 pool vs capital. Explicitly exclude receipts into
Australian accounts unless and until they are shown to have entered Thailand. State plainly
that, on the current dataset, the only candidate Thai remittance is an unsubstantiated ATM
figure — so the honest illustrative base is "unknown, possibly near nil, possibly the ATM
line only."

### RT-05 — Load-bearing treaty article numbers are inferred or secondary-only, yet the S3/S4 routing turns on them
**Attacks:** `05` §2 (NZ–TH table, most rows "INFERRED"), §3.1 (AU–TH Art 14/16 "KNOWN
(secondary)"), §6 matrix; `06` S3–S4.

`05` concedes the NZ–Thailand DTA article numbers (Art 7/10/11/14/15/16) are **INFERRED from
the OECD-Model standard structure — verify against DLM267900**, because the primary text was
403-blocked. The routing engine of the whole scenario set — "Thai-residence → AU income under
AU–TH 1989 Art 14 IPS; NZ-residence → AU–NZ 2009 Art 7" — depends on (i) the AU–TH 1989 treaty
actually retaining a separate IPS Article 14, and (ii) the 2009 treaty actually having deleted
it. Both are asserted "KNOWN," but under RT-02 neither was primary-checked; the AU–TH Art 14
and Art 16 claims rest on Orbitax/secondary summaries and an egress-blocked ATO Sch 30 link.

**Why it matters:** If the AU–TH treaty does **not** contain a separate IPS article (or its
day/fixed-base threshold differs from the assumed ~183 days), the S3/S4 "which article frames
the AU income" analysis and the "AU may tax the attributable portion" conclusions change. The
divergence the memo itself calls "a substantive difference, not a formality" (`05` §3.2) is
built on unverified article numbers.

**Required fix:** Line-check DLM267900 (NZ–TH) and ITAA 1953 Schedule 30 (AU–TH) against the
primary/MLI-synthesised texts and confirm: separate IPS article yes/no in each; exact
fixed-base and day thresholds; and the dividend/interest WHT tiers in `05` §3.1 (15%/20% and
10%/25%) that feed the S4 dividend route. Treat every INFERRED article number as unconfirmed
until then.

### RT-06 — The company Thai-PE / CM&C exposure to Hadleigh and Henry may already be live and is left unquantified
**Attacks:** `04` C.1–C.3; `06` S4 "Second-order effects".

The pack correctly says incorporation preserves the companies' AU residency, so the real
company-level risk is a **Thai** PE / management presence (`04` C.1). But it then (a) gates
that risk on "IF Theo is a director/decision-maker" and treats his directorship as merely
"unconfirmed," and (b) frames the exposure as something a **restructure** would "aggravate"
(`06` S4), rather than a risk that may **already exist**. The entity is named **"T&H
Collective"** and the co-owner is **Henry Holmes**; on the obvious reading (Theo & Henry
Holmes) Theo is very likely already a principal/decision-maker of T&H directing it from
Phuket **now**. If so, the Thai-PE/CM&C exposure is present in **every** scenario, not just
S4 — and a Thai PE of an Australian company can draw company profits into Thai corporate tax
and create Thai corporate filing obligations, a number that could **dwarf** the personal
THB 18–110k the whole pack fixates on. It is never sized, and the 1989-treaty PE **threshold**
(fixed place of business / dependent agent / services-PE time test) is never analysed, so the
risk is asserted directionally without either an upper or lower bound.

**Why it matters:** The mandate asked whether this risk is under- or over-stated. It is
**under-developed**: possibly live today, possibly the largest exposure in the matter, borne
by Hadleigh Vernall and Henry Holmes rather than Theo — yet it sits as a qualitative footnote
while a small personal figure is modelled to the baht.

**Required fix:** Resolve Theo's directorship/decision-making role in each company as a
priority fact (not a background gap). If he directs T&H (or HA) from Thailand, run the AU–TH
treaty PE threshold and give at least an order-of-magnitude company-tax/compliance estimate,
and state that it may exceed Theo's personal Thai tax. Move this from S4 to a standing,
all-scenarios company-level risk.

### RT-07 — "Nil AU tax" is over-confident: it rests on two unassessed Australian-presence facts, not one
**Attacks:** `04` §0, §1.3, §5; `06` §0 dataset and comparison table row "AU tax (Theo): Nil".

The "likely nil Australian tax" view rests on **two** ASSUMED facts, and the pack fully
tests neither. `04` foregrounds G-17 (no work performed physically in Australia) but simply
**assumes** the prior question — that Theo is a **foreign resident of Australia** — away
(`04` §0: "Theo is a **foreign resident** … Both premises are **ASSUMED** here"). There is
**no AU day count anywhere in the pack** and **no application of the AU residency tests**
(resides/domicile/183-day/superannuation). For a man invoicing two Australian companies who
may well visit Australia, AU residency is a live question, not a given. The comparison table
in `06` then states **"AU tax (Theo): Nil on services"** flatly across three of four columns,
dropping even the "likely/contingent" hedge the underlying memo carried.

**Why it matters:** If Theo is an AU resident in any year (e.g. >183 days, or domicile with
no proven permanent place of abode abroad), the whole `04` analysis inverts to worldwide
assessment — and the pack has not done the day count that would exclude it. The mandate
flagged G-17; the deeper hole is that AU residency itself is assumed.

**Required fix:** Add an explicit AU residency assessment (day count + resides/domicile/
183-day/super tests) as a gated hypothetical, and restore the hedge to every "nil AU"
presentation. The comparison table must read "Nil **if** foreign-resident and no AU-performed
work — both unverified," not "Nil."

---

## MEDIUM

### RT-08 — The "THB 0 under the draft exemption" outcome is printed inside the decision comparison table
**Attacks:** `06` §7 comparison table (Thai-tax row: *"THB 18–110k (0 under unenacted
draft)"*); `03` §8.2; `06` S2.

The pack's §6 sensitivity note is strong and correct — the draft exemption is **not enacted**
and no scenario may be recommended on it. But the comparison table, the one artefact a busy
reader actually scans, still displays the seductive **"0"** next to S2's Thai line, and the
headline repeats the "THB 0" what-if. This is exactly the "THB 0 outcome could seduce a
reader" risk the mandate named. A caveat three sections away does not neutralise a "0"
printed in the decision grid.

**Why it matters:** Decision tables get lifted out of context. The "0" is the most quotable
cell in the pack and depends on legislation that does not exist.

**Required fix:** Remove the "0/draft" figure from the comparison table (or strike it through
with "NOT LAW"), and keep the draft exemption only in the prose sensitivity note. Do not let
any tabular or headline cell carry a number that assumes unenacted law.

### RT-09 — `06` §7's "disciplined path" headline edges from decision-support into a recommendation
**Attacks:** `06` §7 ("**The disciplined path is to resolve the evidence and the tie-breaker
(S3) before electing S1 or S2**"); relatedly `03` §5 ("On the facts Theo **would file** PND
90").

Every memo disclaims being a filing position, but `06` §7 delivers a directional steer — which
scenario to pursue and in what order — that reads as advice, not neutral mapping. `03` §5
similarly states a filing-form conclusion. The engagement prohibits presenting a filing
position; a "the disciplined path is X" recommendation is arguably over that line.

**Why it matters:** The pack's credibility rests on staying inside "here is the law and the
mechanics." A recommendation, however sensible, is the licensed adviser's call, and its
presence lets a reader treat the pack as advice.

**Required fix:** Reframe §7 as "considerations for the adviser to weigh" (irreversibility,
small sums, PPOA stickiness) without instructing a sequence. Change `03` §5 to conditional
("if resident with assessable remittances, a PND 90 would be the relevant return").

### RT-10 — Single flat FX rate (AUD 1 = THB 23.0) across all remittances
**Attacks:** `03` §8.2; `06` §0 dataset; carried into every Thai figure and the headline
range.

A single assumed rate is applied to every remittance regardless of date, then the resulting
THB figures drive bracket allocation and the "≈ AUD 780–4,800" headline. Thai law requires
the rate at each remittance date; 2025–26 AUD/THB moved enough to shift bracket outcomes and
the AUD re-conversion of the tax. The memos flag FX as "a material variable" but then present
the single-rate output as a firm-looking range.

**Why it matters:** The precision implied by "THB 17,950" and "AUD 780" is spurious under a
one-rate assumption on unverified amounts.

**Required fix:** State the figures to no more than two significant figures, apply per-date
rates once a real remittance schedule exists, and show an FX sensitivity band.

### RT-11 — The s.40(8) sensitivity figure does not reconcile to its stated deduction
**Attacks:** `03` §8.2 sensitivity note.

The memo says that if the income were s.40(8) business income with a **60% deduction**, the
high-case tax "falls materially (to **roughly THB 25,000** / AUD ~1,100)." Recomputing on the
memo's own high-case `R` (THB 1,136,300): 60% deduction = THB 681,760, less THB 60,000
allowance → `N` ≈ THB 394,500 → progressive tax ≈ **THB 16,950**, not THB 25,000. The stated
figure is overstated by roughly 45–50%.

**Why it matters:** It is a self-contained arithmetic check that fails, in a pack whose
authority depends on its numbers being internally correct. If a reader cannot trust the
sensitivity figure, they cannot trust the base figures either.

**Required fix:** Recompute and correct the s.40(8) sensitivity (≈ THB 17,000 on the stated
inputs), or show the working that produces THB 25,000.

### RT-12 — The "≈ AUD 780–4,800" range is repeated until it reads as the answer
**Attacks:** `03` §8; `06` S2, S4, §7 comparison table, §7 headline.

The same illustrative range appears in at least five places. Each instance is individually
caveated, but repetition reifies it: by the comparison table and headline it has become the
de facto "the Thai tax at stake." Given RT-04 (base is muddled) and RT-10 (FX), this range is
a placeholder, not a result — and its repetition is the pack's main motivated-reasoning
vector, pulling the reader toward "the sums are small, so relax."

**Why it matters:** The mandate asked where motivated reasoning toward the low-tax answer
hides. It hides here — not in a false statement, but in the reification of an ungrounded
number through repetition.

**Required fix:** State the range once, in `03`, boxed as "illustrative mechanics only —
base unverified," and elsewhere refer back to it rather than re-quoting it. Ensure the
"small sums" argument is expressly conditioned on the base being real.

---

## LOW

### RT-13 — S1 NZ tax rests on a loose "AUD→NZD parity" and no expense deduction
**Attacks:** `06` S1.

S1 assumes "rough AUD→NZD parity" (actual ≈ 1.08–1.10) and applies NZ rates to gross
receipts with no business-expense deduction, producing "NZD 3,000–4,000." Recomputation gives
≈ NZD 3,200 (parity) to NZD 3,600 (at 1.10) before expenses/ACC — within the stated band, so
not material, but the "parity" shorthand is wrong and a real sole-trader figure would be net
of expenses. Tighten the assumption; the direction (slightly overstating NZ tax) is at least
conservative.

### RT-14 — `05` matrix "AU asserts source" vs `04` "likely no AU source" can confuse a reader
**Attacks:** `05` §6 matrix and §6.1; `04` §1.3, §5.

`04` concludes AU likely has **no source** over the contractor fees (so no AU tax before the
treaty is reached), while `05`'s matrix runs the treaty "assuming AU asserts source, for
completeness." Both positions are defensible and the memos flag the assumption, but a reader
moving between them may think the pack contradicts itself on AU taxing rights. Add a one-line
cross-reference in `05` §6 making clear the source assumption is a completeness device, not a
view that AU source exists.

### RT-15 — Part-day counting asymmetry (NZ s YD 1(8)) is stated as settled but unverified
**Attacks:** `02` §1.4.

The memo states the NZ part-day rule is asymmetric and taxpayer-adverse at both ends (present
part-day counts as presence; present part-day does **not** reduce the 325-day absence count).
This drives cessation timing, and it is egress-blocked/secondary-only. If the absence-count
treatment is stated wrongly, the backdated cessation date in `02` §3 and `06` S2 shifts.
Line-check s YD 1(8) directly.

---

## What the pack got RIGHT (fair is fair — the synthesis can rely on these)

1. **Disciplined labelling.** The KNOWN/INFERRED/ASSUMED convention is applied consistently
   and the ATM figure is flagged "unsubstantiated" everywhere it appears. The discipline is
   real; RT-02 attacks the *reliability* of "KNOWN," not the honesty of the labelling.
2. **Van Uden / PPOA identified as the dominant, sticky NZ risk.** `02` correctly makes the
   permanent-place-of-abode test override the day counts, and correctly warns that a retained
   NZ home can keep Theo NZ-resident regardless of a perfect 325-day absence. This is the
   right central NZ insight.
3. **Conservative base assumptions — the OPPOSITE is not smuggled.** Nil Por 162 pool
   (maximum base) and the less-favourable s.40(2) deduction are used as the base case, both of
   which **raise** the illustrative tax. The memo does not quietly assume a large exempt pool;
   where it mentions a pool it conditions it on evidence. Good.
4. **The draft Thai exemption is correctly and repeatedly treated as NOT enacted**, with a
   mandatory sensitivity note forbidding any recommendation built on it (`03` §3; `06` §6).
   The only residue is the table cell at RT-08.
5. **The assumption that ceasing NZ residency is beneficial is directly challenged**, not
   assumed. `06` §7 concludes the small illustrative Thai tax does not justify the
   irreversible S2 step, given PPOA stickiness and the unsubstantiated ATM driver. This is the
   correct anti-motivated-reasoning stance and the pack deserves credit for reaching it.
6. **Company-level risk is separated from Theo's personal position** and the Hadleigh/Henry
   conflict in the director/dividend routes is flagged (`04` C.1; `06` S4). RT-06 asks for it
   to be quantified and brought forward, but the issue was correctly spotted.
7. **The double-count and characterisation risks were flagged** in `01`(c)/(b), even though
   the model then failed to honour them (RT-04). The flags are the right ones.

---

## Top 5 things that must change before any adviser sign-off

1. **Reconcile the Phase 0 stop (RT-01) and stop calling secondary-verified law "KNOWN"
   (RT-02).** Either formally re-scope the pack as "law-only + labelled illustration on zero
   primary evidence, produced despite the stop" and amend `00`/`gaps.md`, or withdraw the
   modelled layer. Relabel all egress-blocked propositions as not-primary-checked.
2. **Line-check the primary texts before reliance (RT-03, RT-05, RT-15).** Priority: NZ IS
   25/16 vs IS 16/03 (and fix the `is-1603` URLs); NZ–TH DTA article numbers at DLM267900;
   AU–TH Sch 30 Art 14 IPS existence and thresholds plus WHT tiers; NZ s YD 1(8) part-day
   asymmetry.
3. **Rebuild the Thai remittance base honestly (RT-04).** Separate "income received" from
   "brought into Thailand," resolve the CBA double-count, include card spend, and state that
   on the current dataset the only candidate remittance is an unsubstantiated ATM figure — so
   the headline range is a placeholder, not a result.
4. **Resolve Theo's directorship and quantify the company Thai-PE/CM&C exposure (RT-06).** If
   he directs T&H/HA from Thailand, this may be the largest live number in the matter and
   lands on Hadleigh Vernall and Henry Holmes. Bring it forward from an S4 footnote to a
   standing, all-scenarios, sized risk.
5. **Strip advice-flavoured and unenacted-law presentations from the decision surface
   (RT-07, RT-08, RT-09).** Remove the "THB 0/draft" cell from the comparison table, restore
   the "nil AU tax" hedge (and add an AU residency test), and downgrade the "disciplined path
   is…" headline to adviser-weighable considerations. Fix the s.40(8) arithmetic (RT-11)
   while there.

---

*End of 07-redteam.md. Internal adversarial review; not advice; not a filing position.*
