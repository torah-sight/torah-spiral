import type {Floor} from '#src/domain/density/quotas/floors.ts';
/** Строки интерфейса одного языка. */
export interface IMessages {
    appTitle: string;
    tagline: string;
    language: string;
    /** Подписи слоёв поверх названий. */
    floors: Record<Floor, string>;
    floorLabel: string;
    /** Сводка выбора слоёв: все или ни одного. */
    layersAll: string;
    layersNone: string;
    layoutLabel: string;
    layoutGrid: string;
    layoutBooks: string;
    layoutSize: string;
    /** Подсказка к полоске размера в стихах. */
    sizeHint: string;
    layoutWords: string;
    wordsHint: string;
    layoutLetters: string;
    lettersHint: string;
    parsha: string;
    /** «Книга» — в карточке главы. */
    book: string;
    /** «О названии» — откуда название главы. */
    nameOrigin: string;
    /** «Сюжет книги» — в карточке книги. */
    bookStory: string;
    /** «О названии» — в карточке книги. */
    bookNameOrigin: string;
    close: string;
    prevParsha: string;
    nextParsha: string;
    /** Неактивные стрелки на краях: перед первой главой и после последней. */
    torahStart: string;
    torahEnd: string;
    gameStart: string;
    gameStop: string;
    gameFind: string;
    gameCorrect: string;
    gameWrong: string;
    gameProgress: string;
    gameMistakes: string;
    /** Итог раунда; `{n}` — сколько глав было в раунде. */
    gameDone: string;
    gameAgain: string;
    /** Подвал: «Лицензия», «Исходный код», источник текста Торы. */
    footerLicense: string;
    footerSource: string;
    footerText: string;
    /** «Главы 1–50». */
    chapters: string;
    /** «Недельные главы 1–12». */
    portions: string;
    hidden: string;
    theme: string;
    themeLight: string;
    themeDark: string;
    /** Режим игры: вся Тора. */
    gameAll: string;
    gameChoose: string;
    gameSetup: string;
    gameBooks: string;
    gameClues: string;
    clueNames: string;
    gamePlay: string;
    gameCancel: string;
    /** «Где глава, в которой…» — перед элементом сюжета. */
    gameFindStory: string;
    clueStory: string;
    cluePhrases: string;
    clueBetween: string;
    clueBefore: string;
    clueAfter: string;
    gameFindPhrase: string;
    gameBetween: string;
    gameAnd: string;
    gameBefore: string;
    gameAfter: string;
    /** Пояснение: крайние главы спрашиваются в конце обычным вопросом. */
    gameEdgesNote: string;
    gameRestart: string;
    gameTime: string;
    gameMode: string;
    modePlace: string;
    modeStory: string;
    /** Пояснение режима «по сюжету». */
    modeStoryNote: string;
    guessedLabel: string;
    guessedShow: string;
    guessedHide: string;
    navOverview: string;
    navSizes: string;
    navGame: string;
    homeOverview: string;
    homeSizes: string;
    homeGame: string;
    homeChoose: string;
    sizeByLabel: string;
    /** «Имена» — группа мер святых Имён. */
    namesLabel: string;
    /** «Гематрия» и её краткая подпись в клетке. */
    gematria: string;
    gematriaShort: string;
    /** Подсказка к мере Имени; `{name}` — Имя. */
    nameHint: string;
    /** Подсказка к особой букве ה. */
    heHint: string;
    /** Группа и кнопки топа заповедей, подсказки к ним. */
    mitzvotLabel: string;
    mitzvotAll: string;
    /** Топ по всем семи Именам вместе: кнопка и подсказка. */
    namesAll: string;
    namesAllHint: string;
    mitzvotPositive: string;
    mitzvotNegative: string;
    mitzvotHint: string;
    positiveHint: string;
    negativeHint: string;
}
