import type {IBest, IScan, IVerse} from '#src/domain/density/model/types.ts';
import {windowWords} from './windowWords.ts';

/**
 * Помечает слова стиха, найденные в окне `[best.start, end)`.
 *
 * Срабатывает, только если окно покрывает не меньше `threshold` IDF-веса стиха.
 */
export const applyWindow = (scan: IScan, verse: IVerse, best: IBest, end: number, threshold: number): void => {
    let total = 0;
    for (const word of verse.unique) total += scan.idf(word);
    if (best.start < 0 || total <= 0 || best.score / total < threshold) return;
    const known = windowWords(scan, best.start, end);
    const source = scan.verses[best.start]!.start;
    for (const [k, word] of verse.stems.entries()) {
        if (known.has(word) && scan.marks[verse.start + k] === -1) scan.marks[verse.start + k] = source;
    }
};
