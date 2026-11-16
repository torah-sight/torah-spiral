import type {IToken, IVerse, IVerseRef} from '#src/domain/density/model/types.ts';
import {stem} from '#src/domain/density/text/stem.ts';

const sameRef = (a: IVerseRef, b: IVerseRef): boolean =>
    a.book === b.book && a.chapter === b.chapter && a.verse === b.verse;

const fillUnique = (verse: IVerse): void => {
    verse.unique = [...new Set(verse.stems)];
};

/** Группирует слова по стихам, считает основы и множество уникальных основ. */
export const groupVerses = (tokens: readonly IToken[]): IVerse[] => {
    const verses: IVerse[] = [];
    let current: IVerse | undefined;
    for (const [i, token] of tokens.entries()) {
        if (!current || !sameRef(current.ref, token.ref)) {
            current = {start: i, ref: token.ref, words: [], stems: [], unique: []};
            verses.push(current);
        }
        current.words.push(token.word);
        current.stems.push(stem(token.word));
    }
    verses.forEach(fillUnique);
    return verses;
};
