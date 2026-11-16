import type {IScan, IVerse} from '#src/domain/density/model/types.ts';

/** Сумма IDF основ стиха, найденных в `known`. */
export const coverage = (scan: IScan, verse: IVerse, known: ReadonlySet<string>): number => {
    let score = 0;
    for (const word of verse.unique) if (known.has(word)) score += scan.idf(word);
    return score;
};
