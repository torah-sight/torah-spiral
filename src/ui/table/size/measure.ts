import type {IParsha} from '#src/content/model/types.ts';
import type {SizeUnit} from '#src/i18n/format/size/units.ts';

/** Размер главы в мере и её место по этой мере. */
export interface IMeasure {
    count: number;
    rank: number;
}

/** Размер главы в выбранной мере и её место по ней. */
export const measure = (parsha: IParsha, unit: SizeUnit): IMeasure => {
    if (unit === 'words') return {count: parsha.raw, rank: parsha.wordRank};
    if (unit === 'letters') return {count: parsha.letters, rank: parsha.letterRank};
    return {count: parsha.verses, rank: parsha.sizeRank};
};
