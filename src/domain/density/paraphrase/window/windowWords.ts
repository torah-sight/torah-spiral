import type {IScan, IVerse} from '#src/domain/density/model/types.ts';

const stemsOf = (verse: IVerse): string[] => verse.stems;

/** Множество основ стихов `[start, end)`. */
export const windowWords = (scan: IScan, start: number, end: number): Set<string> =>
    new Set(scan.verses.slice(start, end).flatMap(stemsOf));
