# איך לעזור לספירלת התורה

**שפות:** [English](CONTRIBUTING.md) · [Русский](CONTRIBUTING.ru.md) · **עברית**

תודה על העזרה. נשמח לתרומה בכל גודל: שגיאת כתיב בעלילה, ביטוי מפתח מדויק יותר, תיקון באג, תיקון
תרגום, רעיון חדש למשחק.

## כללי יסוד

- היו נעימים. ראו את [כללי ההתנהגות](CODE_OF_CONDUCT.he.md).
- בתרומתכם אתם מסכימים שעבודתכם מופצת תחת הרישיון [GPL-3.0-only](LICENSE).
- על בעיות אבטחה מדווחים באופן פרטי, לא ב־issues פומביים. ראו [SECURITY.he.md](SECURITY.he.md).

## איך מתחילים

נדרש Node.js 24 ומעלה.

```sh
npm ci
npm run dev
```

לפני פתיחת pull request הריצו את אותן בדיקות שמריץ ה־CI:

```sh
npm run lint
npm run typecheck
npm test
npm run docs:check
npm run content:check
npm run build
```

הפקודות `npm run content:check` ו־`npm run density` מורידות את הטקסט העברי מ־Sefaria פעם אחת ושומרות
אותו במטמון `.cache/` (ש־Git מתעלם ממנו). הטקסט לעולם אינו נכנס ל־commit ואינו נשלח ב־`dist/`.

## כללי הקוד

- הארכיטקטורה לפי [React Carburetor](https://github.com/PHPCraftdream/ReactCarburetor): מאגרי מצב
  (stores) עם פונקציות שינוי ברמת המודול, רכיבי `ScopedAntiHookComponent`, אסימונים (tokens) ו־scopes.
  כל 37 כללי ה־lint של Carburetor פעילים; נא לא לכבות אותם.
- עד 500 שורות בקובץ קוד ועד 7 פריטים בתיקייה בתוך `src`, `scripts`, `tests` ו־`.github`
  ‏(`scripts/repo/checkStructure.ts`).
- ייבוא בתוך הפרויקט — דרך `#src/*`.
- כל מחרוזת שהמשתמש רואה עוברת דרך `src/i18n` וקיימת בעברית, ברוסית ובאנגלית.
- הערות בקוד — קצרות.

## מסמכים

‏README, ‏CONTRIBUTING, ‏CODE_OF_CONDUCT, ‏SECURITY ותבנית ה־pull request קיימים באנגלית, ברוסית ובעברית.
הם נבנים בעזרת [polydoc](https://github.com/ktav-lang/polydoc) מתוך `root-docs/` (תבנית ה־pull request —
מתוך `docs/root-docs/`). ערכו את קובצי המקור `root-docs/<DOC>/<unit>/body-1.md`, שבהם כל השפות יושבות
בקובץ אחד, כל אחת אחרי שורת `>>>>> lang=` שלה, ואז הריצו `npm run docs`. אין לערוך ידנית את קובצי
ה־`*.md` הבנויים: ה־CI מריץ `npm run docs:check`.

## כללי התוכן

התוכן נמצא ב־`src/content/books/*.ts`: שמות, ביטויי מפתח ועלילה קצרה לכל אחת מ־54 פרשות השבוע,
בשלוש שפות.

- כל שם וכל ביטוי בעברית חייבים להופיע בטקסט של הפרשה שלהם. הבדיקה נעשית בעזרת
  `npm run content:check`.
- העדיפו את מה שמייחד את הפרשה על פני מה שפשוט מופיע בה.
- כל משפט בעלילה צריך להיות מובן בפני עצמו: המשחק מציג את המשפטים אחד אחד.
- אם אינכם בטוחים בפירוש, פתחו קודם issue לפי התבנית “Content error”.

## Pull requests

- נושא אחד לכל pull request.
- תארו מה השתנה ולמה; קשרו ל־issue אם יש.
- בשינויי ממשק צילומי מסך עוזרים (ערכת נושא בהירה וכהה, ו־RTL לעברית).
