import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {MouseEvent, ReactNode} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {formatRange} from '#src/domain/ranges/formatRange.ts';
import {sizeLabel} from '#src/i18n/format/size/sizeLabel.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';
import {TONES} from '#src/ui/common/tones.ts';
import {CellFloors} from '#src/ui/table/CellFloors.tsx';

/** Карточка главы поверх таблицы: размер и все открытые этажи крупно. */
export class ParshaDetail extends ScopedAntiHookComponent {
    /** Escape закрывает карточку. */
    protected useEffects(): void {
        this.useEffect('escape', this.listenEscape, []);
    }

    /** Подписка на Escape; отписка — при размонтировании. */
    @bind
    protected listenEscape(): () => void {
        window.addEventListener('keydown', this.onKey);
        return this.unlistenEscape;
    }

    /** Снимает подписку на Escape. */
    @bind
    protected unlistenEscape(): void {
        window.removeEventListener('keydown', this.onKey);
    }

    /** Закрытие по Escape. */
    @bind
    protected onKey(event: KeyboardEvent): void {
        if (event.key === 'Escape') this.resolve(selectionToken).close();
    }

    /** Клик по фону закрывает, по панели — нет. */
    @bind
    protected onBackdrop(event: MouseEvent<HTMLDivElement>): void {
        if (event.target === event.currentTarget) this.resolve(selectionToken).close();
    }

    /** Модальная карточка или ничего. */
    public render(): ReactNode {
        const selection = this.resolve(selectionToken);
        const {open} = this.useCarburetor(selection);
        if (open === null) return null;
        const {locale, floor} = this.useCarburetor(this.resolve(prefsToken));
        const parsha = PARSHIOT[open]!;
        const book = BOOKS[parsha.book]!;
        const tone = TONES[book.tone];
        const t = MESSAGES[locale];
        return (
            <div
                role="dialog"
                aria-modal="true"
                onClick={this.onBackdrop}
                className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/25 dark:bg-black/60 p-3 backdrop-blur-sm sm:p-8"
            >
                <article className={`glass w-full max-w-2xl rounded-2xl border p-4 sm:p-6 ${tone.cell}`}>
                    <div className="flex items-start justify-between gap-3">
                        <div className={`text-sm ${tone.text}`}>
                            {t.parsha} {parsha.ordinal} · <span dir="rtl" className="font-hebrew">{book.he}</span>{' '}
                            <bdi dir="ltr">{formatRange(parsha.range)}</bdi>
                        </div>
                        <button type="button" onClick={selection.close} className="rounded-lg border border-line px-2
                            text-soft hover:border-line-strong hover:text-ink">
                            {t.close} ✕
                        </button>
                    </div>
                    <h2 dir="rtl" className={`neon-text mt-2 font-hebrew text-5xl leading-tight ${tone.text}`}>
                        {parsha.he}
                    </h2>
                    {locale === 'he' ? null : (
                        <p className="text-lg text-ink">
                            {parsha.translit[locale]} <span className="text-mute">· «{parsha.title[locale]}»</span>
                        </p>
                    )}
                    <p className={`mt-2 text-sm ${tone.text}`}>
                        {sizeLabel(parsha.verses, parsha.sizeRank, 'verses', locale)}
                        {' · '}
                        {sizeLabel(parsha.raw, parsha.wordRank, 'words', locale)}
                        {' · '}
                        {sizeLabel(parsha.letters, parsha.letterRank, 'letters', locale)}
                    </p>
                    <CellFloors parsha={parsha} floor={floor} locale={locale} chip={tone.chip} large />
                    {floor < 3 ? <p className="mt-3 text-sm text-faint">{t.floorHint}</p> : null}
                </article>
            </div>
        );
    }
}
