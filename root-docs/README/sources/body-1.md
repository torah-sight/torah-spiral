>>>>> lang=en
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

>>>>> lang=ru
## Плотность, Имена и заповеди

`src/domain/density` схлопывает повторы в три слоя: дословные 5-словные шинглы по всей Торе, строгий
общий поиск пересказов (пересечение с весами IDF в окне из 3 стихов) и выверенный список известных
пересказов (`known/knownRepeats.ts`), которые сверяются только со своим источником. Ёмкость этажа —
`rate × effective / mean effective`, не меньше 1.

Текст: Sefaria, «Tanach with Text Only» (общественное достояние). Используется только при сборке.

Имена Всевышнего: считаются только нестираемые (святые) употребления, по трактату Софрим, глава 4.
Огласованный текст «Микра по Масоре» (Sefaria, CC BY-SA, из ивритского Викитеки) отличает אֲדֹנָי от
אֲדֹנִי и אֵל от אֶל; светские употребления с тем же написанием (чужие боги, судьи, Бейт-Эль, «эти»)
перечислены с причинами в `src/content/tallies/nameFixes.ts`. Хранятся только числа.

Заповеди: по главам — по заголовкам самого Сефер а-Хинух (`src/content/tallies/mitzvot.ts`), сверены
с разметкой глав на Sefaria: 248 повелевающих и 365 запрещающих, всего 613.

>>>>> lang=he
## צפיפות, שמות ומצוות

‏`src/domain/density` מצמצם חזרות בשלוש שכבות: רצפים זהים של 5 מילים בכל התורה, חיפוש כללי ומחמיר של
ניסוחים חוזרים (חפיפה משוקללת IDF בחלון של 3 פסוקים) ורשימה מבוקרת של סיפורים חוזרים ידועים
(`known/knownRepeats.ts`), הנבדקים רק מול המקור שלהם. קיבולת הקומה היא
`rate × effective / mean effective`, ולפחות 1.

הטקסט: Sefaria, ‏“Tanach with Text Only” (נחלת הכלל). משמש רק בזמן הבנייה.

השמות: נספרים רק השמות שאינם נמחקים (קודש), לפי מסכת סופרים פרק ד. הטקסט המנוקד „מקרא על פי המסורה”
(Sefaria, ‏CC BY-SA, מוויקיטקסט העברי) מבחין בין אֲדֹנָי לאֲדֹנִי ובין אֵל לאֶל; מופעי חול באותו כתיב (אלוהים
אחרים, דיינים, בית־אל, „אֵלֶּה”) רשומים עם הנימוקים ב־`src/content/tallies/nameFixes.ts`. נשמרים רק המספרים.

המצוות: לפי פרשות, על פי כותרות הפרשות של ספר החינוך עצמו (`src/content/tallies/mitzvot.ts`), ונבדקו
מול חלוקת הפרשות ב־Sefaria: ‏248 מצוות עשה ו־365 מצוות לא תעשה, 613 בסך הכול.

