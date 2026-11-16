import type {IGameState} from './types.ts';

/** Число книг Торы. */
const BOOK_COUNT = 5;

const no = (): boolean => false;
const yes = (): boolean => true;
const zero = (): number => 0;

/** Игра не начата; по умолчанию — вся Тора, вопросы-названия. */
export const initialGame = (total: number): IGameState => ({
    status: 'idle',
    setup: {
        books: Array.from({length: BOOK_COUNT}, yes),
        mode: 'place',
        reveal: true,
        kinds: {name: true, between: false, before: false, after: false, story: true, phrase: false}
    },
    active: Array.from({length: total}, no),
    left: Array.from({length: total}, zero),
    found: Array.from({length: total}, no),
    guessed: Array.from({length: total}, no),
    step: null,
    queue: [],
    total: 0,
    done: 0,
    mistakes: 0,
    startedAt: null,
    finishedAt: null,
    lastWrong: null,
    lastRight: null
});
