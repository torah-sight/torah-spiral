import density from '#src/content/density.json' with {type: 'json'};
import {DEUTERONOMY} from '#src/content/books/deuteronomy.ts';
import {EXODUS} from '#src/content/books/exodus.ts';
import {GENESIS} from '#src/content/books/genesis.ts';
import {LEVITICUS} from '#src/content/books/leviticus.ts';
import {NUMBERS} from '#src/content/books/numbers.ts';
import type {IOrigin, IParsha, IParshaText} from '#src/content/model/types.ts';
import {DEUTERONOMY_ORIGINS} from '#src/content/origins/deuteronomy.ts';
import {EXODUS_ORIGINS} from '#src/content/origins/exodus.ts';
import {GENESIS_ORIGINS} from '#src/content/origins/genesis.ts';
import {LEVITICUS_ORIGINS} from '#src/content/origins/leviticus.ts';
import {NUMBERS_ORIGINS} from '#src/content/origins/numbers.ts';
import type {IRepeatSpan} from '#src/domain/density/model/types.ts';
import {computeQuotas} from '#src/domain/density/quotas/computeQuotas.ts';
import {parseRef} from '#src/domain/ranges/parseRef.ts';

interface IDensityRow {
    slug: string;
    book: number;
    ref: string;
    verses: number;
    letters: number;
    raw: number;
    effective: number;
    spans: IRepeatSpan[];
}

const ROWS: readonly IDensityRow[] = density.parshiot;
const TEXTS: readonly IParshaText[] = [...GENESIS, ...EXODUS, ...LEVITICUS, ...NUMBERS, ...DEUTERONOMY];
const ORIGINS: readonly IOrigin[] = [
    ...GENESIS_ORIGINS, ...EXODUS_ORIGINS, ...LEVITICUS_ORIGINS, ...NUMBERS_ORIGINS, ...DEUTERONOMY_ORIGINS
];
const effectiveOf = (row: IDensityRow): number => row.effective;
const QUOTAS = computeQuotas(ROWS.map(effectiveOf));
const bySizeDesc = (a: IDensityRow, b: IDensityRow): number => b.verses - a.verses || b.raw - a.raw;
const SIZE_ORDER = ROWS.toSorted(bySizeDesc);
const byWordsDesc = (a: IDensityRow, b: IDensityRow): number => b.raw - a.raw || b.verses - a.verses;
const WORD_ORDER = ROWS.toSorted(byWordsDesc);
const byLettersDesc = (a: IDensityRow, b: IDensityRow): number => b.letters - a.letters || b.raw - a.raw;
const LETTER_ORDER = ROWS.toSorted(byLettersDesc);

const assemble = (row: IDensityRow, index: number): IParsha => {
    const text = TEXTS[index];
    const origin = ORIGINS[index];
    if (text?.slug !== row.slug || origin?.slug !== row.slug) {
        throw new Error(`content order mismatch at ${index}: ${row.slug}`);
    }
    const sizeRank = SIZE_ORDER.indexOf(row) + 1;
    const wordRank = WORD_ORDER.indexOf(row) + 1;
    const letterRank = LETTER_ORDER.indexOf(row) + 1;
    const ranks = {sizeRank, wordRank, letterRank};
    const place = {index, ordinal: index + 1, range: parseRef(row.ref)};
    return {...text, ...row, ...ranks, ...place, quotas: QUOTAS[index]!, origin};
};

/** 54 недельные главы: контент, плотность, ёмкость этажей, диапазоны. */
export const PARSHIOT: readonly IParsha[] = ROWS.map(assemble);
