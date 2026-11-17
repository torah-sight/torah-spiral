>>>>> lang=en
## Content rules

Content lives in `src/content/books/*.ts`: names, key phrases and a short storyline for each of
the 54 weekly portions, in three languages.

- Every Hebrew name and phrase must occur in the text of its portion. `npm run content:check`
  verifies this.
- Prefer what is distinctive for the portion over what is merely present in it.
- A storyline sentence must make sense on its own: the game shows sentences one by one.
- If you are unsure about an interpretation, open an issue with the "Content error" template first.

>>>>> lang=ru
## Правила содержания

Содержание лежит в `src/content/books/*.ts`: имена, ключевые фразы и краткий сюжет каждой из 54
недельных глав на трёх языках.

- Каждое ивритское имя и каждая фраза должны встречаться в тексте своей главы. Это проверяет
  `npm run content:check`.
- Выбирайте то, что отличает главу, а не то, что в ней просто есть.
- Предложение сюжета должно быть понятно само по себе: игра показывает предложения по одному.
- Если сомневаетесь в толковании, сначала откройте issue по шаблону «Content error».

>>>>> lang=he
## כללי התוכן

התוכן נמצא ב־`src/content/books/*.ts`: שמות, ביטויי מפתח ועלילה קצרה לכל אחת מ־54 פרשות השבוע,
בשלוש שפות.

- כל שם וכל ביטוי בעברית חייבים להופיע בטקסט של הפרשה שלהם. הבדיקה נעשית בעזרת
  `npm run content:check`.
- העדיפו את מה שמייחד את הפרשה על פני מה שפשוט מופיע בה.
- כל משפט בעלילה צריך להיות מובן בפני עצמו: המשחק מציג את המשפטים אחד אחד.
- אם אינכם בטוחים בפירוש, פתחו קודם issue לפי התבנית “Content error”.

