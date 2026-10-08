#!/usr/bin/env bash
# Shell twin of build-manifest.mjs, byte-for-byte identical output.
# Exists because node is not always installed locally; CI uses the .mjs version.
#   bash i18n/build-manifest.sh
set -euo pipefail
cd "$(dirname "$0")/.."

list() {   # emit a JSON array of two-digit section numbers, one arg = glob dir
  local dir="$1" pat="$2" first=1 f n
  printf '['
  for f in $dir/$pat; do
    [ -e "$f" ] || continue
    n=$(basename "$f"); n=${n:0:2}
    [ $first -eq 1 ] || printf ','
    printf '\n    "%s"' "$n"; first=0
  done
  [ $first -eq 1 ] && printf ']' || printf '\n  ]'
}

{
  printf '{\n  "zh": '
  list book '[0-9][0-9]-*.md'
  printf ',\n  "sections": {'
  first=1
  for f in book/[0-9][0-9]-*.md; do
    n=$(basename "$f"); n=${n:0:2}
    [ $first -eq 1 ] || printf ','
    printf '\n    "%s": "%s"' "$n" "$f"; first=0
  done
  printf '\n  },\n  "en": '
  list i18n/en/book '[0-9][0-9].md'
  printf ',\n  "vi": '
  list i18n/vi/book '[0-9][0-9].md'
  printf '\n}\n'
} > i18n/manifest.json

printf 'manifest.json written: zh %s · en %s · vi %s\n' \
  "$(ls book/[0-9][0-9]-*.md 2>/dev/null | wc -l)" \
  "$(ls i18n/en/book/[0-9][0-9].md 2>/dev/null | wc -l)" \
  "$(ls i18n/vi/book/[0-9][0-9].md 2>/dev/null | wc -l)"
