# Running the tax review locally (route 2)

This session was run in a **remote container** that cannot see Theo's `~/Desktop` files, so
the quantitative phases (day counts, remittance tax, income schedule) could not be run on real
data. To finish the analysis on the actual files, run Claude Code **on Theo's own machine**
against this same branch.

## 1. Get the repo and this branch locally

```bash
# if not already cloned:
git clone https://github.com/SaintTDOG/Money-Manager.git
cd Money-Manager
git fetch origin claude/new-session-va1nd1
git checkout claude/new-session-va1nd1
```

You now have all the law memos and synthesis (`tax-review/outputs/00`–`09`, `gaps.md`) plus
the staging script.

## 2. Stage the real evidence into tax-review/inputs/

```bash
bash tax-review/scripts/stage-inputs.sh        # add --force to overwrite existing
```

This copies the already-staged files and the "copy-blocked" originals into
`tax-review/inputs/` with the correct `YYYY-MM-DD_source_description` names, and prints what
landed and what is still missing. Review the list.

## 3. Re-run Phases 1–4 on the real files

Open Claude Code in the repo root and paste this prompt:

> You are resuming the cross-border tax review for Theo Holmes. The law memos
> `tax-review/outputs/02`–`05`, the scenario framework `06`, the red-team `07`, and the
> synthesis `08`/`09` already exist on this branch and are current as at 10 July 2026 — reuse
> them, do not re-research the law unless a fact forces a change.
>
> `tax-review/inputs/` now contains real evidence. Do this, obeying the original operating
> rules (cite every legal claim with a verification date; label KNOWN/INFERRED/ASSUMED; never
> fabricate a figure; only touch `tax-review/`; Australian English; no emojis):
>
> 1. Read every file in `tax-review/inputs/`. Rebuild `01-facts-and-flows.md` and
>    `01-remittances.csv` from the ACTUAL data:
>    - Day-count table from passport stamps + flight itineraries (part-days = full days for
>      Thailand). If stamp pages are still absent, say so and leave day counts as an open gap —
>      do not infer residency without them.
>    - Income schedule from the HA invoices (and any T&H invoices), dated and characterised.
>    - Remittance map: only money genuinely brought INTO Thailand (Wise transfers to Thai
>      accounts, ATM withdrawals in Thailand, THB card spend). Do NOT count receipts into the
>      ASB/Australian accounts as Thai remittances (see red-team RT-04). Trace each remittance
>      to post-2024 income vs the pre-2024 Por 162 pool.
>    - Pre-2024 pool: fix the 31 Dec 2023 balances from the ASB statement (and any other
>      account); flag accounts with no 31 Dec 2023 evidence.
> 2. Update the residency conclusions in `02` (NZ) and `03` (Thai) from the real day counts,
>    and re-confirm the NZ permanent-place-of-abode / family-home question (item 7) from the
>    ASB family-account signals.
> 3. Re-run `06-scenarios.md` on the real numbers (replace the illustrative figures), keep the
>    comparison table and the unenacted-decree sensitivity note, and update the revision log.
> 4. Refresh `08-position-paper.md` and `09-adviser-handover.md` to reflect the real position,
>    and print the terminal summary (headline numbers per scenario, top 3 risks, top 3 gaps).
>
> Anything still missing after staging (passport stamp pages, Revolut, T&H invoices, Thai
> lease/DTV/TIN) stays an explicit gap and a numbered adviser question — do not paper over it.

## 4. Commit and push

```bash
git add tax-review/
git commit -m "Re-run tax review on real evidence (local session)"
git push origin claude/new-session-va1nd1
```

## Still to source (not on the machine)
Passport **stamp pages** (bio-page only found) or an official border-movement record;
**Revolut** statement/CSV; **T&H invoices** and any FY2025–26 invoices; **Sivana Place lease**;
**DTV grant letter**; **Thai bank statements / TIN**; and confirmation of the **NZ family
home** (item 7). These remain the highest-value gaps.

## Privacy note
`tax-review/inputs/` will hold passport, bank and tax documents. If you do not want that in
git history, keep `inputs/` untracked: add `tax-review/inputs/` to `.gitignore` before
committing, and hand the advisers the outputs (`00`–`09`) rather than the raw inputs.
