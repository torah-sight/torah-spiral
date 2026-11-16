import type {IVerse} from '#src/domain/density/model/types.ts';

/** IDF основы по стихам: редкие основы весят больше частых. */
export const buildIdf = (verses: readonly IVerse[]): ((word: string) => number) => {
    const df = new Map<string, number>();
    for (const verse of verses) for (const word of verse.unique) df.set(word, (df.get(word) ?? 0) + 1);
    return (word: string): number => Math.log(verses.length / (df.get(word) ?? 1));
};
