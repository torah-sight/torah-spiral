import type {IParsha} from '#src/content/model/types.ts';
import type {Measure} from '#src/i18n/format/size/units.ts';

/** Размер главы в мере и её место по этой мере. */
export interface IMeasure {
    count: number;
    rank: number;
}

/** Сколько в главе по мере (стихов, слов, букв, заповедей или раз стоит Имя) и её место по ней. */
export const measure = (parsha: IParsha, unit: Measure): IMeasure => {
    if (unit === 'verses') return {count: parsha.verses, rank: parsha.sizeRank};
    if (unit === 'words') return {count: parsha.raw, rank: parsha.wordRank};
    if (unit === 'letters') return {count: parsha.letters, rank: parsha.letterRank};
    if (unit === 'mitzvot' || unit === 'positive' || unit === 'negative') {
        return {count: parsha.mitzvot[unit], rank: parsha.mitzvaRanks[unit]};
    }
    return {count: parsha.holy[unit], rank: parsha.holyRanks[unit]};
};
