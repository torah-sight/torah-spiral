import {describe, expect, it} from '@rstest/core';
import type {IToken} from '#src/domain/density/model/types.ts';
import {DEFAULT_REPEAT_OPTIONS} from '#src/domain/density/repeats/defaultRepeatOptions.ts';
import {computeQuotas} from '#src/domain/density/quotas/computeQuotas.ts';
import {FLOOR_RATE} from '#src/domain/density/quotas/floorRate.ts';
import {measureParshiot} from '#src/domain/density/repeats/measureParshiot.ts';
import {markRepeats} from '#src/domain/density/repeats/markRepeats.ts';
import {normalizeVerse} from '#src/domain/density/text/normalizeVerse.ts';
import {stem} from '#src/domain/density/text/stem.ts';
import {formatRange} from '#src/domain/ranges/formatRange.ts';
import {parseRef} from '#src/domain/ranges/parseRef.ts';

/** Слова в одной главе, каждый стих — отдельный номер. */
const tokensOf = (words: readonly string[], parsha = 0): IToken[] =>
    words.map((word: string, i: number): IToken => ({word, parsha, ref: {book: 3, chapter: 1, verse: i + 1}}));

describe('normalizeVerse', () => {
    it('убирает огласовки, кри и макаф, конечные буквы делает обычными', () => {
        expect(normalizeVerse('בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים')).toEqual(['בראשית', 'ברא', 'אלהימ']);
        expect(normalizeVerse('הוצא [היצא] אתך')).toEqual(['הוצא', 'אתכ']);
        expect(normalizeVerse('לֶךְ־לְךָ')).toEqual(['לכ', 'לכ']);
    });
});

describe('stem', () => {
    it('снимает до двух приставок, оставляя больше трёх букв', () => {
        expect(stem('והמזבח')).toBe('מזבח');
        expect(stem('אור')).toBe('אור');
    });
});

describe('markRepeats', () => {
    it('помечает дословный повтор шингла и не трогает первое вхождение', () => {
        const words = ['א1', 'ב1', 'ג1', 'ד1', 'ה1', 'ז', 'א1', 'ב1', 'ג1', 'ד1', 'ה1'];
        const marks = markRepeats(tokensOf(words), 5);
        expect(Array.from(marks.subarray(0, 6))).toEqual([-1, -1, -1, -1, -1, -1]);
        expect(Array.from(marks.subarray(6))).toEqual([0, 1, 2, 3, 4]);
    });

    it('без повторов ничего не помечает', () => {
        const marks = markRepeats(tokensOf(['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז']), 5);
        expect(marks.every((mark: number): boolean => mark === -1)).toBe(true);
    });
});

describe('measureParshiot', () => {
    it('12 одинаковых блоков дают объём одного блока плюс новые слова', () => {
        const block = ['קרבנו', 'קערת', 'כסף', 'אחת', 'שלשים', 'ומאה', 'משקלה', 'מזרק', 'אחד', 'כסף'];
        const words: string[] = [];
        for (let day = 0; day < 12; day++) words.push(`נשיא${day}`, ...block);
        const [only] = measureParshiot(tokensOf(words), 1, DEFAULT_REPEAT_OPTIONS, []);
        expect(only!.raw).toBe(12 * 11);
        expect(only!.effective).toBeLessThan(block.length + 12 + 5);
        expect(only!.effective).toBeGreaterThanOrEqual(block.length);
    });
});

describe('computeQuotas', () => {
    it('ёмкость пропорциональна объёму без повторов, минимум 1', () => {
        const [small, mean, big] = computeQuotas([100, 1000, 1900]);
        expect(mean!.names).toBe(FLOOR_RATE.names);
        expect(big!.keywords).toBeGreaterThan(mean!.keywords);
        expect(small!.phrases).toBe(1);
        expect(small!.story).toBeGreaterThanOrEqual(1);
    });
});

describe('ranges', () => {
    it('разбирает и форматирует диапазоны стихов', () => {
        expect(parseRef('Genesis 1:1-6:8')).toEqual({from: {chapter: 1, verse: 1}, to: {chapter: 6, verse: 8}});
        expect(parseRef('Exodus 30:11-34:35').to.chapter).toBe(34);
        expect(formatRange(parseRef('Deuteronomy 33:1-34:12'))).toBe('33:1–34:12');
        expect(() => parseRef('nonsense')).toThrow();
    });
});
