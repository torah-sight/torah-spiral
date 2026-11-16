# Torah Spiral · ספירלת התורה · Спираль Торы

[![CI](https://github.com/torah-sight/torah-spiral/actions/workflows/ci.yml/badge.svg)](https://github.com/torah-sight/torah-spiral/actions/workflows/ci.yml)
[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)

**Site:** https://torah-sight.github.io/torah-spiral/ · Interface: Hebrew, Russian, English.

A static single-page app for learning the Torah as a spiral, like a times table: a 6 × 9 table (or five
book columns) of the 54 weekly portions, opened floor by floor — titles, key names, keywords, key
phrases, a very short storyline. The capacity of every floor is proportional to the portion's density:
its word count **after collapsing repeats** (verbatim repeats such as the twelve princes' offerings, and
retellings such as Eliezer's story or Vayakhel–Pekudei).

Built with [React Carburetor](https://github.com/PHPCraftdream/ReactCarburetor) 0.2.0, Rsbuild (Rspack),
TypeScript (tsgo) and Tailwind CSS. The build output is one self-contained `dist/index.html`.

## Features

- **Portions overview** — a 6 × 9 table or five book columns, opened floor by floor.
- **Portion sizes** — tables ranked by verses, words or letters.
- **Game** — find a portion's place (by name, between, before, after) or recognise it by its story and
  unique phrases; choose books, keep or hide guessed cells, play against the clock.
- Light and dark theme, right-to-left layout for Hebrew, works offline as a single file.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Single-file build into `dist/index.html` |
| `npm run lint` | oxlint (all React Carburetor rules), `carburetor-lint`, ≤ 500 lines per file, ≤ 7 entries per folder |
| `npm run typecheck` | `tsgo --noEmit` |
| `npm test` | Unit tests (rstest) |
| `npm run density` | Recompute `src/content/density.json` from the Hebrew text (Sefaria, cached in `.cache/`) |
| `npm run content:check` | Verify every Hebrew name, keyword and phrase against the text of its portion |

## Density

`src/domain/density` collapses repeats in three layers: verbatim 5-word shingles across the whole Torah,
a strict general paraphrase search (IDF-weighted overlap with a 3-verse window), and a curated list of
known retellings (`known/knownRepeats.ts`) checked only against their source. Floor capacity is
`rate × effective / mean effective`, at least 1.

Text: Sefaria, “Tanach with Text Only” (public domain). It is used only at build time.

## Contributing

Issues and pull requests are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) and the
[Code of Conduct](CODE_OF_CONDUCT.md). Content errors have their own issue template. Security problems:
[SECURITY.md](SECURITY.md).

## License

GPL-3.0-only. See [LICENSE](LICENSE). The Torah text from Sefaria is public domain and is not
redistributed here.
