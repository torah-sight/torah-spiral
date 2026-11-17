import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import {BOOK_SPANS} from '#src/content/bookSpans.ts';
import {textDir} from '#src/i18n/format/textDir.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';
import {TONES} from '#src/ui/common/tones.ts';

/** Свойства заголовка книги. */
export interface IBookHeaderProps {
    book: number;
    /** Плашка по содержимому в одну строку: заголовок секции, а не столбца. */
    compact: boolean;
}

/** Узкие колонки на телефоне: перенос длинных слов. */
const BOX = 'glass min-w-0 overflow-hidden rounded-xl border bg-gradient-to-b to-transparent px-2 py-1.5 '
    + 'text-start [overflow-wrap:anywhere] hyphens-auto';

const HEBREW = 'font-hebrew text-lg leading-tight sm:text-2xl';
const LINE = 'text-[clamp(13px,1.9vw,18px)] leading-tight';

/** Компактная: иврит справа, подписи рядом; ширина — по содержимому. */
const COMPACT = 'flex w-fit max-w-full items-center gap-3 px-3';

/** Кликабельный заголовок: палец и подсветка при наведении. */
const CLICKABLE = 'cursor-pointer transition hover:brightness-110 hover:shadow-[0_0_20px_-8px_currentColor]';

/** Книга: иврит, транслитерация, буквальный перевод, привычное имя, главы и номера недельных. */
export class BookHeader extends ScopedAntiHookComponent<IBookHeaderProps> {
    /** Открывает карточку книги. */
    @bind
    protected onClick(): void {
        this.resolve(selectionToken).openBook(this.props.book);
    }

    /** Заголовок книги на стекле с градиентом её цвета; вне идущего раунда — кнопка карточки книги. */
    public render(): ReactNode {
        const {book} = this.props;
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        // В раунде карточка книги подсказала бы ответы: главы по порядку.
        const playing = this.useCarburetor(this.resolve(gameToken)).status === 'playing';
        const {compact} = this.props;
        const meta = BOOKS[book]!;
        const span = BOOK_SPANS[book]!;
        const t = MESSAGES[locale];
        const tone = TONES[meta.tone].head;
        const Tag = playing ? 'div' : 'button';
        return (
            <Tag
                type={playing ? undefined : 'button'}
                onClick={playing ? undefined : this.onClick}
                dir={compact ? 'rtl' : textDir(locale)}
                className={`${BOX} ${tone} ${compact ? COMPACT : ''} ${playing ? '' : CLICKABLE}`}
            >
                {compact ? <div dir="rtl" className={HEBREW}>{meta.he}</div> : (
                    // Столбец: транслитерация слева в одну строку с ивритом справа.
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                        {locale === 'he' ? null : <span className={LINE}>{meta.translit[locale]}</span>}
                        <span dir="rtl" className={`ml-auto ${HEBREW}`}>{meta.he}</span>
                    </div>
                )}
                <div dir={textDir(locale)}>
                    {locale === 'he' ? null : (
                        <div className={LINE}>
                            {compact ? `${meta.translit[locale]} · ` : null}
                            «{meta.literal[locale]}» · {meta.common[locale]}
                        </div>
                    )}
                    <div className="text-[clamp(12px,1.6vw,15px)] text-mute">
                        {t.chapters} <bdi dir="ltr">{span.firstChapter}–{span.lastChapter}</bdi>
                        {' · '}
                        {t.portions} <bdi dir="ltr">{span.firstOrdinal}–{span.lastOrdinal}</bdi>
                    </div>
                </div>
            </Tag>
        );
    }
}
