import type {IVerse} from '#src/domain/density/model/types.ts';

const indexOfRef = (verses: readonly IVerse[], book: number, cv: string): number => {
    const [chapter, verse] = cv.split(':').map(Number);
    const at = verses.findIndex(
        (v: IVerse): boolean => v.ref.book === book && v.ref.chapter === chapter && v.ref.verse === verse
    );
    if (at < 0) throw new Error(`unknown ref ${book} ${cv}`);
    return at;
};

/** Диапазон «гл:ст-гл:ст» книги → полуинтервал индексов стихов. */
export const rangeOf = (verses: readonly IVerse[], [book, range]: readonly [number, string]): [number, number] => {
    const [from, to] = range.split('-') as [string, string];
    return [indexOfRef(verses, book, from), indexOfRef(verses, book, to) + 1];
};
