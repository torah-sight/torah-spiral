import {KNOWN_REPEATS} from '#src/domain/density/known/knownRepeats.ts';
import type {IKnownRepeat, IParshaDensity, IRepeatOptions, IToken} from '#src/domain/density/model/types.ts';
import {markParaphrases} from '#src/domain/density/paraphrase/markParaphrases.ts';
import {collectSpans} from './collectSpans.ts';
import {markRepeats} from './markRepeats.ts';
import {DEFAULT_REPEAT_OPTIONS} from './defaultRepeatOptions.ts';

/**
 * Объём каждой главы до и после свёртки повторов.
 *
 * Повтор — слово под дословным шинглом или совпавшее слово стиха-пересказа.
 */
export const measureParshiot = (
    tokens: readonly IToken[],
    parshaCount: number,
    options: IRepeatOptions = DEFAULT_REPEAT_OPTIONS,
    known: readonly IKnownRepeat[] = KNOWN_REPEATS
): IParshaDensity[] => {
    const marks = markRepeats(tokens, options.shingle);
    const paraphrased = markParaphrases(tokens, known, options.paraphrase);
    for (const [i, source] of paraphrased.entries()) if (marks[i] === -1) marks[i] = source;
    const result: IParshaDensity[] = [];
    let i = 0;
    for (let p = 0; p < parshaCount; p++) {
        const start = i;
        let effective = 0;
        while (i < tokens.length && tokens[i]!.parsha === p) {
            if (marks[i] === -1) effective++;
            i++;
        }
        result.push({raw: i - start, effective, spans: collectSpans(tokens, marks, [start, i], options)});
    }
    return result;
};
