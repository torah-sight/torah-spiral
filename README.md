# Torah Spiral · ספירלת התורה · Спираль Торы

**Languages:** **English** · [Русский](README.ru.md) · [עברית](README.he.md)

[![CI](https://github.com/torah-sight/torah-spiral/actions/workflows/ci.yml/badge.svg)](https://github.com/torah-sight/torah-spiral/actions/workflows/ci.yml)
[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)

**Site:** https://torah-sight.github.io/torah-spiral/en/ · the interface is in Hebrew ([/he/](https://torah-sight.github.io/torah-spiral/he/)), Russian ([/ru/](https://torah-sight.github.io/torah-spiral/ru/)) and
English ([/en/](https://torah-sight.github.io/torah-spiral/en/)); a language link opens the site in that language.

A static single-page app for learning the Torah as a spiral, like a times table: a 6 × 9 table (or five
book columns) of the 54 weekly portions, opened floor by floor — titles, key names, key phrases, a very
short storyline. The capacity of every floor is proportional to the portion's density: its word count
**after collapsing repeats** (verbatim repeats such as the twelve princes' offerings, and retellings
such as Eliezer's story or Vayakhel–Pekudei).

Built with [React Carburetor](https://github.com/PHPCraftdream/ReactCarburetor) 0.2.0, Rsbuild (Rspack),
TypeScript (tsgo) and Tailwind CSS. The build output is one self-contained `dist/index.html` and its
copies for the language links (`dist/he/`, `dist/ru/`, `dist/en/`).

## Features

- **Portions overview** — a 6 × 9 table or five book columns, opened floor by floor.
- **Portion statistics** — portions ranked by the non-erasable Divine Names, by the mitzvot (Sefer
  HaChinuch: all, positive, negative) and by verses, words or letters.
- **Game** — find a portion's place (by name, between, before, after) or recognise it by its story and
  unique phrases; choose books, keep or hide guessed cells, play against the clock.
- Gematria of every portion name.
- Light and dark theme, right-to-left layout for Hebrew, works offline as a single file.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Single-file build into `dist/index.html` plus the language copies |
| `npm run lint` | oxlint (all React Carburetor rules), `carburetor-lint`, ≤ 500 lines per file, ≤ 7 entries per folder |
| `npm run typecheck` | `tsgo --noEmit` |
| `npm test` | Unit tests (rstest) |
| `npm run names` | Count the non-erasable Divine Names per portion into `src/content/generated/names.json` (vocalized MAM text from Sefaria, cached in `.cache/`) |
| `npm run density` | Recompute `src/content/generated/density.json` from the Hebrew text (Sefaria, cached in `.cache/`) |
| `npm run content:check` | Verify every Hebrew name and phrase against the text of its portion |
| `npm run docs` | Generate the documents in English, Russian and Hebrew from `root-docs/` ([polydoc](https://github.com/ktav-lang/polydoc)) |
| `npm run docs:check` | Verify that the generated documents match `root-docs/` |

## Density, Names and mitzvot

`src/domain/density` collapses repeats in three layers: verbatim 5-word shingles across the whole Torah,
a strict general paraphrase search (IDF-weighted overlap with a 3-verse window), and a curated list of
known retellings (`known/knownRepeats.ts`) checked only against their source. Floor capacity is
`rate × effective / mean effective`, at least 1.

Text: Sefaria, “Tanach with Text Only” (public domain). It is used only at build time.

Divine Names: only the non-erasable (sacred) occurrences are counted, per Masechet Soferim 4. The
vocalized text “Miqra according to the Masorah” (Sefaria, CC BY-SA, from Hebrew Wikisource) tells אֲדֹנָי
from אֲדֹנִי and אֵל from אֶל; profane occurrences with the same spelling (other gods, judges, Beth-El,
“these”) are listed with their reasons in `src/content/tallies/nameFixes.ts`. Only the counts are stored.

Mitzvot: per portion from Sefer HaChinuch's own portion headings (`src/content/tallies/mitzvot.ts`),
checked against Sefaria's per-portion map: 248 positive and 365 negative, 613 in all.

## Contributing

Issues and pull requests are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) and the
[Code of Conduct](CODE_OF_CONDUCT.md). Content errors have their own issue template. Security problems:
[SECURITY.md](SECURITY.md).

## License

GPL-3.0-only. See [LICENSE](LICENSE). The Torah texts from Sefaria are not redistributed here: only
counts derived from them.
