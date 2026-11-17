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
import {TONES} from '#src/ui/common/tones.ts';
import {BookPortion} from './BookPortion.tsx';
import {OVERLAY} from './overlay.ts';
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

const SECTION = 'rounded-xl border border-line bg-veil px-3 py-2';
const HEADING = 'text-sm uppercase tracking-widest text-mute';

/** Строка недельной главы. */
const renderPortion = (parsha: IParsha): ReactNode => (
    <BookPortion key={parsha.index} index={parsha.index} text={TONES[BOOKS[parsha.book]!.tone].text} />
);

const renderSentence = (sentence: string): ReactNode => <p key={sentence}>{sentence}</p>;

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
        const book = BOOKS[index]!;
        const about = BOOK_ABOUT[index]!;
        const span = BOOK_SPANS[index]!;
        const tone = TONES[book.tone];
        const t = MESSAGES[locale];
        return (
            <div role="dialog" aria-modal="true" onClick={this.onBackdrop} className={OVERLAY}>
                <ScrollLock />
                <article className="panel w-full max-w-2xl rounded-2xl p-4 sm:p-6 lg:max-w-5xl">
                    <div className="flex items-start justify-between gap-3">
                        <div className={`text-sm ${tone.text}`}>
                            {t.book} {index + 1} · {t.chapters}
                            {' '}<bdi dir="ltr">{span.firstChapter}–{span.lastChapter}</bdi>
                            {' · '}
                            {t.portions} <bdi dir="ltr">{span.firstOrdinal}–{span.lastOrdinal}</bdi>
                        </div>
                        <button type="button" onClick={selection.close} className="cursor-pointer rounded-lg border
                            border-line px-2 text-soft hover:border-line-strong hover:text-ink">
                            {t.close} ✕
                        </button>
                    </div>
                    <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4">
                        {locale === 'he' ? null : (
                            <p className="text-lg text-ink">
                                {book.translit[locale]} <span className="text-mute">· «{book.literal[locale]}»</span>
                                {' · '}{book.common[locale]}
                            </p>
                        )}
                        <h2 dir="rtl" className={`neon-text font-hebrew text-5xl leading-tight ${tone.text}`}>
                            {book.he}
                        </h2>
                    </div>
                    <section className={`mt-3 ${SECTION}`}>
                        <h3 className={HEADING}>{t.nameOrigin} · <bdi dir="ltr">{about.ref}</bdi></h3>
                        <p className="mt-0.5 text-ink">{about.note[locale]}</p>
                    </section>
                    <p className={`mt-2 text-sm ${tone.text}`}>
                        {total(index, 'verses', locale)} · {total(index, 'words', locale)}
                        {' · '}
                        {total(index, 'letters', locale)}
                    </p>
                    <div className="mt-3 grid gap-3 lg:grid-cols-2">
                        <section className={SECTION}>
                            <h3 className={HEADING}>{t.bookStory}</h3>
                            <div className="mt-1 space-y-1 text-ink">{about.story[locale].map(renderSentence)}</div>
                        </section>
                        <section className={SECTION}>
                            <h3 className={HEADING}>{t.portions}</h3>
                            <ol className="mt-1">{BY_BOOK[index]!.map(renderPortion)}</ol>
                        </section>
                    </div>
                </article>
            </div>
        );
    }
}
