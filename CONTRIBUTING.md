# Contributing to Torah Spiral

Thank you for helping. Contributions of every size are welcome: a typo in a storyline, a better key
phrase, a bug fix, a translation fix, a new idea for the game.

## Ground rules

- Be kind. See the [Code of Conduct](CODE_OF_CONDUCT.md).
- By contributing you agree that your work is licensed under [GPL-3.0-only](LICENSE).
- Security problems are reported privately, not in public issues. See [SECURITY.md](SECURITY.md).

## Getting started

Requirements: Node.js 24 or newer.

```sh
npm ci
npm run dev
```

Before opening a pull request, run the same checks as CI:

```sh
npm run lint
npm run typecheck
npm test
npm run content:check
npm run build
```

`npm run content:check` and `npm run density` download the Hebrew text from Sefaria once and cache it
in `.cache/` (ignored by Git). The text is never committed and never shipped in `dist/`.

## Code rules

- Architecture follows [React Carburetor](https://github.com/PHPCraftdream/ReactCarburetor): stores with
  module-level mutators, `ScopedAntiHookComponent` components, tokens and scopes. All 37 Carburetor lint
  rules are on; please do not disable them.
- At most 500 lines per code file and at most 7 entries per folder in `src`, `scripts`, `tests` and
  `.github` (`scripts/check-structure.ts`).
- Imports inside the project use `#src/*`.
- Every user-visible string goes through `src/i18n` and exists in Hebrew, Russian and English.
- Code comments are short.

## Content rules

Content lives in `src/content/books/*.ts`: names, keywords, key phrases and a short storyline for each of
the 54 weekly portions, in three languages.

- Every Hebrew name, keyword and phrase must occur in the text of its portion. `npm run content:check`
  verifies this.
- Prefer what is distinctive for the portion over what is merely present in it.
- A storyline sentence must make sense on its own: the game shows sentences one by one.
- If you are unsure about an interpretation, open an issue with the "Content error" template first.

## Pull requests

- One topic per pull request.
- Describe what changed and why; link the issue if there is one.
- Screenshots help for UI changes (light and dark theme, and RTL for Hebrew).
