import {AntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {BookHeader} from './BookHeader.tsx';
import {ParshaCell} from './ParshaCell.tsx';

/** Свойства таблицы по книгам. */
export interface IRoundTableProps {
    /** Какие книги показать. */
    books: readonly boolean[];
}

const BOOK_INDEXES = [0, 1, 2, 3, 4];

/** Номера выбранных книг по порядку. */
const pickedOf = (books: readonly boolean[]): number[] => {
    const out: number[] = [];
    for (const book of BOOK_INDEXES) if (books[book] === true) out.push(book);
    return out;
};

const ofBook = (book: number): IParsha[] => PARSHIOT.filter((parsha: IParsha): boolean => parsha.book === book);

const BY_BOOK: readonly IParsha[][] = BOOK_INDEXES.map(ofBook);

const renderCell = (parsha: IParsha): ReactNode => <ParshaCell key={parsha.index} index={parsha.index} />;

/** Книга: заголовок и её главы подряд, с первой клетки. */
const renderSection = (book: number): ReactNode => (
    <section key={book} className="round-section">
        <BookHeader book={book} compact />
        <div className="cells-grid">{BY_BOOK[book]!.map(renderCell)}</div>
    </section>
);

/**
 * Таблица по книгам: только главы выбранных книг, без пустых мест, справа налево, у каждой книги свой заголовок.
 *
 * «Обзор глав» и раунд игры не на всю Тору.
 */
export class RoundTable extends AntiHookComponent<IRoundTableProps> {
    /** Секции выбранных книг. */
    public render(): ReactNode {
        return <div dir="rtl" className="round-table">{pickedOf(this.props.books).map(renderSection)}</div>;
    }
}
