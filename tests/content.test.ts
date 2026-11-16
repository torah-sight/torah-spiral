import {describe, expect, it} from '@rstest/core';
import {BOOK_SPANS} from '#src/content/bookSpans.ts';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {FLOORS} from '#src/domain/density/quotas/floors.ts';
import {countWords} from '#src/i18n/format/countWords.ts';
import {splitSentences} from '#src/i18n/format/splitSentences.ts';
import {LOCALES} from '#src/i18n/locales.ts';

const LIST_FLOORS = ['names', 'phrases'] as const;

describe('PARSHIOT', () => {
    it('54 главы с порядковыми номерами 1–54 по книгам 12/11/10/10/11', () => {
        expect(PARSHIOT).toHaveLength(54);
        expect(PARSHIOT.map((p: IParsha): number => p.ordinal)).toEqual(Array.from({length: 54}, (_, i) => i + 1));
        const perBook = [0, 1, 2, 3, 4].map((b: number): number => PARSHIOT.filter((p) => p.book === b).length);
        expect(perBook).toEqual([12, 11, 10, 10, 11]);
    });

    it('объём каждого этажа — от 1 до ёмкости главы', () => {
        for (const parsha of PARSHIOT) {
            for (const floor of LIST_FLOORS) {
                expect(parsha[floor].length).toBeGreaterThanOrEqual(1);
                expect(parsha[floor].length).toBeLessThanOrEqual(parsha.quotas[floor]);
            }
        }
    });

    it('сюжет на трёх языках близок к ёмкости этажа', () => {
        for (const parsha of PARSHIOT) {
            const slack = Math.max(4, Math.round(parsha.quotas.story * 0.25));
            for (const locale of LOCALES) {
                const words = countWords(parsha.story[locale].join(' '));
                expect(Math.abs(words - parsha.quotas.story)).toBeLessThanOrEqual(slack);
            }
        }
    });

    it('элементы сюжета — одинаковое число предложений на трёх языках', () => {
        for (const parsha of PARSHIOT) {
            const counts = LOCALES.map((locale) => splitSentences(parsha.story[locale]).length);
            expect(new Set(counts).size).toBe(1);
        }
    });

    it('плотнее — значит больше ёмкость: Ваякгель (повтор Трумы) меньше Ваеры', () => {
        const vayakhel = PARSHIOT.find((p) => p.slug === 'Vayakhel')!;
        const vayera = PARSHIOT.find((p) => p.slug === 'Vayera')!;
        expect(vayakhel.effective / vayakhel.raw).toBeLessThan(0.6);
        for (const floor of FLOORS) expect(vayakhel.quotas[floor]).toBeLessThan(vayera.quotas[floor]);
    });

    it('у каждого термина есть иврит и оба перевода', () => {
        for (const parsha of PARSHIOT) {
            expect(parsha.he.length).toBeGreaterThan(0);
            for (const floor of LIST_FLOORS) {
                for (const term of parsha[floor]) {
                    expect(term.every((part: string): boolean => part.length > 0)).toBe(true);
                }
            }
        }
    });
});

describe('размер глав', () => {
    it('места по размеру 1–54 без повторов; самая большая — Насо, самая маленькая — Ваелех', () => {
        const ranks = PARSHIOT.map((p: IParsha): number => p.sizeRank).toSorted((a, b) => a - b);
        expect(ranks).toEqual(Array.from({length: 54}, (_, i) => i + 1));
        expect(PARSHIOT.find((p) => p.sizeRank === 1)!.slug).toBe('Nasso');
        expect(PARSHIOT.find((p) => p.sizeRank === 54)!.slug).toBe('Vayeilech');
        expect(PARSHIOT.reduce((sum, p) => sum + p.verses, 0)).toBe(5846);
    });

    it('места по словам 1–54 без повторов; порядок отличается от порядка по стихам', () => {
        const ranks = PARSHIOT.map((p: IParsha): number => p.wordRank).toSorted((a, b) => a - b);
        expect(ranks).toEqual(Array.from({length: 54}, (_, i) => i + 1));
        expect(PARSHIOT.find((p) => p.wordRank === 1)!.slug).toBe('Nasso');
        expect(PARSHIOT.find((p) => p.wordRank === 2)!.slug).toBe('Vayera');
        expect(PARSHIOT.some((p) => p.wordRank !== p.sizeRank)).toBe(true);
    });

    it('места по буквам 1–54 без повторов; всего около 304 805 букв', () => {
        const ranks = PARSHIOT.map((p: IParsha): number => p.letterRank).toSorted((a, b) => a - b);
        expect(ranks).toEqual(Array.from({length: 54}, (_, i) => i + 1));
        const total = PARSHIOT.reduce((sum, p) => sum + p.letters, 0);
        expect(Math.abs(total - 304_805)).toBeLessThan(100);
        expect(PARSHIOT.find((p) => p.letterRank === 1)!.slug).toBe('Nasso');
    });
});

describe('BOOKS', () => {
    it('у книг буквальный перевод и охват глав и недельных глав', () => {
        expect(BOOKS[1]!.literal.ru).toBe('Имена');
        expect(BOOK_SPANS[0]).toEqual({firstChapter: 1, lastChapter: 50, firstOrdinal: 1, lastOrdinal: 12});
        expect(BOOK_SPANS[4]).toEqual({firstChapter: 1, lastChapter: 34, firstOrdinal: 44, lastOrdinal: 54});
    });
});

describe('origin', () => {
    it('у каждой главы есть стих названия внутри главы и пояснение на трёх языках', () => {
        for (const parsha of PARSHIOT) {
            const [chapter = 0, verse = 0] = parsha.origin.ref.split(':').map(Number);
            const at = chapter * 1000 + verse;
            const {from, to} = parsha.range;
            expect(at).toBeGreaterThanOrEqual(from.chapter * 1000 + from.verse);
            expect(at).toBeLessThanOrEqual(to.chapter * 1000 + to.verse);
            for (const locale of LOCALES) expect(parsha.origin.note[locale].length).toBeGreaterThan(10);
        }
    });
});
