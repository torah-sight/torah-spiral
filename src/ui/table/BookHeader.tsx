import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import {BOOK_SPANS} from '#src/content/bookSpans.ts';
import {textDir} from '#src/i18n/format/textDir.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';

/** Свойства заголовка книги. */
export interface IBookHeaderProps {
    book: number;
    /** Плашка по содержимому в одну строку: заголовок секции, а не столбца. */
    compact: boolean;
}

/** Книга: иврит, транслитерация, буквальный перевод, привычное имя, главы и номера недельных. */
export class BookHeader extends ScopedAntiHookComponent<IBookHeaderProps> {
    /** Открывает карточку книги. */
    @bind
    protected onClick(): void {
        this.resolve(selectionToken).openBook(this.props.book);
    }

    /** Верх плашки: иврит (в столбце — и транслитерация слева от него). */
    protected renderTop(locale: Locale): ReactNode {
        const meta = BOOKS[this.props.book]!;
        if (this.props.compact) return <div dir="rtl" className="plate-hebrew">{meta.he}</div>;
        return (
            <div className="plate-top">
                {locale === 'he' ? null : <span className="plate-line">{meta.translit[locale]}</span>}
                <span dir="rtl" className="plate-hebrew-end">{meta.he}</span>
            </div>
        );
    }

    /** Подписи: перевод названия, привычное имя, главы и номера недельных. */
    protected renderNotes(locale: Locale): ReactNode {
        const {book, compact} = this.props;
        const meta = BOOKS[book]!;
        const span = BOOK_SPANS[book]!;
        const t = MESSAGES[locale];
        return (
            <div dir={textDir(locale)} className={compact ? undefined : 'plate-notes'}>
                {locale === 'he' ? null : (
                    <div className="plate-line">
                        {compact ? `${meta.translit[locale]} · ` : null}
                        «{meta.literal[locale]}» · {meta.common[locale]}
                    </div>
                )}
                <div className="plate-span">
                    {t.chapters} <bdi dir="ltr">{span.firstChapter}–{span.lastChapter}</bdi>
                    {' · '}
                    {t.portions} <bdi dir="ltr">{span.firstOrdinal}–{span.lastOrdinal}</bdi>
                </div>
            </div>
        );
    }

    /** Заголовок книги на стекле с градиентом её цвета; вне идущего раунда — кнопка карточки книги. */
    public render(): ReactNode {
        const {book, compact} = this.props;
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        // В раунде карточка книги подсказала бы ответы: главы по порядку.
        const playing = this.useCarburetor(this.resolve(gameToken)).status === 'playing';
        const Tag = playing ? 'div' : 'button';
        return (
            <Tag
                type={playing ? undefined : 'button'}
                onClick={playing ? undefined : this.onClick}
                dir={compact ? 'rtl' : textDir(locale)}
                data-book={book}
                className={compact ? 'book-plate-compact' : 'book-plate-column'}
            >
                {this.renderTop(locale)}
                {this.renderNotes(locale)}
            </Tag>
        );
    }
}
