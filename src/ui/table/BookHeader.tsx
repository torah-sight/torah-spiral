import {ScopedAntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import {BOOK_SPANS} from '#src/content/bookSpans.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {TONES} from '#src/ui/common/tones.ts';

/** Свойства заголовка книги. */
export interface IBookHeaderProps {
    book: number;
}

/** Узкие колонки на телефоне: перенос длинных слов. */
const BOX = 'glass min-w-0 overflow-hidden rounded-xl border bg-gradient-to-b to-transparent px-2 py-1.5 '
    + '[overflow-wrap:anywhere] hyphens-auto';

/** Книга: иврит, транслитерация, буквальный перевод, привычное имя, главы и номера недельных. */
export class BookHeader extends ScopedAntiHookComponent<IBookHeaderProps> {
    /** Заголовок книги на стекле с градиентом её цвета. */
    public render(): ReactNode {
        const {book} = this.props;
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const meta = BOOKS[book]!;
        const span = BOOK_SPANS[book]!;
        const t = MESSAGES[locale];
        const tone = TONES[meta.tone].head;
        return (
            <div className={`${BOX} ${tone}`}>
                <div dir="rtl" className="font-hebrew text-lg leading-tight sm:text-2xl">{meta.he}</div>
                {locale === 'he' ? null : (
                    <div className="text-[clamp(13px,1.9vw,18px)] leading-tight">
                        {meta.translit[locale]} · «{meta.literal[locale]}» · {meta.common[locale]}
                    </div>
                )}
                <div className="text-[clamp(12px,1.6vw,15px)] text-mute">
                    {t.chapters} <bdi dir="ltr">{span.firstChapter}–{span.lastChapter}</bdi>
                    {' · '}
                    {t.portions} <bdi dir="ltr">{span.firstOrdinal}–{span.lastOrdinal}</bdi>
                </div>
            </div>
        );
    }
}
