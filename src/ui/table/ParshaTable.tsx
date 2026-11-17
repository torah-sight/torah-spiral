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

const renderLegend = (book: number): ReactNode => <BookHeader key={book} book={book} compact={false} />;

/** Двойная тонкая линия, гаснущая к краям: отделяет строку книг от глав. */
const BOOK_RULE: ReactNode = (
    <div aria-hidden className="book-rule">
        <div className="book-rule-strong" />
        <div className="book-rule-soft" />
    </div>
);

/** Обзор и раунд игры — по книгам, каждая со своим заголовком; «Статистика» — одна сетка по выбранной мере. */
export class ParshaTable extends ScopedAntiHookComponent {
    /** Таблица в выбранной раскладке. */
    public render(): ReactNode {
        const {sizeBy} = this.useCarburetor(this.resolve(prefsToken));
        const {view} = this.useCarburetor(this.resolve(navToken));
        const game = this.useCarburetor(this.resolve(gameToken));
        const inRound = view === 'game' && (game.status === 'playing' || game.status === 'done');
        // Раунд: выбранные книги без пустых мест, у каждой свой заголовок.
        if (inRound) return <RoundTable books={game.setup.books} />;
        // Обзор: каждая книга со своим заголовком, её главы — с первой клетки справа.
        if (view === 'overview') return <RoundTable books={ALL_BOOKS} />;
        const order = BY_MEASURE[sizeBy] ?? BY_MEASURE.verses;
        return (
            // Главы и книги идут справа налево, как в свитке, при любом языке интерфейса.
            <div dir="rtl" className="table-flow">
                <div className="legend-row">{BOOK_INDEXES.map(renderLegend)}</div>
                {BOOK_RULE}
                <div className="cells-grid">{order.map(renderCell)}</div>
            </div>
        );
    }
}
