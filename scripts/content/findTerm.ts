import type {IToken} from '#src/domain/density/model/types.ts';

/** Сколько букв приставок допускается перед словом термина. */
const MAX_PREFIX = 2;

const wordMatches = (token: string, word: string, exact: boolean): boolean =>
    token === word || (!exact && token.endsWith(word) && token.length - word.length <= MAX_PREFIX);

/**
 * Ищет термин в словах главы.
 *
 * Фраза (`exact`) должна совпасть дословно; термин допускает приставки у каждого слова.
 */
export const findTerm = (tokens: readonly IToken[], words: readonly string[], exact: boolean): boolean => {
    if (words.length === 0) return false;
    for (let i = 0; i + words.length <= tokens.length; i++) {
        let all = true;
        for (const [k, word] of words.entries()) {
            if (!wordMatches(tokens[i + k]!.word, word, exact)) { all = false; break; }
        }
        if (all) return true;
    }
    return false;
};
