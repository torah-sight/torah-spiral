import type {ClueKind, GameMode, IGameState, IRound} from '#src/domain/game/types.ts';

const no = (): boolean => false;

const clearMarks = (draft: IGameState): void => {
    draft.lastWrong = null;
    draft.lastRight = null;
};

/** Мутаторы игры: модульные функции для `update`. */
export const gameMutators = {
    /** Модалка выбора режима. */
    choose(draft: IGameState): void {
        draft.status = 'choosing';
        draft.step = null;
        draft.queue = [];
        clearMarks(draft);
    },
    /** Если выбрана вся Тора — оставляет только эту книгу; иначе включает или выключает её. */
    toggleBook(draft: IGameState, book: number): void {
        const books = draft.setup.books;
        if (books.every(Boolean)) {
            for (const [other] of books.entries()) books[other] = other === book;
            return;
        }
        books[book] = !books[book];
    },
    /** Выбирает все пять книг. */
    selectAllBooks(draft: IGameState): void {
        for (const [book] of draft.setup.books.entries()) draft.setup.books[book] = true;
    },
    /** Оставлять ли отгаданные главы открытыми. */
    setReveal(draft: IGameState, reveal: boolean): void {
        draft.setup.reveal = reveal;
    },
    /** Выбирает режим игры. */
    setMode(draft: IGameState, mode: GameMode): void {
        draft.setup.mode = mode;
    },
    /** Включает или выключает вид вопросов. */
    toggleKind(draft: IGameState, kind: ClueKind): void {
        draft.setup.kinds[kind] = !draft.setup.kinds[kind];
    },
    /** Новый раунд: `steps` уже в порядке вопросов, крайние в конце. */
    start(draft: IGameState, plan: IRound, now: number): void {
        draft.status = plan.steps.length > 0 ? 'playing' : 'done';
        draft.step = plan.steps[0] ?? null;
        draft.queue = plan.steps.slice(1);
        draft.active = plan.active;
        draft.left = plan.left;
        draft.found = draft.found.map(no);
        draft.guessed = draft.guessed.map(no);
        draft.total = plan.steps.length;
        draft.done = 0;
        draft.mistakes = 0;
        draft.startedAt = now;
        draft.finishedAt = plan.steps.length > 0 ? null : now;
        clearMarks(draft);
    },
    /** Верный ответ: шаг пройден, глава раскрывается после последнего своего шага. */
    right(draft: IGameState, index: number, now: number): void {
        draft.left[index] = Math.max(0, (draft.left[index] ?? 0) - 1);
        if (draft.left[index] === 0) draft.found[index] = true;
        draft.guessed[index] = true;
        draft.done += 1;
        draft.lastRight = index;
        draft.lastWrong = null;
        const next = draft.queue.shift();
        draft.step = next ?? null;
        if (next === undefined) {
            draft.status = 'done';
            draft.finishedAt = now;
        }
    },
    /** Неверный ответ. */
    wrong(draft: IGameState, index: number): void {
        draft.mistakes += 1;
        draft.lastWrong = index;
        draft.lastRight = null;
    },
    /** Выход из игры. */
    stop(draft: IGameState): void {
        draft.status = 'idle';
        draft.step = null;
        draft.queue = [];
        clearMarks(draft);
    }
};
