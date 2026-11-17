import {describe, expect, it} from '@rstest/core';
import names from '#src/content/generated/names.json' with {type: 'json'};
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {maskVerse} from '#src/domain/names/maskVerse.ts';
import {NAME_KEYS} from '#src/domain/names/nameKeys.ts';
import {nameOf} from '#src/domain/names/nameOf.ts';
import {specialHe} from '#src/domain/names/specialHe.ts';

describe('nameOf', () => {
    it('узнаёт Имена по буквам и огласовке', () => {
        expect(nameOf('יְהֹוָה')).toBe('havaya');
        expect(nameOf('לַיהֹוָה')).toBe('havaya');
        expect(nameOf('יֱהֹוִה')).toBe('havaya');
        expect(nameOf('אֱלֹהֶיךָ')).toBe('elokim');
        expect(nameOf('וֵאלֹהֵי')).toBe('elokim');
        expect(nameOf('אֵל')).toBe('el');
        expect(nameOf('אֵלִי')).toBe('el');
        expect(nameOf('אֲדֹנָי')).toBe('adnut');
        expect(nameOf('שַׁדַּי')).toBe('shakai');
        expect(nameOf('אֱלוֹהַּ')).toBe('eloah');
        expect(nameOf('יָהּ')).toBe('yah');
        expect(nameOf('אֶהְיֶה')).toBe('ehyeh');
    });

    it('не путает Имена с похожими словами', () => {
        expect(nameOf('אֶל')).toBeNull();
        expect(nameOf('אַל')).toBeNull();
        expect(nameOf('אֵלַי')).toBeNull();
        expect(nameOf('אֵלֶּה')).toBeNull();
        expect(nameOf('אֲלֵהֶם')).toBeNull();
        expect(nameOf('אֲדֹנִי')).toBeNull();
        expect(nameOf('אֲדֹנַי')).toBeNull();
        expect(nameOf('שָׂדָי')).toBeNull();
        expect(nameOf('מַהֲלַלְאֵל')).toBeNull();
    });
});

describe('maskVerse', () => {
    it('снимает разметку MAM, кантилляцию и кетив, делит по макафу и пасеку', () => {
        const verse = 'שְׁמַ֖<big>ע</big> יְהֹוָ֥ה&thinsp;<small>׀</small>&thinsp;אֶחָֽ<big>ד</big>׃ כִּֽי־יָד֙ '
            + '<span class="mam-kq"><span class="mam-kq-k">(הוצא)</span> <span class="mam-kq-q">[הַיְצֵ֣א]</span></span>'
            + '&nbsp;<span class="mam-spi-pe">{פ}</span>';
        expect(maskVerse(verse)).toEqual(['שְׁמַע', 'יְהֹוָה', 'אֶחָד', 'כִּי', 'יָד', 'הַיְצֵא']);
    });
});

describe('specialHe', () => {
    it('считает маленькую и большую ה, но не другие буквы и не сноски', () => {
        expect(specialHe('בְּ<small>הִ</small>בָּֽרְאָ֑ם')).toBe(1);
        expect(specialHe('<big>הַ</big> לְיְהֹוָה֙<i class="footnote">(<big>הַֽ</big>לְיהֹוָה֙)</i>')).toBe(1);
        expect(specialHe('<big>בְּ</big>רֵאשִׁ֖ית')).toBe(0);
    });
});

describe('names.json', () => {
    it('по каждому Имени 54 главы; четырёхбуквенное Имя — 1820 раз, нет его только в Микец и Ваигаш', () => {
        for (const key of NAME_KEYS) expect(names[key]).toHaveLength(54);
        expect(names.havaya.reduce((a: number, b: number): number => a + b, 0)).toBe(1820);
        expect(names.he.reduce((a: number, b: number): number => a + b, 0)).toBe(2);
        expect(names.havaya.flatMap((n: number, i: number): number[] => (n === 0 ? [i + 1] : []))).toEqual([10, 11]);
    });

    it('«Все Имена» — сумма семи Имён без особой ה; место 1 у самой богатой Именами главы', () => {
        for (const parsha of PARSHIOT) {
            const seven = NAME_KEYS.filter((key) => key !== 'he').reduce((sum, key) => sum + parsha.holy[key], 0);
            expect(parsha.holyAll).toBe(seven);
        }
        expect(PARSHIOT.reduce((sum: number, parsha: IParsha): number => sum + parsha.holyAll, 0)).toBe(2633);
        const top = Math.max(...PARSHIOT.map((parsha: IParsha): number => parsha.holyAll));
        for (const parsha of PARSHIOT) expect(parsha.holyAllRank === 1).toBe(parsha.holyAll === top);
    });
});

describe('mitzvot', () => {
    it('по «Сефер а-Хинух»: 248 повелевающих и 365 запрещающих, больше всех — Ки Теце', () => {
        let positive = 0;
        let negative = 0;
        for (const parsha of PARSHIOT) {
            positive += parsha.mitzvot.positive;
            negative += parsha.mitzvot.negative;
            expect(parsha.mitzvot.mitzvot).toBe(parsha.mitzvot.positive + parsha.mitzvot.negative);
        }
        expect([positive, negative]).toEqual([248, 365]);
        const top = PARSHIOT.find((parsha: IParsha): boolean => parsha.mitzvaRanks.mitzvot === 1);
        expect(top?.slug).toBe('Ki Teitzei');
        expect(top?.mitzvot).toEqual({mitzvot: 74, positive: 27, negative: 47});
    });
});
