# ספירלת התורה · Torah Spiral · Спираль Торы

**שפות:** [English](README.md) · [Русский](README.ru.md) · **עברית**

[![CI](https://github.com/torah-sight/torah-spiral/actions/workflows/ci.yml/badge.svg)](https://github.com/torah-sight/torah-spiral/actions/workflows/ci.yml)
[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)

**האתר:** https://torah-sight.github.io/torah-spiral/he/ · הממשק בעברית ([/he/](https://torah-sight.github.io/torah-spiral/he/)), ברוסית ([/ru/](https://torah-sight.github.io/torah-spiral/ru/)) ובאנגלית
([/en/](https://torah-sight.github.io/torah-spiral/en/)); קישור של שפה פותח את האתר מיד בשפה הזאת.

יישום סטטי בעמוד אחד ללימוד התורה בספירלה, כמו לוח הכפל: טבלה של 6 × 9 (או חמש עמודות של ספרים) עם
54 פרשות השבוע, עם שכבות שנפתחות לפי בחירה — שמות הפרשות, שמות מפתח, ביטויי מפתח ועלילה קצרה מאוד. הקיבולת
של כל רמה יחסית לצפיפות הפרשה: מספר המילים שלה **אחרי צמצום החזרות** (חזרות מילה במילה, כמו קורבנות
שנים־עשר הנשיאים, וסיפורים חוזרים, כמו סיפור אליעזר או ויקהל–פקודי).

נבנה בעזרת [React Carburetor](https://github.com/PHPCraftdream/ReactCarburetor) 0.2.0, ‏Rsbuild ‏(Rspack),
‏TypeScript ‏(tsgo) ו־Tailwind CSS. תוצר הבנייה הוא קובץ עצמאי אחד, `dist/index.html`, והעתקים שלו
לקישורי השפות (`dist/he/`, `dist/ru/`, `dist/en/`).

## אפשרויות

- **סקירת הפרשות** — טבלה של 6 × 9 או חמש עמודות של ספרים; שמות הפרשות תמיד גלויים, ושמות, פסוקים ועלילה נפתחים כל אחד בנפרד.
- **סטטיסטיקת הפרשות** — דירוג הפרשות לפי השמות שאינם נמחקים, לפי המצוות (ספר החינוך: כולן, מצוות
  עשה, מצוות לא תעשה) ולפי פסוקים, מילים או אותיות.
- **משחק** — למצוא את מקומה של פרשה (לפי שם, בין, לפני, אחרי) או לזהות אותה לפי העלילה והביטויים
  הייחודיים לה; בחירת ספרים, תאים שנוחשו נשארים פתוחים או נסגרים שוב, משחק נגד השעון.
- גימטריה של שם כל פרשה.
- ערכת נושא בהירה וכהה, פריסה מימין לשמאל לעברית, עובד גם בלי רשת כקובץ אחד.

## פקודות

| פקודה | מה היא עושה |
|---|---|
| `npm run dev` | שרת פיתוח |
| `npm run build` | בנייה לקובץ אחד, `dist/index.html`, ולהעתקים שלו לשפות |
| `npm run lint` | ‏oxlint (כל הכללים של React Carburetor), ‏`carburetor-lint`, עד 500 שורות בקובץ, עד 7 פריטים בתיקייה |
| `npm run typecheck` | `tsgo --noEmit` |
| `npm test` | בדיקות יחידה (rstest) |
| `npm run names` | ספירת השמות שאינם נמחקים בכל פרשה אל `src/content/generated/names.json` (הטקסט המנוקד של MAM מ־Sefaria, במטמון `.cache/`) |
| `npm run density` | חישוב מחדש של `src/content/generated/density.json` לפי הטקסט העברי (Sefaria, במטמון `.cache/`) |
| `npm run content:check` | בדיקת כל שם וביטוי בעברית מול הטקסט של הפרשה שלו |
| `npm run docs` | בניית המסמכים באנגלית, ברוסית ובעברית מתוך `root-docs/` ‏([polydoc](https://github.com/ktav-lang/polydoc)) |
| `npm run docs:check` | בדיקה שהמסמכים הבנויים תואמים ל־`root-docs/` |

## צפיפות, שמות ומצוות

‏`src/domain/density` מצמצם חזרות בשלוש שכבות: רצפים זהים של 5 מילים בכל התורה, חיפוש כללי ומחמיר של
ניסוחים חוזרים (חפיפה משוקללת IDF בחלון של 3 פסוקים) ורשימה מבוקרת של סיפורים חוזרים ידועים
(`known/knownRepeats.ts`), הנבדקים רק מול המקור שלהם. קיבולת הרמה היא
`rate × effective / mean effective`, ולפחות 1.

הטקסט: Sefaria, ‏“Tanach with Text Only” (נחלת הכלל). משמש רק בזמן הבנייה.

השמות: נספרים רק השמות שאינם נמחקים (קודש), לפי מסכת סופרים פרק ד. הטקסט המנוקד „מקרא על פי המסורה”
(Sefaria, ‏CC BY-SA, מוויקיטקסט העברי) מבחין בין אֲדֹנָי לאֲדֹנִי ובין אֵל לאֶל; מופעי חול באותו כתיב (אלוהים
אחרים, דיינים, בית־אל, „אֵלֶּה”) רשומים עם הנימוקים ב־`src/content/tallies/nameFixes.ts`. נשמרים רק המספרים.

המצוות: לפי פרשות, על פי כותרות הפרשות של ספר החינוך עצמו (`src/content/tallies/mitzvot.ts`), ונבדקו
מול חלוקת הפרשות ב־Sefaria: ‏248 מצוות עשה ו־365 מצוות לא תעשה, 613 בסך הכול.

## השתתפות

נשמח ל־issues ול־pull requests — ראו [CONTRIBUTING.he.md](CONTRIBUTING.he.md) ואת
[כללי ההתנהגות](CODE_OF_CONDUCT.he.md). לטעויות בתוכן יש תבנית issue משלהן. בעיות אבטחה:
[SECURITY.he.md](SECURITY.he.md).

## רישיון

‏GPL-3.0-only. ראו [LICENSE](LICENSE). טקסטי התורה מ־Sefaria אינם מופצים כאן: רק מספרים שחושבו מהם.
