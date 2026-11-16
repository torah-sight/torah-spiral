/** Состояние игры «найди главу»: выбор режима, раунд, итог. */
export type GameStatus = 'idle' | 'choosing' | 'playing' | 'done';

/**
 * Вид вопроса шага.
 *
 * name — название; story — элемент сюжета; phrase — ключевая фраза;
 * between — глава между двумя; before — глава перед; after — глава после.
 */
export type ClueKind = 'name' | 'story' | 'phrase' | 'between' | 'before' | 'after';

/** Вопросы режима «найди место главы» (клетки скрыты). */
export type PlaceKind = 'name' | 'between' | 'before' | 'after';

/** Вопросы режима «по сюжету» (главы видны). */
export type TextKind = 'story' | 'phrase';

/**
 * Режим игры.
 *
 * place — клетки скрыты, нужно найти место главы; story — главы видны, угадать главу по сюжету или фразе.
 */
export type GameMode = 'place' | 'story';

/** Настройка раунда, выбираемая в модалке. */
export interface IGameSetup {
    /** Выбранные книги 0–4. */
    books: boolean[];
    mode: GameMode;
    /** Режим «место»: отгаданные главы остаются открытыми (иначе скрываются обратно). */
    reveal: boolean;
    /** Включённые виды вопросов; действуют только виды текущего режима. */
    kinds: Record<ClueKind, boolean>;
}

/** Готовый раунд: шаги по порядку, участие и счётчики шагов-ответов глав. */
export interface IRound {
    steps: IGameStep[];
    active: boolean[];
    left: number[];
}

/** Что игра знает о главе. */
export interface IGameParsha {
    book: number;
    /** Сколько элементов сюжета можно загадать. */
    stories: number;
    /** Номера ключевых фраз, встречающихся только в этой главе. */
    phrases: readonly number[];
}

/** Один шаг раунда: найти главу `parsha` по подсказке. */
export interface IGameStep {
    /** Ответ — индекс главы. */
    parsha: number;
    kind: ClueKind;
    /** Номер элемента сюжета или фразы. */
    item: number;
    /** Главы-ориентиры: две для «между», одна для «до»/«после». */
    refs: readonly number[];
}

/** Данные игры. */
export interface IGameState {
    status: GameStatus;
    setup: IGameSetup;
    /** Глава участвует в раунде. */
    active: boolean[];
    /** Сколько шагов-ответов главы ещё не пройдено. */
    left: number[];
    /** Все шаги-ответы главы пройдены. */
    found: boolean[];
    /** Глава хотя бы раз отгадана — рамка до конца раунда. */
    guessed: boolean[];
    /** Текущий шаг. */
    step: IGameStep | null;
    /** Оставшиеся шаги после текущего. */
    queue: IGameStep[];
    total: number;
    done: number;
    mistakes: number;
    /** Начало раунда, мс эпохи. */
    startedAt: number | null;
    /** Конец раунда (последний верный ответ), мс эпохи. */
    finishedAt: number | null;
    /** Последний неверный клик — подсветка ошибки. */
    lastWrong: number | null;
    /** Последний верный клик — подсветка успеха. */
    lastRight: number | null;
}

/** Итог клика по клетке. */
export type PickResult = 'right' | 'wrong' | 'ignored';
