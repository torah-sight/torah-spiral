/** Строки интерфейса одного языка. */
export interface IMessages {
    appTitle: string;
    tagline: string;
    language: string;
    /** Подписи этажей 0–4: названия, имена, слова, фразы, сюжет. */
    floors: readonly [string, string, string, string];
    floorLabel: string;
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
    close: string;
    gameStart: string;
    gameStop: string;
    gameFind: string;
    gameCorrect: string;
    gameWrong: string;
    gameProgress: string;
    gameMistakes: string;
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
    /** Подсказка: на нижнем этаже карточка короткая. */
    floorHint: string;
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
}
