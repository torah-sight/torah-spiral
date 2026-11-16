import type {IBest, IScan, IVerse} from '#src/domain/density/model/types.ts';
import {applyWindow} from '#src/domain/density/paraphrase/window/applyWindow.ts';

type Postings = Map<string, number[]>;

const scoreWindows = (scan: IScan, verse: IVerse, index: number, postings: Postings): IBest => {
    const size = scan.options.window;
    const scores = new Map<number, number>();
    for (const word of verse.unique) {
        const starts = new Set<number>();
        for (const at of postings.get(word) ?? []) {
            for (let s = Math.max(0, at - size + 1); s <= at && s + size <= index; s++) starts.add(s);
        }
        for (const s of starts) scores.set(s, (scores.get(s) ?? 0) + scan.idf(word));
    }
    let best: IBest = {start: -1, score: 0};
    for (const [start, score] of scores) if (score > best.score) best = {start, score};
    return best;
};

const index = (postings: Postings, verse: IVerse, at: number): void => {
    for (const word of verse.unique) {
        const list = postings.get(word);
        if (list) list.push(at); else postings.set(word, [at]);
    }
};

/** Общий поиск пересказов по всей предшествующей Торе через инвертированный индекс. */
export const scanAll = (scan: IScan): void => {
    const postings: Postings = new Map();
    for (const [at, verse] of scan.verses.entries()) {
        if (verse.words.length >= scan.options.minWords) {
            const best = scoreWindows(scan, verse, at, postings);
            applyWindow(scan, verse, best, best.start + scan.options.window, scan.options.threshold);
        }
        index(postings, verse, at);
    }
};
