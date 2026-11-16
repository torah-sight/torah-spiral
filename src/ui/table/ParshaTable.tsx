import {ScopedAntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {navToken} from '#src/stores/nav/navToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {BookColumn} from './BookColumn.tsx';
import {BookHeader} from './BookHeader.tsx';
import {ParshaCell} from './ParshaCell.tsx';

const BOOK_INDEXES = [0, 1, 2, 3, 4];

const bySize = (a: IParsha, b: IParsha): number => a.sizeRank - b.sizeRank;

const byWords = (a: IParsha, b: IParsha): number => a.wordRank - b.wordRank;

/** Главы от самой большой к самой маленькой: по стихам и по словам. */
const BY_SIZE: readonly IParsha[] = PARSHIOT.toSorted(bySize);
const BY_WORDS: readonly IParsha[] = PARSHIOT.toSorted(byWords);
const byLetters = (a: IParsha, b: IParsha): number => a.letterRank - b.letterRank;
const BY_LETTERS: readonly IParsha[] = PARSHIOT.toSorted(byLetters);
const BY_MEASURE = {verses: BY_SIZE, words: BY_WORDS, letters: BY_LETTERS} as const;

const renderCell = (parsha: IParsha): ReactNode => <ParshaCell key={parsha.index} index={parsha.index} />;
const renderColumn = (book: number): ReactNode => <BookColumn key={book} book={book} />;
const renderLegend = (book: number): ReactNode => <BookHeader key={book} book={book} />;

/** Таблица 54 глав: сетка 6 × 9 (по порядку; в «размерах» — по стихам или словам) или 5 столбцов по книгам. */
export class ParshaTable extends ScopedAntiHookComponent {
    /** Таблица в выбранной раскладке. */
    public render(): ReactNode {
        const {layout, sizeBy} = this.useCarburetor(this.resolve(prefsToken));
        const {view} = this.useCarburetor(this.resolve(navToken));
        const sizes = view === 'sizes';
        if (!sizes && layout === 'books') {
            return (
                <div className="grid grid-cols-5 items-start gap-1.5 sm:gap-2">{BOOK_INDEXES.map(renderColumn)}</div>
            );
        }
        const order = sizes ? BY_MEASURE[sizeBy] ?? BY_SIZE : PARSHIOT;
        return (
            <div className="space-y-2 sm:space-y-3">
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">{BOOK_INDEXES.map(renderLegend)}</div>
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2">{order.map(renderCell)}</div>
            </div>
        );
    }
}
