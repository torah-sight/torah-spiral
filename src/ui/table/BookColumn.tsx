import {AntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {BookHeader} from './BookHeader.tsx';
import {ParshaCell} from './ParshaCell.tsx';

/** Свойства столбца книги. */
export interface IBookColumnProps {
    book: number;
}

const renderCell = (parsha: IParsha): ReactNode => <ParshaCell key={parsha.index} index={parsha.index} />;

const ofBook = (book: number): IParsha[] => PARSHIOT.filter((parsha: IParsha): boolean => parsha.book === book);

const BY_BOOK: readonly IParsha[][] = [0, 1, 2, 3, 4].map(ofBook);

/** Столбец одной книги: заголовок и её недельные главы сверху вниз. */
export class BookColumn extends AntiHookComponent<IBookColumnProps> {
    /** Заголовок и клетки. */
    public render(): ReactNode {
        const {book} = this.props;
        return (
            <section className="flex min-w-0 flex-col gap-1.5 sm:gap-2">
                <BookHeader book={book} />
                {BY_BOOK[book]!.map(renderCell)}
            </section>
        );
    }
}
