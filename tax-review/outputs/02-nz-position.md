# 02 — New Zealand Tax Position (Law-Only Research Memo)

**Engagement:** Cross-Border Tax Position Review — Theo Holmes
**Prepared:** 10 July 2026
**Author:** Agent 2 (NZ law research)
**Status:** DECISION-SUPPORT ONLY. This is **not tax advice** and **not a filing
position**. It is a current-law research memo prepared as input to a handover pack for a
licensed New Zealand accountant/tax agent, who must verify every point against primary
evidence before any return is filed or position taken.

---

## 0. Evidence position and scope limitation (read first)

**KNOWN:** No client source documents exist in the repository — no passport stamps,
flight records, day-count table, NZ dwelling evidence, bank statements, invoices, or IRD
correspondence (see `00-intake-register.md` and `gaps.md`, gaps G-01 to G-23). The Phase 0
stop condition is met.

**Consequence:** This memo therefore states the **law only**. It does not and cannot
reach a residency conclusion, because residency under New Zealand law is a fact-driven
enquiry and no facts are in evidence. Where the client fact-pattern is mentioned it is
expressly flagged as an **INFERRED** or **ASSUMED** hypothetical, and the specific missing
evidence that would resolve it is named.

**Verification method:** Each legal proposition below was checked by web search in **July
2026** and carries a `(verified July 2026)` tag plus a source URL. Direct machine-fetch of
`legislation.govt.nz` and `taxtechnical.ird.govt.nz` returned HTTP 403 to the research tool
on 10 July 2026; content was therefore verified through indexed search results and secondary
professional sources that quote the primary text. **The NZ accountant should open each cited
URL directly to confirm the exact statutory wording before relying on it.**

**Currency alert (important):** IRD's long-standing residence interpretation statement
**IS 16/03 has been replaced by IS 25/16 "Tax residence" (issued 16 May 2025)**. IS 25/16 is
the current statement and is cited throughout. (verified July 2026)

> **Post-review correction (RT-03).** An earlier draft cited IS 25/16 using the old
> `interpretation-statements/is-1603-tax-residence` slug (the URL for the superseded IS
> 16/03). The correct location, re-verified 10 July 2026, is
> https://www.taxtechnical.ird.govt.nz/interpretation-statements/2025/is-25-16 (issue date
> 16 May 2025; confirmed by Deloitte NZ, "Out with the old, in with IS 25/16"). The URLs
> below are corrected. The substantive point — IS 25/16 exists and replaced IS 16/03 — is
> confirmed, not merely inferred.

---

## 1. The residence rules for a natural person — s YD 1 Income Tax Act 2007

New Zealand taxes **residents on worldwide income** and **non-residents only on
New Zealand-source income**. Individual residence is governed by **s YD 1 of the Income Tax
Act 2007**. There are three operative tests plus a part-day counting rule. (verified July
2026 — https://legislation.govt.nz/act/public/2007/0097/latest/DLM1523134.html)

### 1.1 Permanent place of abode (PPOA) — the overriding test — s YD 1(2)

A natural person **is** a New Zealand resident if they have a **permanent place of abode**
(PPOA) in New Zealand, **even if they also have a permanent place of abode elsewhere**. This
is the dominant rule: a person **cannot** shed New Zealand residence under the day-count
rules while they retain a PPOA here. "Permanent place of abode" is **not defined in the
statute**; its meaning comes from case law and IRD IS 25/16. (verified July 2026 —
https://legislation.govt.nz/act/public/2007/0097/latest/DLM1523134.html;
https://www.taxtechnical.ird.govt.nz/interpretation-statements/2025/is-25-16)

### 1.2 The 183-day rule (residence starts) — s YD 1(3)–(4)

A person **is** a New Zealand resident if they are **personally present in New Zealand for
more than 183 days in total in any 12-month period**. Residence is then treated as
**beginning on the first of those 183 days** (backdated), and continues until the person is
treated as ceasing to be resident. (verified July 2026 —
https://legislation.govt.nz/act/public/2007/0097/latest/DLM1523134.html)

### 1.3 The 325-day rule (residence ends) — s YD 1(5)–(6)

A person who is a New Zealand resident **stops** being resident if they are **personally
absent from New Zealand for more than 325 days in total in any 12-month period** **and** do
**not** have a PPOA in New Zealand. Non-residence is then treated as **beginning on the
first of those 325 days** (backdated). Because s YD 1(2) overrides, the 325-day rule can only
end residence if the PPOA has also gone. (verified July 2026 —
https://legislation.govt.nz/act/public/2007/0097/latest/DLM1523134.html)

### 1.4 Part-day counting — s YD 1(8)

For the **183-day (presence)** count, a person present in New Zealand for **part of a day is
treated as present for the whole day**. Conversely, for the **325-day (absence)** count, a
part-day present in New Zealand is **not** counted as a day of absence. The effect is
asymmetric and taxpayer-adverse at both ends (easier to be present, harder to be absent).
(verified July 2026 —
https://legislation.govt.nz/act/public/2007/0097/latest/DLM1523134.html; corroborated by
IRD guidance summarised at https://www.ird.govt.nz/international-tax/individuals/tax-residency-status-for-individuals)

### 1.5 Interaction summary (INFERRED from the above)

- Meeting **either** the PPOA test **or** the 183-day test makes a person resident.
- Ending residence requires **both** the 325-day absence test **and** loss of any PPOA.
- Residence and non-residence are **backdated** to the first day of the relevant 183/325-day
  window, so the cessation date is a computed output of the day-count table, not the date of
  physical departure.

---

## 2. The permanent place of abode test — leading cases

### 2.1 CIR v Diamond [2015] NZCA 613

The **leading authority** on the meaning and application of PPOA. Held: PPOA requires an
**integrated, objective factual assessment** of the nature and quality of the use the
taxpayer habitually makes of a particular dwelling — it is **more than the mere
availability** of a place to stay. A property the taxpayer had **never lived in** (there, an
investment property) was **not** a PPOA, and Mr Diamond was **non-resident**. Relevant
factors include the **continuity and duration of presence** in New Zealand and the
**durability of the taxpayer's association** with the particular place of abode.
(verified July 2026 —
https://www.taxtechnical.ird.govt.nz/case-summaries/2015/residency-interpretation-of-permanent-place-of-abode)

### 2.2 Van Uden v CIR [2018] NZCA 487 (leave to appeal dismissed [2019] NZSC 29)

Confirmed and applied Diamond. An itinerant foreign-employed sea captain who worked abroad
for decades was held to **have a PPOA in New Zealand** because a house (owned by his wife,
not him) **remained available to him as a home** whenever in New Zealand. Key points:
(a) the test is **objective**, not governed by the taxpayer's stated intention; (b) the
taxpayer **need not own** the dwelling in their own name; (c) heavy overseas presence does
**not** defeat a PPOA if an enduring New Zealand home is maintained. The Supreme Court
**declined leave** to appeal in [2019] NZSC 29, leaving the Court of Appeal reasoning as the
settled position. (verified July 2026 —
https://www.taxtechnical.ird.govt.nz/en/case-summaries/2019/supreme-court-dismisses-application-for-leave-to-appeal;
https://www.courtsofnz.govt.nz/assets/cases/2019/2019-NZSC-29.pdf)

### 2.3 IRD practice — IS 25/16 and the residency questionnaire

IRD's current view is **Interpretation Statement IS 25/16 "Tax residence" (May 2025)**,
which replaced IS 16/03 and adopts the Diamond/Van Uden framework, listing PPOA factors
(presence of a dwelling and its use; time spent in NZ; connections such as family, social
ties, employment/business, economic ties, property, and personal effects). IRD determines
individual residence in practice using the **IR886 "New Zealand tax residence questionnaire"**.
(verified July 2026 —
https://www.taxtechnical.ird.govt.nz/interpretation-statements/2025/is-25-16;
https://www.ird.govt.nz/international-tax/individuals/tax-residency-status-for-individuals)

**INFERRED application (hypothetical only):** On Van Uden, if Theo retains a New Zealand
dwelling that remains available to him as a home (e.g. a family home he can use, or a home
where personal effects are stored), he may **retain a PPOA and remain NZ-resident despite
living in Phuket** — regardless of day counts. This is the single most important NZ risk and
turns entirely on evidence that is **missing** (gap G-07).

---

## 3. Part-year residence and the date residence ceases

**INFERRED from s YD 1(5)–(6) + IS 25/16:** New Zealand residence does **not** end on the
calendar date a person emigrates. It ends on the **first day of the 325-day absence window**,
and only once (a) 325+ days of absence in a 12-month period are actually accumulated **and**
(b) no PPOA remains. Practically, a person who left New Zealand in (hypothetically) May 2025
cannot satisfy the 325-day absence count until roughly **April 2026**; when satisfied, the
cessation is **backdated** to the first absence day (~May 2025), but **not before**. Until
that window closes, the person is generally still treated as resident. If a PPOA is retained,
the 325-day rule never bites and residence continues indefinitely. (verified July 2026 —
https://legislation.govt.nz/act/public/2007/0097/latest/DLM1523134.html)

**Note on tax year vs calendar year (KNOWN law):** The New Zealand tax year is **1 April to
31 March**, not the calendar year. Residence status is tested over rolling 12-month periods,
so a single calendar year can contain both resident and non-resident portions ("part-year
residence"). The per-calendar-year table in section 6 is presented as the brief requests but
must be re-cut against the NZ tax year and actual rolling windows by the accountant.

### 3.1 Transitional residence (s HR 8) and the CW 27 exemption — relevance

The **transitional resident** rules (definition in **s HR 8**; exemption in **s CW 27**)
give a ~**48-month temporary exemption** from NZ tax on **most foreign-sourced income** to a
person who becomes NZ-resident **for the first time or after 10+ years' absence**. Foreign
**employment and personal-services income is expressly excluded** from the exemption.
(verified July 2026 —
https://www.legislation.govt.nz/act/public/2007/0097/latest/DLM1517674.html;
https://www.ird.govt.nz/roles/nz-tax-residents/exemption)

**INFERRED relevance to Theo:** On the facts as described (a New Zealander **leaving** NZ for
Thailand), the transitional-resident exemption is **most likely NOT engaged now** — it is a
rule for people **arriving** in New Zealand. It becomes relevant only if Theo **later returns**
to New Zealand after a 10-year absence, or if (ASSUMED) he had himself recently arrived in NZ
within a current 4-year window — neither of which is evidenced. Flag for the accountant, but
treat as low priority absent contrary facts.

---

## 4. Taxation of a non-resident on NZ-source income — s YD 4

If and when Theo is a **non-resident**, New Zealand taxes him **only on New Zealand-source
income**, defined by **s YD 4 of the Income Tax Act 2007**. The s YD 4 classes include, among
others: dividends from NZ companies; interest on money lent in NZ; income from NZ land and its
disposal; beneficiary income from NZ trusts; and — the source rule most relevant here —
income from **personal/contractual services to the extent the services are performed in New
Zealand** (s YD 4(4)/(3) apportionment), plus a residual "any other source in New Zealand"
category. (verified July 2026 —
https://www.legislation.govt.nz/act/public/2007/0097/latest/DLM1523142.html)

**INFERRED application (hypothetical):** Theo invoices **two Australian** companies. If he is
non-resident and performs **no services physically in New Zealand**, that services income is
**not NZ-source** and is **outside the NZ tax net** (it would be considered under Australian
and Thai law — Agents 1 and 3). New Zealand would still tax any genuinely NZ-source item he
retains (e.g. NZ bank interest, NZ dividends, NZ rental/land). Whether **any** work is done
while physically in New Zealand is an **open fact** (gap G-17) that could pull a slice of the
services income back into NZ source. Non-residents are taxed on NZ-source income regardless of
where paid or remitted. (verified July 2026 —
https://www.ird.govt.nz/international-tax/individuals/tax-for-non-resident-taxpayers)

---

## 5. Sole-trader status and GST on cessation — Goods and Services Tax Act 1985

**Sole-trader (income tax) status:** "Sole trader" is a legal/registration form, not a tax
residence concept. Ceasing NZ residence does not by itself dissolve the sole trader, but it
changes what is taxable (worldwide → NZ-source only) and may end the NZ "taxable activity" for
GST. (INFERRED)

**GST registration and deregistration (KNOWN law):**

- **Registration threshold:** NZ GST registration is required once taxable supplies exceed
  **NZD 60,000** in any 12-month period (voluntary registration is possible below that).
  (verified July 2026 — https://www.business.govt.nz/tax-and-money/guide-to-business-tax/gst)
- **Cessation / cancellation:** If a registered person **ceases to carry on all taxable
  activities** (and does not reasonably expect to carry on a taxable activity within the next
  12 months), they **must notify the Commissioner within 21 days** and registration is
  cancelled (GST Act 1985, **s 52**). (verified July 2026 —
  https://www.business.govt.nz/tax-and-money/guide-to-business-tax/gst)
- **Deemed supply on deregistration — s 5(3):** On ceasing to be registered, **goods and
  services then forming part of the assets** of the taxable activity are **deemed to be
  supplied** immediately before deregistration (i.e. GST is payable on retained business
  assets at market value). A modified rule, **s 5(3B)**, limits the deemed supply for
  **non-residents** to goods physically in NZ, and services that would be performed in NZ, at
  that time. (verified July 2026 —
  https://www.legislation.govt.nz/act/public/1985/0141/latest/dlm81877.html)

**INFERRED application (hypothetical):** If Theo's only "customers" are Australian companies
and he performs services from Thailand, his NZ **taxable activity** may have already ceased,
which could trigger a **s 52 cancellation obligation** and a **s 5(3) deemed supply** on any
NZ business assets retained at that date. Whether he was ever GST-registered, his turnover, and
what assets exist are all **unknown** (relates to gaps G-05, G-14/G-15). Zero-rating of
exported services and the non-resident rules may also apply and must be checked.

---

## 6. Provisional residency conclusion per calendar year (LAW-ONLY, HYPOTHETICAL)

The following states what the answer **would be** under the stated hypotheticals. **No cell is
a conclusion of fact** — each depends on evidence that is missing. NZ residence is actually
tested over the NZ tax year (1 Apr–31 Mar) and rolling 12-month windows; calendar years are
used only because the brief requests them.

| Calendar year | Provisional answer *under stated hypotheticals* | Label | Decisive missing evidence that would resolve it |
|---|---|---|---|
| **2024** | **Resident.** Assumed living in NZ all year with a home here → 183-day test met and PPOA present. | ASSUMED | Day-count table showing NZ presence >183 days (G-01/G-03); confirmation of NZ dwelling (G-07). |
| **2025** | **Resident for the pre-departure part; status for the balance is indeterminate.** If he departed ~May 2025, the 325-day absence window cannot close until ~Apr 2026, so he is likely still resident through 2025 **unless** PPOA was abandoned and 325 days later accrue (which would backdate cessation to ~May 2025). If a PPOA is retained, resident all year. | INFERRED (departure timing ASSUMED) | Exact departure date and full 2025–26 day counts (G-01/G-02/G-03); whether any NZ dwelling remained available as a home (G-07); ties (G-08/G-09). |
| **2026** | **Potentially non-resident from a backdated ~May 2025 date — but only if BOTH (a) 325+ days absent in a 12-month window are accrued AND (b) no PPOA remains.** Otherwise still resident. | INFERRED / ASSUMED | Confirmation the 325-day absence test is actually met on the day count (G-03); confirmation no PPOA (family home / stored effects / availability) survives (G-07); secondary ties (G-08 to G-10). |

**Pivotal point (INFERRED):** In every year the answer collapses onto **two** unknowns —
(1) the **day-count table** and (2) whether a **NZ permanent place of abode** persists. Van
Uden means that even a perfect 325-day absence does **not** end residence if a NZ home remains
available. These cannot be resolved on the current (empty) record.

---

## 7. KNOWN / INFERRED / ASSUMED summary

**KNOWN (law and record):**
- No client evidence exists; Phase 0 stop condition met (record: `00-intake-register.md`,
  `gaps.md`).
- s YD 1 contains the PPOA (overriding), 183-day (start) and 325-day (end) tests, with
  asymmetric part-day counting (s YD 1(8)).
- Residence/non-residence are backdated to the first day of the relevant 183/325-day window.
- NZ tax year is 1 April–31 March; non-residents are taxed only on NZ-source income (s YD 4).
- IS 25/16 (May 2025) is the current residence interpretation statement, replacing IS 16/03.
- GST threshold is NZD 60,000; cessation triggers s 52 cancellation (21-day notice) and a
  s 5(3) deemed supply on retained assets.

**INFERRED (reasoned from law, not from client evidence):**
- PPOA (Van Uden) is Theo's dominant NZ-residence risk: a retained/available NZ home could
  keep him NZ-resident despite living in Phuket.
- If non-resident and performing no services in NZ, his AU-invoiced services income is not
  NZ-source and falls outside NZ tax.
- The transitional-resident exemption (s HR 8 / CW 27) is probably not engaged for someone
  leaving NZ; relevant only on a future return.
- A cessation of NZ taxable activity may already have occurred, engaging GST s 52 / s 5(3).

**ASSUMED (no evidence — feeds adviser questions):**
- That Theo was NZ-resident before departure (2024 and early 2025).
- That he departed NZ around May 2025 and has since been mainly in Thailand.
- That his day counts might satisfy the 325-day absence test at some point from mid-2025 —
  entirely unverified.
- Whether he holds/held any NZ dwelling, NZ bank/KiwiSaver/other ties, or GST registration.

---

## 8. Open questions for the NZ accountant

1. **Day-count table (critical).** Obtain passport stamps and flight records and build a
   day-by-day NZ presence/absence table from 1 Jan 2024, applying s YD 1(8) part-day rules.
   Does absence ever exceed 325 days in any rolling 12-month window, and from what first day?
2. **Permanent place of abode (critical, Van Uden).** Does Theo own, lease, or have available
   to him **any** New Zealand dwelling used as a home — including a family home he can stay in,
   or a property where personal effects are stored? This can override the day counts entirely.
3. **Cessation date and part-year return.** On the day counts and PPOA finding, on exactly what
   date did NZ residence cease (if at all), and is a **part-year IR3** required for the year of
   cessation?
4. **NZ-source income retained (s YD 4).** Does Theo retain any NZ-source income (bank interest,
   dividends, rental/land, NZ trust distributions) that remains taxable in NZ as a non-resident?
5. **Services performed in NZ (s YD 4 apportionment).** Is **any** work for the Australian
   companies performed while physically in New Zealand? If so, a portion of that income is
   NZ-source even when he is non-resident (gap G-17).
6. **GST status.** Was Theo ever GST-registered? If so, has the NZ taxable activity ceased, is
   a **s 52** cancellation overdue (21-day rule), and does a **s 5(3)** deemed supply arise on
   any retained NZ business assets?
7. **Transitional residence.** Confirm Theo is not within a current transitional-resident
   window (s HR 8) and flag the s CW 27 exemption for any **future** return to New Zealand.
8. **Prior filings and IRD view.** Obtain the last IR3 filed and any IRD residency
   correspondence/IR886; has IRD already formed a residence view?
9. **Currency check.** Confirm all analysis is run against **IS 25/16** (not the withdrawn
   IS 16/03) and the latest s YD 1 / YD 4 text as at the filing date.

---

## 9. Sources (all verified July 2026)

- Income Tax Act 2007, s YD 1 (Residence of natural persons) —
  https://legislation.govt.nz/act/public/2007/0097/latest/DLM1523134.html
- Income Tax Act 2007, s YD 4 (Classes of income treated as having NZ source) —
  https://www.legislation.govt.nz/act/public/2007/0097/latest/DLM1523142.html
- Income Tax Act 2007, s HR 8 (Transitional residents) —
  https://www.legislation.govt.nz/act/public/2007/0097/latest/DLM1517674.html
- Goods and Services Tax Act 1985, s 5 (incl. s 5(3), s 5(3B) deemed supply) —
  https://www.legislation.govt.nz/act/public/1985/0141/latest/dlm81877.html
- IRD Interpretation Statement IS 25/16 "Tax residence" (May 2025; replaces IS 16/03) —
  https://www.taxtechnical.ird.govt.nz/interpretation-statements/2025/is-25-16
  (current-statement landing page) and PDF
  https://www.taxtechnical.ird.govt.nz/-/media/project/ir/tt/pdfs/interpretation-statements/2025/is-25-16.pdf
- IRD — Tax residency status for individuals (183/325-day guidance) —
  https://www.ird.govt.nz/international-tax/individuals/tax-residency-status-for-individuals
- IRD — Tax for non-resident taxpayers (NZ-source-only basis) —
  https://www.ird.govt.nz/international-tax/individuals/tax-for-non-resident-taxpayers
- IRD — Temporary tax exemption for transitional residents (s CW 27) —
  https://www.ird.govt.nz/roles/nz-tax-residents/exemption
- CIR v Diamond [2015] NZCA 613 — IRD case summary —
  https://www.taxtechnical.ird.govt.nz/case-summaries/2015/residency-interpretation-of-permanent-place-of-abode
- Van Uden v CIR [2018] NZCA 487; leave dismissed [2019] NZSC 29 —
  https://www.taxtechnical.ird.govt.nz/en/case-summaries/2019/supreme-court-dismisses-application-for-leave-to-appeal;
  https://www.courtsofnz.govt.nz/assets/cases/2019/2019-NZSC-29.pdf
- business.govt.nz — GST (NZD 60,000 threshold; cancellation on cessation) —
  https://www.business.govt.nz/tax-and-money/guide-to-business-tax/gst

**Tool note:** On 10 July 2026 direct machine-fetch of legislation.govt.nz and
taxtechnical.ird.govt.nz returned HTTP 403 to the research tool; propositions were verified via
July 2026 web-search indexing of those primary pages and corroborating professional sources.
The accountant should open each URL directly to confirm exact wording and current status
before filing.
