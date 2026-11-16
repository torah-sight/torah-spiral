import type {IBest, IKnownRepeat, IScan, IVerse} from '#src/domain/density/model/types.ts';
import {applyWindow} from '#src/domain/density/paraphrase/window/applyWindow.ts';
import {coverage} from '#src/domain/density/paraphrase/window/coverage.ts';
import {windowWords} from '#src/domain/density/paraphrase/window/windowWords.ts';
import {rangeOf} from './rangeOf.ts';

interface IFound extends IBest {
    end: number;
}

const bestInSources = (scan: IScan, verse: IVerse, v: number, sources: readonly [number, number][]): IFound => {
    let best: IFound = {start: -1, score: 0, end: 0};
    for (const [from, to] of sources) {
        const limit = Math.min(to, v);
        for (let start = from; start < limit; start++) {
            const end = Math.min(start + scan.options.window, limit);
            const score = coverage(scan, verse, windowWords(scan, start, end));
            if (score > best.score) best = {start, score, end};
        }
    }
    return best;
};

/** Курируемые пары: стих пересказа сравнивается только со своим источником. */
export const scanKnown = (scan: IScan, known: readonly IKnownRepeat[]): void => {
    for (const pair of known) {
        const [from, to] = rangeOf(scan.verses, pair.target);
        const sources = pair.sources.map((source): [number, number] => rangeOf(scan.verses, source));
        for (let v = from; v < to; v++) {
            const verse = scan.verses[v]!;
            if (verse.words.length < scan.options.minWords) continue;
            const best = bestInSources(scan, verse, v, sources);
            applyWindow(scan, verse, best, best.end, scan.options.knownThreshold);
        }
    }
};
