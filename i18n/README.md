# Translations — English and Tiếng Việt

Unofficial English and Vietnamese translations of 《高性价比人生指南》, with a reader page
that switches between the two and the Chinese original.

**Open `index.html` over http** (not by double-clicking the file):

```bash
python3 -m http.server 8000
```

then go to `http://localhost:8000/i18n/`.

---

## The Chinese original is the authoritative version

Everything in `../book/` is the source of truth. These translations are derived from it and
may lag behind it. Three consequences, all of them deliberate:

1. **Nothing here edits the original.** No file in `../book/`, `../README.md`, `../index.html`,
   `../CLAUDE.md` or `../tools/` is touched by anything in this directory. The project's own
   rules say translations are not merged into the main text, because an author who cannot read
   the language cannot review or maintain it. This directory keeps that line: it sits beside
   the book and reads it, rather than becoming part of it.
2. **The reader page always offers the original.** Every translated entry has a *Show Chinese
   original* control that pulls the Chinese text for that entry up underneath it.
3. **Nothing is localised.** Every law, benefit scheme, hotline and amount in this book is
   **mainland China**. Currency is not converted. Hotline numbers are not replaced. No
   Vietnamese or US legal concept has been substituted for a Chinese one. A reader is being
   told how a thing works in China, not how the nearest equivalent works at home.

---

## What is translated so far

`manifest.json` is the machine-readable answer, and the reader page shows a progress bar.
Regenerate it whenever you add or remove a section file:

```bash
node i18n/build-manifest.mjs      # or: bash i18n/build-manifest.sh, if node is not installed
```

Sections with no translation yet are hidden by default in English and Vietnamese. Tick
*Include untranslated sections* in the filter panel to read them in Chinese alongside the
translated ones.

---

## Layout

```
i18n/
  index.html              reader page: ZH / EN / VI toggle, search, filters
  manifest.json           which sections exist in which language (generated)
  build-manifest.mjs      regenerates the manifest (node)
  build-manifest.sh       same output, for machines without node
  TRANSLATION-GUIDE.md    the contract every translator follows
  en/book/NN.md           English, one file per section, numbered as in book/
  vi/book/NN.md           Vietnamese, same
```

Section files are named by number only (`04.md`), not by title, so that a section mapping is
a two-digit lookup in any language.

---

## Translating a section

Read [TRANSLATION-GUIDE.md](TRANSLATION-GUIDE.md) first — all of it. It is short, and it is
the difference between a translation that can be checked against the original and one that
cannot. The things it will not let you do are the things that look most helpful:

- Numbers, effect sizes, confidence intervals, article numbers and document numbers are
  copied through unchanged. No rounding, no recomputing, no currency conversion.
- Citations on the source line stay in the original characters, so a reader in any language
  can check the same string the author checked. Non-citation remarks on that line do get
  translated — see section 2 of the guide for where the line falls.
- The `<!-- 成本标签: ... -->` comment stays in Chinese in every language. The reader page
  translates it for display. Keeping it byte-identical is what stops the three languages
  disagreeing about the same entry.
- Nothing is added and nothing is dropped, including the conditions, exceptions and
  counter-evidence in the notes column.

Then check your work against section 8 of the guide before you call it done.

---

## Known gaps

- The long-form essays in `../docs/` are not translated.
- The README, the glossary of statistical terms and the section index are not translated;
  the reader page carries its own interface strings instead.
- Cross-references to sections that are not yet translated resolve to the Chinese entry.

---

## Reporting a translation problem

A mistranslated number or a flipped legal negation is the serious kind of bug here. If you
find one, say which file, which entry (`§15.2`), what it says, and what the Chinese says.

Problems with the underlying claim — a wrong figure, a superseded regulation, a dead link —
belong upstream in the main repository, not here. Translations follow the original; fixing
the original fixes every language at once.

---

## Licence

The book's text is published under [CC BY 4.0](../LICENSE), which covers these translations
too. Attribute 《高性价比人生指南》 and <https://github.com/eternity4719/HowToLiveBetter>, link
the licence, and state that the text was changed — a translation is a change. Saying which
date you translated from helps, because the laws and subsidy figures in this book move.

`index.html` and the two build scripts here are [MIT](../LICENSE-CODE), like the rest of the
repository's code.
