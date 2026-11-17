import {AntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import type {Layout} from '#src/stores/prefs/PrefsStore.ts';
import {BookHeader} from './BookHeader.tsx';
import {ParshaCell} from './ParshaCell.tsx';

/** Свойства таблицы раунда. */
export interface IRoundTableProps {
    /** Какие книги показать. */
    books: readonly boolean[];
    layout: Layout;
}

const BOOK_INDEXES = [0, 1, 2, 3, 4];

/** Число столбцов «по книгам» — литералы, чтобы Tailwind их нашёл. */
const COLUMNS = ['', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5'];

const CELLS = 'grid auto-rows-fr gap-1.5 sm:gap-2';

/** Номера выбранных книг по порядку. */
const pickedOf = (books: readonly boolean[]): number[] => {
    const out: number[] = [];
    for (const book of BOOK_INDEXES) if (books[book] === true) out.push(book);
    return out;
};

const ofBook = (book: number): IParsha[] => PARSHIOT.filter((parsha: IParsha): boolean => parsha.book === book);

const BY_BOOK: readonly IParsha[][] = BOOK_INDEXES.map(ofBook);

const renderCell = (parsha: IParsha): ReactNode => <ParshaCell key={parsha.index} index={parsha.index} />;

const renderLegend = (book: number): ReactNode => <BookHeader key={book} book={book} compact={false} />;

/** Двойная тонкая линия, гаснущая к краям: отделяет строку книг от глав. */
const BOOK_RULE: ReactNode = (
    <div aria-hidden className="space-y-[3px] px-2 py-1">
        <div className="h-px bg-gradient-to-r from-transparent via-stone-600 to-transparent dark:via-white/60" />
        <div className="h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent dark:via-white/35" />
    </div>
);

/** Книга раунда в сетке 6 × 9: заголовок и её главы подряд, с первой клетки. */
const renderSection = (book: number): ReactNode => (
    <section key={book} className="space-y-1.5 sm:space-y-2">
        <BookHeader book={book} compact />
        <div className={`${CELLS} grid-cols-6`}>{BY_BOOK[book]!.map(renderCell)}</div>
    </section>
);

/** Главы выбранных книг по столбцам: столбец — место книги среди выбранных, строка — порядок в книге. */
const placedCells = (picked: readonly number[]): ReactNode[] => {
    const out: ReactNode[] = [];
    for (const [column, book] of picked.entries()) {
        for (const [row, parsha] of BY_BOOK[book]!.entries()) {
            out.push(
                <div key={parsha.index} style={{gridColumn: column + 1, gridRow: row + 1}} className="grid min-w-0">
                    <ParshaCell index={parsha.index} />
                </div>
            );
        }
    }
    return out;
};

/**
 * Таблица по книгам: только главы выбранных книг, без пустых мест, справа налево, с заголовками книг.
 *
 * Раунд игры не на всю Тору и «Обзор глав» в раскладке 6 × 9.
 */
export class RoundTable extends AntiHookComponent<IRoundTableProps> {
    /** Секции по книгам или столбцы выбранных книг. */
    public render(): ReactNode {
        const {books, layout} = this.props;
        const picked = pickedOf(books);
        if (layout !== 'books') {
            return <div dir="rtl" className="space-y-3 sm:space-y-4">{picked.map(renderSection)}</div>;
        }
        const columns = COLUMNS[picked.length]!;
        return (
            <div dir="rtl" className="space-y-2 sm:space-y-3">
                <div className={`grid gap-1.5 sm:gap-2 ${columns}`}>{picked.map(renderLegend)}</div>
                {BOOK_RULE}
                <div className={`${CELLS} ${columns}`}>{placedCells(picked)}</div>
            </div>
        );
    }
}
