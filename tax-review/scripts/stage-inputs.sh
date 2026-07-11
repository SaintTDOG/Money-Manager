#!/usr/bin/env bash
# Stage Theo's local evidence files into tax-review/inputs/ for a LOCAL Claude Code run.
#
# Run this on Theo's own machine (native filesystem — no sandbox mount lock), from the
# root of the Money-Manager repo, on branch claude/new-session-va1nd1:
#
#     bash tax-review/scripts/stage-inputs.sh
#
# It copies (a) the already-staged files from the local "Tax residency working folder"
# and (b) the "copy blocked" originals, into the repo's tax-review/inputs/.
# Missing files are reported, not fatal. Nothing is overwritten silently — existing
# non-empty files are skipped unless you pass --force.

set -uo pipefail

FORCE=0
[[ "${1:-}" == "--force" ]] && FORCE=1

# Local source locations (from the 11 Jul 2026 scan register)
STAGE="$HOME/Desktop/Accounts/Tax residency working folder/inputs"
DESK="$HOME/Desktop"

# Destination = repo inputs folder (this script lives in tax-review/scripts/)
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DEST="$REPO_ROOT/tax-review/inputs"
mkdir -p "$DEST"

copied=0; skipped=0; missing=0

cpsafe() {
  local src="$1" dst="$2"
  if [[ ! -e "$src" ]]; then
    echo "  MISSING : $src"; ((missing++)); return
  fi
  if [[ -s "$dst" && $FORCE -eq 0 ]]; then
    echo "  skip    : $(basename "$dst") (exists; use --force to overwrite)"; ((skipped++)); return
  fi
  cp "$src" "$dst" && { echo "  staged  : $(basename "$dst")"; ((copied++)); }
}

echo "== A. Already-staged files (from local working folder) =="
if [[ -d "$STAGE" ]]; then
  shopt -s nullglob
  for f in "$STAGE"/*; do
    base="$(basename "$f")"
    if [[ -s "$DEST/$base" && $FORCE -eq 0 ]]; then
      echo "  skip    : $base (exists)"; ((skipped++))
    else
      cp "$f" "$DEST/$base" && { echo "  staged  : $base"; ((copied++)); }
    fi
  done
  shopt -u nullglob
else
  echo "  (no local working folder at: $STAGE)"
fi

echo "== B. Copy-blocked originals (staged with correct names) =="
cpsafe "$DESK/Invoices Theo /HOA-INV004.pdf"                                   "$DEST/2024-05-27_invoice_theo-to-homeowner-assist_HOA-INV004.pdf"
cpsafe "$DESK/Invoices Theo /Super property Invoice Number_ INV-1.pdf"         "$DEST/2024-05-27_invoice_superproperty_INV-1.pdf"
cpsafe "$DESK/StreamlineStatement18Sep230123126001303810000MRTSHOLMES.PDF"    "$DEST/2023-09-18_asb-streamline-statement_TSHOLMES.pdf"
cpsafe "$DESK/StreamlineStatement18Mar250123126001303810000MRTSHOLMES.PDF"    "$DEST/2025-03-18_asb-streamline-statement_TSHOLMES.pdf"
cpsafe "$DESK/asb 2023-2024.xlsx"                                             "$DEST/2023-2024_asb-annual-transactions_TSHOLMES.xlsx"
cpsafe "$DESK/Downloads/IRD FORM.pdf"                                         "$DEST/ird-form_theo-holmes.pdf"
cpsafe "$DESK/T&H Collective Docs/T&H Collective Summary.pdf"                 "$DEST/t-and-h-collective_summary.pdf"
cpsafe "$DESK/Studylink/StudyLinkStudentAllowanceFILLED10032026.pdf"          "$DEST/2026-03-10_nz-tie_studylink-student-allowance_theo.pdf"

echo
echo "== Summary =="
echo "  staged : $copied"
echo "  skipped: $skipped"
echo "  missing: $missing"
echo
echo "Now list what landed:"
ls -la "$DEST"
echo
echo "STILL TO SOURCE (not on this machine): passport STAMP pages (bio-page only found),"
echo "Revolut statement/CSV, T&H invoices + any FY2025-26 invoices, Sivana lease, DTV grant"
echo "letter, Thai bank/TIN, and confirmation of the NZ family home (item 7)."
