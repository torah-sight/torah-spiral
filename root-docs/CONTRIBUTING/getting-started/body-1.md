>>>>> shared=start
```sh
npm ci
npm run dev
```

>>>>> shared=checks
```sh
npm run lint
npm run typecheck
npm test
npm run docs:check
npm run content:check
npm run build
```

>>>>> lang=en
## Getting started

Requirements: Node.js 24 or newer.

<<<<< include=start

Before opening a pull request, run the same checks as CI:

<<<<< include=checks

`npm run content:check` and `npm run density` download the Hebrew text from Sefaria once and cache it
in `.cache/` (ignored by Git). The text is never committed and never shipped in `dist/`.

>>>>> lang=ru
## С чего начать

Нужен Node.js 24 или новее.

<<<<< include=start

Перед pull request запустите те же проверки, что и CI:

<<<<< include=checks

`npm run content:check` и `npm run density` один раз скачивают ивритский текст с Sefaria и кэшируют
его в `.cache/` (Git его игнорирует). Текст никогда не коммитится и не попадает в `dist/`.

>>>>> lang=he
## איך מתחילים

נדרש Node.js 24 ומעלה.

<<<<< include=start

לפני פתיחת pull request הריצו את אותן בדיקות שמריץ ה־CI:

<<<<< include=checks

הפקודות `npm run content:check` ו־`npm run density` מורידות את הטקסט העברי מ־Sefaria פעם אחת ושומרות
אותו במטמון `.cache/` (ש־Git מתעלם ממנו). הטקסט לעולם אינו נכנס ל־commit ואינו נשלח ב־`dist/`.

