>>>>> lang=en
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

>>>>> lang=ru
## Команды

| Команда | Что делает |
|---|---|
| `npm run dev` | Сервер разработки |
| `npm run build` | Сборка в один файл `dist/index.html` и его языковые копии |
| `npm run lint` | oxlint (все правила React Carburetor), `carburetor-lint`, ≤ 500 строк в файле, ≤ 7 элементов в папке |
| `npm run typecheck` | `tsgo --noEmit` |
| `npm test` | Модульные тесты (rstest) |
| `npm run names` | Подсчёт нестираемых Имён Всевышнего по главам в `src/content/generated/names.json` (огласованный текст MAM с Sefaria, кэш в `.cache/`) |
| `npm run density` | Пересчёт `src/content/generated/density.json` по ивритскому тексту (Sefaria, кэш в `.cache/`) |
| `npm run content:check` | Проверка каждого ивритского имени и фразы по тексту их главы |
| `npm run docs` | Сборка документов на английском, русском и иврите из `root-docs/` ([polydoc](https://github.com/ktav-lang/polydoc)) |
| `npm run docs:check` | Проверка, что собранные документы совпадают с `root-docs/` |

>>>>> lang=he
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

