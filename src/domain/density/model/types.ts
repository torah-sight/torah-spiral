/** Ссылка на стих: книга 0–4, глава и стих с 1. */
export interface IVerseRef {
    book: number;
    chapter: number;
    verse: number;
}

/** Слово текста Торы в порядке чтения. */
export interface IToken {
    word: string;
    ref: IVerseRef;
    parsha: number;
}

/** Свёрнутый участок-повтор для отчёта. */
export interface IRepeatSpan {
    from: IVerseRef;
    to: IVerseRef;
    words: number;
    source: IVerseRef;
}

/** Объём главы до и после свёртки повторов. */
export interface IParshaDensity {
    raw: number;
    effective: number;
    spans: IRepeatSpan[];
}

/** Настройки поиска пересказов. */
export interface IParaphraseOptions {
    /** Порог доли IDF-веса стиха, найденной в окне-источнике (общий поиск). */
    threshold: number;
    /** Порог для курируемых пар «пересказ ← источник». */
    knownThreshold: number;
    /** Короче этого стих не сравнивается. */
    minWords: number;
    /** Сколько подряд идущих стихов-источников образуют окно. */
    window: number;
}

/** Настройки свёртки повторов. */
export interface IRepeatOptions {
    /** Длина шингла в словах. */
    shingle: number;
    /** Мин. длина свёрнутого участка для отчёта. */
    reportMin: number;
    /** Допустимый разрыв (новые слова) внутри одного участка отчёта. */
    gap: number;
    paraphrase: IParaphraseOptions;
}

/** Известный пересказ: стихи `target` сверяются только с `sources`. Диапазон «гл:ст-гл:ст». */
export interface IKnownRepeat {
    note: string;
    target: [number, string];
    sources: [number, string][];
}

/** Стих со словами и их основами. */
export interface IVerse {
    start: number;
    ref: IVerseRef;
    words: string[];
    stems: string[];
    unique: string[];
}

/** Состояние прохода поиска пересказов. */
export interface IScan {
    verses: IVerse[];
    idf: (word: string) => number;
    marks: Int32Array;
    options: IParaphraseOptions;
}

/** Лучшее окно-источник и его покрытие. */
export interface IBest {
    start: number;
    score: number;
}
