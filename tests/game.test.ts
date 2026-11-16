import {describe, expect, it} from '@rstest/core';
import {flush} from '@react-carburetor/core/testing';
import {buildSteps} from '#src/domain/game/buildSteps.ts';
import {mixBalanced} from '#src/domain/game/mixBalanced.ts';
import {planRound} from '#src/domain/game/planRound.ts';
import {shuffle} from '#src/domain/game/shuffle.ts';
import type {ClueKind, IGameParsha, IGameSetup} from '#src/domain/game/types.ts';
import {formatDuration} from '#src/i18n/format/formatDuration.ts';
import {GameStore} from '#src/stores/game/GameStore.ts';

/** Детерминированный ГПСЧ (mulberry32). */
const seeded = (seed: number): (() => number) => {
    let a = seed;
    return (): number => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
};

/** 54 главы по книгам 12 / 11 / 10 / 10 / 11; 3 элемента сюжета, уникальны фразы 0 и 2. */
const PARSHIOT: IGameParsha[] = [12, 11, 10, 10, 11]
    .flatMap((size, book) => Array.from({length: size}, () => ({book, stories: 3, phrases: [0, 2]})));
const TOTAL = PARSHIOT.length;
const ALL_BOOKS = [true, true, true, true, true];
const NONE: Record<ClueKind, boolean> = {
    name: false, between: false, before: false, after: false, story: false, phrase: false
};

/** Настройка: режим, книги и включённые виды вопросов. */
const setupOf = (mode: IGameSetup['mode'], books: boolean[], ...kinds: ClueKind[]): IGameSetup => {
    const on = {...NONE};
    for (const kind of kinds) on[kind] = true;
    return {books, mode, reveal: true, kinds: on};
};

/** Проходит раунд верными ответами до конца. */
const solve = (game: GameStore): void => {
    while (game.getData().status === 'playing') expect(game.pick(game.getData().step!.parsha)).toBe('right');
};

describe('shuffle и mixBalanced', () => {
    it('перестановка, детерминированная при одном seed', () => {
        const all = Array.from({length: TOTAL}, (_, i) => i);
        const a = shuffle(all, seeded(7));
        expect(a.toSorted((x, y) => x - y)).toEqual(all);
        expect(shuffle(all, seeded(7))).toEqual(a);
        expect(a).not.toEqual(all);
    });

    it('группы смешиваются поровну: берётся размер наименьшей, порядок типов случайный', () => {
        const mixed = mixBalanced([['a1', 'a2', 'a3', 'a4', 'a5'], ['b1', 'b2', 'b3'], []], seeded(3));
        expect(mixed).toHaveLength(6);
        expect(mixed.filter((x) => x.startsWith('a'))).toHaveLength(3);
        expect(mixed.filter((x) => x.startsWith('b')).toSorted()).toEqual(['b1', 'b2', 'b3']);
        expect(mixBalanced([['x', 'y']], seeded(1)).toSorted()).toEqual(['x', 'y']);
        expect(mixBalanced([[], []], seeded(1))).toEqual([]);
    });
});

describe('buildSteps: режим «место»', () => {
    it('название — шаг на главу', () => {
        expect(buildSteps(PARSHIOT, setupOf('place', ALL_BOOKS, 'name')).groups[0]).toHaveLength(54);
    });

    it('«между»: соседи по обе стороны, крайние — обычным вопросом', () => {
        const plan = buildSteps(PARSHIOT, setupOf('place', ALL_BOOKS, 'between'));
        expect(plan.groups[0]).toHaveLength(52);
        expect(plan.groups[0]![0]).toEqual({parsha: 1, kind: 'between', item: 0, refs: [0, 2]});
        expect(plan.edges.map((s) => [s.parsha, s.kind])).toEqual([[0, 'name'], [53, 'name']]);
    });

    it('«до»: по главе X найти предыдущую; у самой первой — обычный вопрос', () => {
        const plan = buildSteps(PARSHIOT, setupOf('place', ALL_BOOKS, 'before'));
        expect(plan.groups[0]![0]).toEqual({parsha: 0, kind: 'before', item: 0, refs: [1]});
        expect(plan.edges.map((s) => s.parsha)).toEqual([0]);
    });

    it('«после»: по главе X найти следующую; у самой последней — обычный вопрос', () => {
        const plan = buildSteps(PARSHIOT, setupOf('place', ALL_BOOKS, 'after'));
        expect(plan.groups[0]!.at(-1)).toEqual({parsha: 53, kind: 'after', item: 0, refs: [52]});
        expect(plan.edges.map((s) => s.parsha)).toEqual([53]);
    });

    it('соседство — только внутри раунда; крайние не дублируются с названиями', () => {
        const plan = buildSteps(PARSHIOT, setupOf('place', [false, true, false, true, false], 'between'));
        expect(plan.edges.map((s) => s.parsha)).toEqual([12, 22, 33, 42]);
        expect(plan.groups[0]!.every((s) => s.refs.every((ref) => plan.active[ref]))).toBe(true);
        expect(buildSteps(PARSHIOT, setupOf('place', ALL_BOOKS, 'name', 'between')).edges).toHaveLength(0);
    });
});

describe('buildSteps: режим «по сюжету»', () => {
    it('элементы сюжета и уникальные фразы — отдельные группы, без крайних', () => {
        const plan = buildSteps(PARSHIOT, setupOf('story', [true, false, false, false, false], 'story', 'phrase'));
        expect(plan.groups[0]).toHaveLength(12 * 3);
        expect(plan.groups[1]).toHaveLength(12 * 2);
        expect(plan.groups[1]!.some((s) => s.item === 1)).toBe(false);
        expect(plan.edges).toHaveLength(0);
    });

    it('при обоих видах вопросы идут поровну', () => {
        const round = planRound(PARSHIOT, setupOf('story', ALL_BOOKS, 'story', 'phrase'), seeded(4));
        const stories = round.steps.filter((s) => s.kind === 'story').length;
        const phrases = round.steps.filter((s) => s.kind === 'phrase').length;
        expect(stories).toBe(phrases);
        expect(stories).toBe(54 * 2);
        expect(round.left.reduce((sum, n) => sum + n, 0)).toBe(round.steps.length);
    });
});

describe('GameStore: настройка в модалке', () => {
    it('по умолчанию вся Тора, «место», названия; без книг или вопросов режима начать нельзя', () => {
        const game = new GameStore(PARSHIOT, seeded(1));
        expect(game.pick(0)).toBe('ignored');
        game.choose();
        expect(game.getData().status).toBe('choosing');
        expect(game.getData().setup.mode).toBe('place');
        game.toggleBook(0);
        game.toggleBook(0);
        expect(game.canStart()).toBe(false);
        game.start();
        expect(game.getData().status).toBe('choosing');
        game.selectAllBooks();
        game.toggleKind('name');
        expect(game.canStart()).toBe(false);
        game.setMode('story');
        expect(game.canStart()).toBe(true);
        game.toggleKind('story');
        expect(game.canStart()).toBe(false);
        game.toggleKind('phrase');
        expect(game.canStart()).toBe(true);
    });
});

describe('GameStore: выбор книг', () => {
    it('при выбранной всей Торе клик по книге оставляет только её, дальше — переключение', () => {
        const game = new GameStore(PARSHIOT, seeded(2));
        game.toggleBook(2);
        expect(game.getData().setup.books).toEqual([false, false, true, false, false]);
        game.toggleBook(4);
        expect(game.getData().setup.books).toEqual([false, false, true, false, true]);
        game.toggleBook(2);
        expect(game.getData().setup.books).toEqual([false, false, false, false, true]);
        game.selectAllBooks();
        game.toggleBook(0);
        expect(game.getData().setup.books).toEqual([true, false, false, false, false]);
    });
});

describe('GameStore: отгаданные главы', () => {
    it('глава помечена отгаданной после первого верного ответа и до конца раунда', () => {
        const game = new GameStore(PARSHIOT, seeded(13));
        game.toggleKind('name');
        game.toggleKind('between');
        game.toggleKind('before');
        game.start();
        const first = game.getData().step!.parsha;
        expect(game.getData().guessed[first]).toBe(false);
        game.pick(first);
        expect(game.getData().guessed[first]).toBe(true);
        const other = game.getData().step!.parsha;
        game.pick((other + 1) % TOTAL);
        expect(game.getData().guessed[first]).toBe(true);
        game.start();
        expect(game.getData().guessed.some(Boolean)).toBe(false);
    });

    it('опция «скрывать обратно» хранится в настройке', () => {
        const game = new GameStore(PARSHIOT, seeded(14));
        expect(game.getData().setup.reveal).toBe(true);
        game.setReveal(false);
        expect(game.getData().setup.reveal).toBe(false);
    });
});

describe('таймер раунда', () => {
    it('formatDuration: m:ss и h:mm:ss', () => {
        expect(formatDuration(0)).toBe('0:00');
        expect(formatDuration(65_400)).toBe('1:05');
        expect(formatDuration(3_725_000)).toBe('1:02:05');
        expect(formatDuration(-5)).toBe('0:00');
    });

    it('старт ставит время начала, последний верный ответ — время конца', () => {
        let clock = 1_000;
        const game = new GameStore(PARSHIOT, seeded(15), () => clock);
        game.toggleBook(0);
        game.start();
        expect(game.getData().startedAt).toBe(1_000);
        expect(game.getData().finishedAt).toBeNull();
        clock = 61_000;
        solve(game);
        expect(game.getData().finishedAt).toBe(61_000);
        clock = 99_000;
        game.start();
        expect(game.getData().startedAt).toBe(99_000);
        expect(game.getData().finishedAt).toBeNull();
    });
});

describe('GameStore: раунд', () => {
    it('неверный ответ — ошибка, верный — глава раскрыта', () => {
        const game = new GameStore(PARSHIOT, seeded(3));
        game.start();
        expect(game.getData().total).toBe(TOTAL);
        const target = game.getData().step!.parsha;
        expect(game.pick((target + 1) % TOTAL)).toBe('wrong');
        expect(game.getData().mistakes).toBe(1);
        expect(game.pick(target)).toBe('right');
        expect(game.getData().found[target]).toBe(true);
        expect(game.pick(target)).toBe('ignored');
    });

    it('«ещё раз» начинает заново с тем же выбором', () => {
        const game = new GameStore(PARSHIOT, seeded(5));
        game.start();
        solve(game);
        expect(game.getData().status).toBe('done');
        game.start();
        expect(game.getData().done).toBe(0);
        expect(game.getData().found.some(Boolean)).toBe(false);
    });

    it('крайние вопросы идут в самом конце раунда', () => {
        const game = new GameStore(PARSHIOT, seeded(11));
        game.toggleKind('name');
        game.toggleKind('between');
        game.start();
        const kinds: ClueKind[] = [];
        while (game.getData().status === 'playing') {
            kinds.push(game.getData().step!.kind);
            game.pick(game.getData().step!.parsha);
        }
        expect(kinds).toHaveLength(54);
        expect(kinds.slice(0, 52).every((kind) => kind === 'between')).toBe(true);
        expect(kinds.slice(52)).toEqual(['name', 'name']);
    });

    it('«по сюжету»: глава отмечена, когда угаданы все её шаги', () => {
        const game = new GameStore(PARSHIOT, seeded(12));
        game.setMode('story');
        game.toggleBook(0);
        game.start();
        expect(game.getData().total).toBe(36);
        while (game.getData().status === 'playing') {
            const {parsha, kind} = game.getData().step!;
            expect(kind).toBe('story');
            const before = game.getData().left[parsha]!;
            game.pick(parsha);
            expect(game.getData().found[parsha]).toBe(before === 1);
        }
        expect(game.getData().found.slice(0, 12).every(Boolean)).toBe(true);
    });

    it('клик по главе вне выбранных книг игнорируется', () => {
        const game = new GameStore(PARSHIOT, seeded(8));
        game.toggleBook(1);
        game.toggleBook(4);
        game.start();
        expect(game.getData().total).toBe(22);
        expect(game.pick(0)).toBe('ignored');
        expect(game.getData().mistakes).toBe(0);
    });

    it('выход из игры уведомляет подписчиков', () => {
        const game = new GameStore(PARSHIOT, seeded(6));
        const seen: string[] = [];
        const stop = game.watch((data) => data.status, (status: string): void => { seen.push(status); });
        try {
            game.start();
            game.stop();
            flush(game);
            expect(seen).toEqual(['playing', 'idle']);
        } finally {
            stop();
        }
    });
});
