import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {MouseEvent, ReactNode} from 'react';
import {BOOK_ABOUT} from '#src/content/books/bookAbout.ts';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import {BOOK_SPANS} from '#src/content/bookSpans.ts';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {countLabel} from '#src/i18n/format/size/countLabel.ts';
import type {SizeUnit} from '#src/i18n/format/size/units.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';
import {CloseButton} from '#src/ui/common/CloseButton.tsx';
import {BookPortion} from './BookPortion.tsx';
import {ScrollLock} from './ScrollLock.tsx';

const ofBook = (book: number): IParsha[] => PARSHIOT.filter((parsha: IParsha): boolean => parsha.book === book);

/** Недельные главы каждой книги. */
const BY_BOOK: readonly IParsha[][] = [0, 1, 2, 3, 4].map(ofBook);

const UNIT_KEY: Record<SizeUnit, 'verses' | 'raw' | 'letters'> = {verses: 'verses', words: 'raw', letters: 'letters'};

/** Сумма меры по главам книги: «1533 стиха». */
const total = (book: number, unit: SizeUnit, locale: Locale): string => {
    let sum = 0;
    for (const parsha of BY_BOOK[book]!) sum += parsha[UNIT_KEY[unit]];
    return countLabel(sum, unit, locale);
};

/** Строка недельной главы. */
const renderPortion = (parsha: IParsha): ReactNode => (
    <BookPortion key={parsha.index} index={parsha.index} />
);

const renderSentence = (sentence: string): ReactNode => <p key={sentence}>{sentence}</p>;

/** Шапка: книга, главы и название на иврите; неподвижна, прокручивается содержимое. */
const headOf = (index: number, locale: Locale): ReactNode => {
    const book = BOOKS[index]!;
    const span = BOOK_SPANS[index]!;
    const t = MESSAGES[locale];
    return (
        <header className="modal-head">
            <div className="book-detail-head">
                <div data-book={index} className="book-detail-span">
                    {t.book} {index + 1} · {t.chapters}
                    {' '}<bdi dir="ltr">{span.firstChapter}–{span.lastChapter}</bdi>
                    {' · '}
                    {t.portions} <bdi dir="ltr">{span.firstOrdinal}–{span.lastOrdinal}</bdi>
                </div>
                <div className="book-detail-row">
                    {locale === 'he' ? null : (
                        <p className="book-detail-name">
                            {book.translit[locale]}{' '}
                            <span className="book-detail-literal">· «{book.literal[locale]}»</span>
                            {' · '}{book.common[locale]}
                        </p>
                    )}
                    <h2 dir="rtl" data-book={index} className="book-detail-hebrew">{book.he}</h2>
                </div>
            </div>
        </header>
    );
};

/** Содержимое: откуда название, итоги, сюжет книги, недельные главы. */
const bodyOf = (index: number, locale: Locale): ReactNode => {
    const about = BOOK_ABOUT[index]!;
    const t = MESSAGES[locale];
    return (
        <div className="modal-body">
            <section className="detail-section">
                <h3 className="detail-heading">{t.bookNameOrigin} · <bdi dir="ltr">{about.ref}</bdi></h3>
                <p className="detail-text">{about.note[locale]}</p>
            </section>
            <p data-book={index} className="book-detail-totals">
                {total(index, 'verses', locale)} · {total(index, 'words', locale)}
                {' · '}
                {total(index, 'letters', locale)}
            </p>
            {/* Сюжет во всю ширину, главы — двумя колонками сверху вниз: без пустых полей рядом. */}
            <section className="detail-section-spaced">
                <h3 className="detail-heading">{t.bookStory}</h3>
                <div className="book-detail-story">{about.story[locale].map(renderSentence)}</div>
            </section>
            <section className="detail-section-spaced">
                <h3 className="detail-heading">{t.portions}</h3>
                <ol className="portion-list">{BY_BOOK[index]!.map(renderPortion)}</ol>
            </section>
        </div>
    );
};

/** Карточка книги поверх таблицы: название и его перевод, откуда оно, сюжет, недельные главы. */
export class BookDetail extends ScopedAntiHookComponent {
    /** Клик по фону закрывает, по панели — нет. */
    @bind
    protected onBackdrop(event: MouseEvent<HTMLDivElement>): void {
        if (event.target === event.currentTarget) this.resolve(selectionToken).close();
    }

    /** Модальная карточка книги или ничего. */
    public render(): ReactNode {
        const selection = this.resolve(selectionToken);
        const {book: index} = this.useCarburetor(selection);
        if (index === null) return null;
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        return (
            <div role="dialog" aria-modal="true" onClick={this.onBackdrop} className="modal-overlay">
                <ScrollLock />
                <CloseButton label={MESSAGES[locale].close} onClose={selection.close} />
                <article className="modal-panel">
                    {headOf(index, locale)}
                    {bodyOf(index, locale)}
                </article>
            </div>
        );
    }
}
