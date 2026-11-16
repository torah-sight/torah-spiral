import type {IParsha} from '#src/content/model/types.ts';
import type {IToken} from '#src/domain/density/model/types.ts';
import {findTerm} from './findTerm.ts';
import {torahWords} from './torahSpelling.ts';

/** Индексы фраз каждой главы, которые дословно встречаются только в одной главе Торы. */
export const uniquePhrases = (parshiot: readonly IParsha[], byParsha: readonly (readonly IToken[])[]): number[][] =>
    parshiot.map((parsha: IParsha): number[] => {
        const unique: number[] = [];
        for (const [item, phrase] of parsha.phrases.entries()) {
            const words = torahWords(phrase[0]);
            let count = 0;
            for (const tokens of byParsha) if (findTerm(tokens, words, true)) count++;
            if (count === 1) unique.push(item);
        }
        return unique;
    });
