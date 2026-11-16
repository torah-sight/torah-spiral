import type {IBookSpan, IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';

const spanOf = (book: number): IBookSpan => {
    const own = PARSHIOT.filter((parsha: IParsha): boolean => parsha.book === book);
    const first = own[0]!;
    const last = own.at(-1)!;
    return {
        firstChapter: first.range.from.chapter,
        lastChapter: last.range.to.chapter,
        firstOrdinal: first.ordinal,
        lastOrdinal: last.ordinal
    };
};

/** Охват каждой из пяти книг: главы 1–50, недельные 1–12 и т. д. */
export const BOOK_SPANS: readonly IBookSpan[] = [0, 1, 2, 3, 4].map(spanOf);
