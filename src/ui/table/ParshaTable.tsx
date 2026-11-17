import {ScopedAntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import type {Measure} from '#src/i18n/format/size/units.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {navToken} from '#src/stores/nav/navToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {BookHeader} from './BookHeader.tsx';
import {ParshaCell} from './ParshaCell.tsx';
import {RoundTable} from './RoundTable.tsx';
import {measure} from './size/measure.ts';
import {MEASURES} from './size/measures.ts';

const BOOK_INDEXES = [0, 1, 2, 3, 4];

const ALL_BOOKS: readonly boolean[] = [true, true, true, true, true];

/** Главы по мере: от первого места к последнему, равные — в порядке Торы. */
const orderBy = (unit: Measure): [Measure, readonly IParsha[]] => {
    const byRank = (a: IParsha, b: IParsha): number =>
        measure(a, unit).rank - measure(b, unit).rank || a.index - b.index;
    return [unit, PARSHIOT.toSorted(byRank)];
};

/** Топ меры: главы, где Имя не стоит ни разу, в топ не входят. */
const topOf = (unit: Measure): [Measure, readonly IParsha[]] => {
    const [, order] = orderBy(unit);
    return [unit, order.filter((parsha: IParsha): boolean => measure(parsha, unit).count > 0)];
};

const BY_MEASURE = Object.fromEntries(MEASURES.map(topOf)) as Record<Measure, readonly IParsha[]>;

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
        // Обзор 6 × 9: каждая книга со своим заголовком, её главы — с первой клетки справа.
        if (view === 'overview' && layout !== 'books') return <RoundTable books={ALL_BOOKS} layout="grid" />;
        const books = !sizes && layout === 'books';
        const order = sizes ? BY_MEASURE[sizeBy] ?? BY_MEASURE.verses : PARSHIOT;
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
