/** Глава и стих. */
export interface IChapterVerse {
    chapter: number;
    verse: number;
}

/** Диапазон стихов внутри одной книги. */
export interface IVerseRange {
    from: IChapterVerse;
    to: IChapterVerse;
}

/** «Genesis 1:1-6:8» или «Genesis 1:1-8» → диапазон стихов. */
export const parseRef = (ref: string): IVerseRange => {
    const match = /(\d+):(\d+)-(?:(\d+):)?(\d+)$/.exec(ref);
    if (!match) throw new Error(`bad ref ${ref}`);
    const [, c1, v1, c2, v2] = match;
    return {
        from: {chapter: Number(c1), verse: Number(v1)},
        to: {chapter: Number(c2 ?? c1), verse: Number(v2)}
    };
};
