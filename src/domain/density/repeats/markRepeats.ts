import type {IToken} from '#src/domain/density/model/types.ts';

/**
 * Помечает слова, покрытые шинглом, уже встречавшимся раньше в Торе.
 *
 * @returns индекс первого вхождения для каждого помеченного слова, иначе -1
 */
export const markRepeats = (tokens: readonly IToken[], shingle: number): Int32Array => {
    const marks = new Int32Array(tokens.length).fill(-1);
    const seen = new Map<string, number>();
    for (let i = 0; i + shingle <= tokens.length; i++) {
        let key = '';
        for (let k = 0; k < shingle; k++) key += `${tokens[i + k]!.word} `;
        const first = seen.get(key);
        if (first === undefined) {
            seen.set(key, i);
            continue;
        }
        for (let k = 0; k < shingle; k++) {
            if (marks[i + k] === -1) marks[i + k] = first + k;
        }
    }
    return marks;
};
