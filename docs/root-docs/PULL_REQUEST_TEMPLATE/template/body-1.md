>>>>> shared=langs
<!-- English: docs/PULL_REQUEST_TEMPLATE.md · Русский: docs/PULL_REQUEST_TEMPLATE.ru.md · עברית: docs/PULL_REQUEST_TEMPLATE.he.md -->

>>>>> lang=en
<<<<< include=langs

## What and why

<!-- What changed, why, and which issue it closes (Closes #…). -->

## Checklist

- [ ] `npm run lint`, `npm run typecheck`, `npm test`, `npm run docs:check`, `npm run content:check`, `npm run build` pass
- [ ] User-visible strings exist in Hebrew, Russian and English
- [ ] UI changes checked in light and dark theme and in RTL (Hebrew)
- [ ] Content changes cite verses and pass `npm run content:check`
- [ ] Document changes are made in `root-docs/` in all three languages
>>>>> lang=ru
<<<<< include=langs

## Что и зачем

<!-- Что изменилось, зачем и какой issue закрывает (Closes #…). -->

## Чек-лист

- [ ] Проходят `npm run lint`, `npm run typecheck`, `npm test`, `npm run docs:check`, `npm run content:check`, `npm run build`
- [ ] Строки интерфейса есть на иврите, русском и английском
- [ ] Изменения интерфейса проверены в светлой и тёмной теме и в RTL (иврит)
- [ ] Изменения содержания ссылаются на стихи и проходят `npm run content:check`
- [ ] Изменения документов сделаны в `root-docs/` на всех трёх языках
>>>>> lang=he
<<<<< include=langs

## מה ולמה

<!-- מה השתנה, למה, ואיזה issue זה סוגר (Closes #…). -->

## רשימת בדיקה

- [ ] עוברות הבדיקות `npm run lint`, `npm run typecheck`, `npm test`, `npm run docs:check`, `npm run content:check`, `npm run build`
- [ ] מחרוזות הממשק קיימות בעברית, ברוסית ובאנגלית
- [ ] שינויי ממשק נבדקו בערכת נושא בהירה וכהה וב־RTL (עברית)
- [ ] שינויי תוכן מציינים פסוקים ועוברים את `npm run content:check`
- [ ] שינויים במסמכים נעשו ב־`root-docs/` בכל שלוש השפות
