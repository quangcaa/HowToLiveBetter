# Translation contract / Quy ước dịch

This file is the contract every translator — human or agent — follows when producing
`i18n/en/book/NN.md` or `i18n/vi/book/NN.md` from `book/NN-*.md`.

Read it in full before translating anything. The rules below are not style preferences.
They are what keeps the translation auditable against the Chinese original.

---

## 0. What this book is, and why translation is risky here

Every entry in this book earns its place by being checkable: a number you can find in a
named paper, or an article number you can look up in a named Chinese statute. The prose
is disposable. **The numbers and the citations are the product.**

That changes what a good translation is. Fluency matters less than fidelity. A beautiful
English sentence that rounds `HR 0.87` to "about 15% lower" has destroyed the entry. A
clumsy sentence that carries `0.87` and `13%` through intact has not.

Two failure modes to watch for in yourself:

- **Helpful drift.** Adding a clarifying fact, a mechanism, a symptom, a caveat that the
  original did not state. The original's silence is often deliberate — the author checked
  and found no source. Do not fill gaps.
- **Localisation reflex.** This book is about living in mainland China. Do not convert
  currency, do not swap in Vietnamese or US law, do not replace hotline numbers, do not
  "adapt for a local audience". A Vietnamese reader of §7.2 needs to know what Chinese
  labour inspection does, not what Vietnamese labour inspection does.

---

## 1. Numbers are sacred

Copy every one of these through **unchanged**, digit for digit:

- effect sizes and their original notation — `HR 0.87`, `RR 0.88`, `OR 0.31`, `SMD -0.53`, `d 0.33`, `g 1.12`, `SMR 15`
- confidence intervals — `95% CI 0.50 to 0.68` (translate the words `可信范围` around it, never the bounds)
- percentages, sample sizes, counts, years, durations, ages, money amounts
- article numbers, document numbers, decree numbers — `第二十七条`, `国令第 812 号`, `法释〔2014〕9 号`, `GB 7718-2025`
- hotline and emergency numbers — `120`, `119`, `110`, `12356`, `12378`, `12320`, `12308`

Specifically forbidden:

- recomputing anything, including "simplifying" `0.87` to `13%` when the original gave both
- rounding, or changing significant figures
- converting 元 to USD, EUR or VND, or adding a converted figure in brackets
- changing number formatting in a way that alters the value
- translating a number into words, or words into a number

The original writes six-figure amounts as `约 113 万元（精确值 1130040 元）` — keep both the
magnitude and the exact value, in the same shape: `about 1.13 million yuan (exactly 1130040 yuan)`.
Note the original deliberately uses **no thousands separators**; keep it that way.

If the original says `待核实` or `TODO`, translate it as `to be verified` / `cần xác minh`
and leave it marked. Do not quietly resolve it.

---

## 2. Citations in the source line are never translated

The **citations** on the `- 来源：` / `- Sources:` / `- Nguồn:` line are copied **character for
character from the original**. Not one character of a citation changes.

That means: journal titles, author names, years, DOIs, URLs, Chinese statute names, decree
numbers, article numbers, and any text quoted inside `「」` all stay exactly as they are.

This is not laziness. It is the only way a reader in any language can check the claim
against the same string the author checked, and the only way a future maintainer can diff
the translation against an updated original. The main book's own rules carve this column
out of its plain-language requirement for the same reason.

Do **not** add a bracketed English or Vietnamese gloss of the law's name here. If a reader
needs to know which law it is, the benefit column already says so in their language.

### The carve-out: non-citation prose on that same line does get translated

About 49 of the 650 source lines are not pure citation. They carry remarks and pointers
mixed in, usually on C-grade entries:

- `作者经验` · `无直接文献` · `无官方文件` · `步骤顺序是作者经验`
- cross-references — `维权路径见第 7 节`, `补办身份证见第 7 节，冒名贷款见第 8 节关于征信的一条`

Leaving those in Chinese strands the reader: on a C-grade entry the whole source field
becomes unreadable, and a cross-reference sitting there can never be linked. So translate
them, and convert any cross-reference inside them to `§N.M` with anchor words exactly as in
section 4.

**The test — would a reader use this string to look something up?**

| On the source line | What to do |
| --- | --- |
| Author, title, year, journal, DOI, URL | Verbatim |
| Statute name, decree number, article number, `「」` quoted text | Verbatim |
| `作者经验`, `无直接文献`, `无官方文件` | Translate: `author's experience, no direct literature` / `kinh nghiệm của tác giả, không có tài liệu trực tiếp` |
| A cross-reference to another entry | Translate and convert to `§N.M (anchor words)` |
| Any other remark by the author | Translate |

Keep the original's `；` separators and the original order, so the line still lines up with
the Chinese one when the two are read side by side.

---

## 3. Field labels

Exactly these, including punctuation and capitalisation. The reader page parses on them.

| Original | English | Vietnamese |
| --- | --- | --- |
| `- 成本：` | `- Cost:` | `- Chi phí:` |
| `- 说人话：` | `- In plain words:` | `- Nói đơn giản:` |
| `- 收益：` | `- Benefit:` | `- Lợi ích:` |
| `- 证据等级：` | `- Evidence:` | `- Mức bằng chứng:` |
| `- 来源：` | `- Sources:` | `- Nguồn:` |
| `- 备注：` | `- Notes:` | `- Ghi chú:` |

Keep the order. Keep every field the original has; add none it does not have.

### The cost-tag comment is copied verbatim

```
<!-- 成本标签: 钱=0 时间=少 毅力=否 收益=大 口径=死亡率 -->
```

Leave this line **exactly as it is, in Chinese**, in all languages. It is machine-readable
only; the reader page translates the values for display. Keeping it byte-identical across
the three languages is what guarantees the filters agree, and makes an upstream change to
a tag show up instantly in a diff.

### The evidence grade line

Keep the letter. Translate only a parenthesised `争议`:

- `- 证据等级：A` → `- Evidence: A` / `- Mức bằng chứng: A`
- `- 证据等级：A（争议）` → `- Evidence: A (disputed)` / `- Mức bằng chứng: A (có tranh cãi)`

### A note that starts with 争议

The original counts disputed entries by testing whether the notes line *starts with* `争议`.
Preserve that position:

- `- 备注：争议。...` → `- Notes: Disputed. ...` / `- Ghi chú: Có tranh cãi. ...`

---

## 4. Cross-references become section notation

The original refers to entries by position — `见第 8 节第 17 条（借条和担保）`. Position-based
references break when entries are inserted, which is why the original requires an anchor
word in brackets. Translations use a locale-neutral form that the reader page can turn into
a working link:

| Original | Translation |
| --- | --- |
| `见第 8 节第 17 条（借条和担保）` | `see §8.17 (IOUs and guarantees)` / `xem §8.17 (giấy nợ và bảo lãnh)` |
| `见第 11 条（医疗救助）` — within the same section, say section 7 | `see §7.11 (medical assistance)` / `xem §7.11 (trợ giúp y tế)` |
| `见第 13 节` | `see section 13` / `xem chương 13` |
| `见第 8 节第 11 到 14 条` | `see §8.11–8.14` / `xem §8.11–8.14` |

Three rules:

1. **Always write the section number**, even for a reference inside the same section. The
   original can say "entry 11" because the reader knows which section they are in; `§7.11`
   is unambiguous and linkable.
2. **Always keep the anchor words** in brackets, translated. They are what lets a reader —
   and a reviewer — tell whether the reference points where it claims to.
3. **Never invent a reference, and never drop one.** If you cannot tell what section a bare
   `第 11 条` belongs to, it is the section you are translating.

An article number of a statute is **not** a cross-reference. `《城镇燃气管理条例》第二十七条`
stays as a statute citation — translate the law's name, keep the article number. Only
references to *this book's own entries* become `§N.M`.

---

## 5. How the prose should read

The original has a hard, deliberate plain-language standard, written for an adult with no
professional training, and explicitly for readers who read slowly — older readers and
readers with disabilities. Carry it over rather than writing around it.

- **One idea per sentence.** Target around 20 words, 30 at the outside. The original brought
  its average Chinese sentence from 66 characters down to 29 on purpose. Do not re-merge
  them into long subordinate stacks.
- **Explicit subject in every sentence** — you, the doctor, the police, the company, the
  court. Avoid passive voice where an actor exists.
- **Every sentence readable on its own.** A sentence that only makes sense if you remember
  the previous one has to be rewritten. A cross-reference is a pointer to more detail, never
  the thing that completes the sentence's meaning.
- **Explain a technical term in a few words the first time, and keep the term.** "excipients,
  the filler and coating around the active ingredient". Once per entry, not every time.
- **Research jargon becomes an action or a plain description.** "an observational cohort"
  becomes "researchers only tracked people, with no control group".
- **Legal language lands on consequence and action** — what happens to you, what to do.
- No exclamation marks. No second-person scolding. No motivational closers.

### Things the original bans, and why you will be tempted anyway

The original keeps a list of patterns it has actually had to strip out. They reappear in
translation unless you watch for them:

- **Meta-narration** about the entry — "this entry only covers one thing", "this is not
  about whether you should go".
- **Uplift at the end of a paragraph** — "from the moment you sign up, there is no going back".
- **Metaphors the reader has to decode** — "the other side of it", "the output", "a shield".
- **Telegraph style** — a list chopped into a string of five-word sentences, each with a full
  stop. Where two short clauses have a cause or contrast relation, join them with because /
  so / but.
- **Empty intensifiers** — "it is worth noting that", "essentially", "fundamentally".

But do not over-correct. The original learned this the hard way and had to restore 23
sentences it had wrongly cut:

> **Negation, scope, conditions, stance and judgements of what matters more are content,
> not packaging.**

"This does not mean everyone should leave night-shift work" is a limit on the claim. Keep
the limit; drop only genuine self-reference. When in doubt, keep the sentence.

### The "in plain words" line is the one readers actually read

It is the most visible line on the card and often the only one read. It has its own limits:

- 2 to 4 sentences, under about 120 words.
- Direction and magnitude only. `HR`, `RR`, `OR`, `CI`, "cohort", "meta-analysis", sample
  sizes, study design and group assignment are all forbidden here — they live in the benefit
  column.
- **No number that is not already in the same entry's benefit, cost or title.** This line
  translates; it does not add.
- **No fact, symptom or mechanism** that the benefit column does not state.
- **It has to stand alone.** Never quote a claim the reader has not seen and then judge it —
  "'X' is not made up" is banned. Either state the claim and its source in this same line,
  or write it as a plain positive statement.
- For money and freedom entries, the same thing in those terms: how much you can get back,
  what you will be on the hook for.

---

## 6. Add nothing, drop nothing

- No new facts, numbers, symptoms, mechanisms, or recommendations.
- No dropped conditions. The notes column carries the applicable population, the exceptions,
  the disputes and the counter-evidence. All of it survives.
- No softened or strengthened claims. `多数` is "most", not "all". `可能` is "may", not "will".
  `不主张` is "does not argue for", not "forbids".
- If a sentence is genuinely ambiguous in the original, translate it to the same ambiguity
  rather than resolving it.
- Do not reorder entries, renumber them, merge them, or split them.

---

## 7. File shape

Output file: `i18n/en/book/NN.md` or `i18n/vi/book/NN.md`, where `NN` is the two-digit
section number from the original filename. Nothing else in the name.

```markdown
[← Back to contents](../../index.html)

# 4. Do not waste time

<section intro — every paragraph the original has before its first ### entry>

### 1. <translated title, starts with a verb>
<!-- 成本标签: 钱=0 时间=少 毅力=否 收益=大 口径=时间 -->
- Cost: ...
- In plain words: ...
- Benefit: ...
- Evidence: A
- Sources: <verbatim from original>
- Notes: ...

### 2. ...
```

Vietnamese first line: `[← Về mục lục](../../index.html)`, and `# 4. Không để mất thời gian`.

Rules for the shape:

- Keep `# N. Title` on the third line, with the same section number. The reader page parses it.
- Translate the section intro fully — every paragraph before the first entry, not just the first.
- Entry numbering matches the original exactly: same count, same order, same numbers.
- Entry titles start with a verb, like the original. **Only ever add words to clarify, never
  drop a word** — the original warns that dropping a word from a title can break the anchor
  matching that other entries' cross-references depend on.
- Blank line between entries. No trailing whitespace.

---

## 8. Self-check before you report back

Mechanical, in order:

1. `grep -c '^### ' i18n/en/book/NN.md` equals `grep -c '^### ' book/NN-*.md`.
2. `grep -c '成本标签' ` matches too, and every tag line is byte-identical to the original's.
   Diff them if unsure.
3. Every citation on a `- Sources:` line is character-identical to the original's — same
   authors, titles, years, DOIs, URLs, statute names, decree and article numbers, `「」` text,
   in the same order with the same `；` separators. Only the non-citation remarks and
   cross-references described in section 2 are translated. A line with no citation at all
   (`作者经验，无直接文献`) is fully translated.
4. Every number in the original entry appears in the translated entry. Read the benefit
   column of a few entries side by side and check digit by digit.
5. No `HR`, `RR`, `OR`, `CI`, sample size or study design in any `- In plain words:` line.
6. Every `§N.M` reference carries bracketed anchor words, and `N` is a real section number.
7. Entries whose original notes start with `争议` now start with `Disputed.` / `Có tranh cãi.`

Then report: the file you wrote, the entry count, anything you could not translate
confidently, and any place where you suspect the original itself is wrong or unclear.
Flagging a problem and leaving it flagged counts as finishing. Guessing does not.

---

## 9. Hard limits while translating

- Do not modify anything outside your own output file. Not `book/`, not `README.md`, not
  `index.html`, not `CLAUDE.md`, not `tools/`, not another language's files.
- Do not run any command that changes git state.
- Do not run `tools/sync-stats.mjs`, and do not run `tools/check-refs.mjs` without `--check`
  — both rewrite tracked files. `--suspect` rewrites them too.
- Do not use Python or `sed` to batch-edit prose. Write the file.
- Do not send any part of the text to an external service, including translation APIs.
- You do not need the web. Everything you need is in the repository.
