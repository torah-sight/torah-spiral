import type {IRepeatOptions, IRepeatSpan, IToken} from '#src/domain/density/model/types.ts';

const byWordsDesc = (a: IRepeatSpan, b: IRepeatSpan): number => b.words - a.words;

/** Сливает помеченные слова `[start, end)` в участки отчёта, самые длинные — первыми. */
export const collectSpans = (
    tokens: readonly IToken[],
    marks: Int32Array,
    [start, end]: readonly [number, number],
    options: IRepeatOptions
): IRepeatSpan[] => {
    const spans: IRepeatSpan[] = [];
    let i = start;
    while (i < end) {
        if (marks[i] === -1) { i++; continue; }
        const head = i;
        let last = i;
        let words = 0;
        while (i < end && i - last <= options.gap) {
            if (marks[i] !== -1) { last = i; words++; }
            i++;
        }
        if (words >= options.reportMin) {
            spans.push({from: tokens[head]!.ref, to: tokens[last]!.ref, words, source: tokens[marks[head]!]!.ref});
        }
        i = last + 1;
    }
    return spans.toSorted(byWordsDesc);
};
