import {ScopedAntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {navToken} from '#src/stores/nav/navToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {BookHeader} from './BookHeader.tsx';
import {ParshaCell} from './ParshaCell.tsx';
import {RoundTable} from './RoundTable.tsx';

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

/** Место главы в раскладке «по книгам»: столбец книги, строка — порядок внутри книги. */
const placeOf = (parsha: IParsha): {gridColumn: number; gridRow: number} => ({
    gridColumn: parsha.book + 1,
    gridRow: parsha.index - PARSHIOT.findIndex((first: IParsha): boolean => first.book === parsha.book) + 1
});

/** Клетка в своём столбце книги; обёртка-сетка растягивает клетку на всю строку. */
const renderPlaced = (parsha: IParsha): ReactNode => (
    <div key={parsha.index} style={placeOf(parsha)} className="grid min-w-0">
        <ParshaCell index={parsha.index} />
    </div>
);
const renderLegend = (book: number): ReactNode => <BookHeader key={book} book={book} />;

/** Ряды одной высоты — по самой большой клетке: высота не прыгает от содержимого. */
const CELLS = 'grid auto-rows-fr gap-1.5 sm:gap-2';

/** Таблица 54 глав: сетка 6 × 9 (по порядку; в «размерах» — по стихам или словам) или 5 столбцов по книгам. */
export class ParshaTable extends ScopedAntiHookComponent {
    /** Таблица в выбранной раскладке. */
    public render(): ReactNode {
        const {layout, sizeBy} = this.useCarburetor(this.resolve(prefsToken));
        const {view} = this.useCarburetor(this.resolve(navToken));
        const sizes = view === 'sizes';
        const game = this.useCarburetor(this.resolve(gameToken));
        const inRound = view === 'game' && (game.status === 'playing' || game.status === 'done');
        // Раунд не на всю Тору — только его главы, без пустых мест.
        if (inRound && !game.setup.books.every(Boolean)) return <RoundTable books={game.setup.books} layout={layout} />;
        const books = !sizes && layout === 'books';
        const order = sizes ? BY_MEASURE[sizeBy] ?? BY_SIZE : PARSHIOT;
        return (
            // Главы и книги идут справа налево, как в свитке, при любом языке интерфейса.
            <div dir="rtl" className="space-y-2 sm:space-y-3">
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">{BOOK_INDEXES.map(renderLegend)}</div>
                {books
                    ? <div className={`${CELLS} grid-cols-5`}>{PARSHIOT.map(renderPlaced)}</div>
                    : <div className={`${CELLS} grid-cols-6`}>{order.map(renderCell)}</div>}
            </div>
        );
    }
}
