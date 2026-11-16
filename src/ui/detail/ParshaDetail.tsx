import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {MouseEvent, ReactNode, TouchEvent, WheelEvent} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {formatRange} from '#src/domain/ranges/formatRange.ts';
import {sizeLabel} from '#src/i18n/format/size/sizeLabel.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';
import {TONES} from '#src/ui/common/tones.ts';
import {CellFloors} from '#src/ui/table/CellFloors.tsx';
import {DetailNav} from './DetailNav.tsx';

/** Пауза колеса, после которой начинается новый жест: один жест — одна глава. */
const GESTURE_GAP_MS = 180;

/** Свайп: сдвиг пальца по горизонтали не меньше этого и заметно больше вертикального. */
const SWIPE_PX = 60;

/** Можно ли ещё прокрутить карточку в эту сторону. */
const canScroll = (box: HTMLElement, down: boolean): boolean =>
    down ? box.scrollTop + box.clientHeight < box.scrollHeight - 1 : box.scrollTop > 0;

/** Карточка главы поверх таблицы: размер и все открытые этажи крупно; колесо листает главы. */
export class ParshaDetail extends ScopedAntiHookComponent {
    /** Время последнего события колеса. */
    private lastWheel = 0;
    /** Начало касания для свайпа. */
    private touchX = 0;
    private touchY = 0;
    /** Escape закрывает карточку. */
    protected useEffects(): void {
        this.useEffect('escape', this.listenEscape, []);
        const open = this.resolve(selectionToken).getData().open !== null;
        this.useEffect('scroll-lock', this.lockScroll, [open]);
    }

    /** Пока карточка открыта, страница под ней не прокручивается. */
    @bind
    protected lockScroll(): (() => void) | undefined {
        if (this.resolve(selectionToken).getData().open === null) return undefined;
        document.documentElement.classList.add('overflow-hidden');
        return this.unlockScroll;
    }

    /** Возвращает прокрутку страницы. */
    @bind
    protected unlockScroll(): void {
        document.documentElement.classList.remove('overflow-hidden');
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

    /** Escape закрывает; стрелки листают справа налево: ← следующая, → предыдущая. */
    @bind
    protected onKey(event: KeyboardEvent): void {
        if (event.key === 'Escape') this.resolve(selectionToken).close();
        if (event.key === 'ArrowLeft') this.flip(1);
        if (event.key === 'ArrowRight') this.flip(-1);
    }

    /** Соседняя глава; в идущем раунде игры — нет: листание открыло бы неотгаданные главы. */
    protected flip(delta: number): void {
        if (this.resolve(gameToken).isPlaying()) return;
        this.resolve(selectionToken).step(delta);
    }

    /** Запоминает начало касания. */
    @bind
    protected onTouchStart(event: TouchEvent<HTMLDivElement>): void {
        const touch = event.touches[0];
        if (touch === undefined) return;
        this.touchX = touch.clientX;
        this.touchY = touch.clientY;
    }

    /** Горизонтальный свайп листает, как страницы справа налево: вправо — следующая, влево — предыдущая. */
    @bind
    protected onTouchEnd(event: TouchEvent<HTMLDivElement>): void {
        const touch = event.changedTouches[0];
        if (touch === undefined) return;
        const dx = touch.clientX - this.touchX;
        const dy = touch.clientY - this.touchY;
        if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        this.flip(dx > 0 ? 1 : -1);
        event.currentTarget.scrollTop = 0;
    }

    /** Клик по фону закрывает, по панели — нет. */
    @bind
    protected onBackdrop(event: MouseEvent<HTMLDivElement>): void {
        if (event.target === event.currentTarget) this.resolve(selectionToken).close();
    }

    /** Колесо: длинная карточка сначала прокручивается, у края — следующая или предыдущая глава. */
    @bind
    protected onWheel(event: WheelEvent<HTMLDivElement>): void {
        const now = Date.now();
        const fresh = now - this.lastWheel > GESTURE_GAP_MS;
        this.lastWheel = now;
        if (!fresh || event.deltaY === 0) return;
        const box = event.currentTarget;
        const down = event.deltaY > 0;
        if (canScroll(box, down)) return;
        this.flip(down ? 1 : -1);
        box.scrollTop = 0;
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
                onWheel={this.onWheel}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
                className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-slate-900/25 dark:bg-black/60 p-3 backdrop-blur-sm sm:p-8"
            >
                <article className="panel w-full max-w-2xl rounded-2xl p-4 sm:p-6 lg:max-w-5xl">
                    <div className="flex items-start justify-between gap-3">
                        <div className={`text-sm ${tone.text}`}>
                            {t.parsha} {parsha.ordinal} · <bdi dir="ltr">{formatRange(parsha.range)}</bdi>
                            <div className="mt-0.5 text-base">
                                {t.book}: <span dir="rtl" className="font-hebrew text-lg">{book.he}</span>
                                {locale === 'he' ? null : ` · ${book.translit[locale]} · ${book.common[locale]}`}
                            </div>
                        </div>
                        <button type="button" onClick={selection.close} className="rounded-lg border border-line px-2
                            text-soft hover:border-line-strong hover:text-ink">
                            {t.close} ✕
                        </button>
                    </div>
                    {/* Иврит-название в одной строке с транслитерацией: без пустого места в шапке. */}
                    <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4">
                        {locale === 'he' ? null : (
                            <p className="text-lg text-ink">
                                {parsha.translit[locale]} <span className="text-mute">· «{parsha.title[locale]}»</span>
                            </p>
                        )}
                        <h2 dir="rtl" className={`neon-text font-hebrew text-5xl leading-tight ${tone.text}`}>
                            {parsha.he}
                        </h2>
                    </div>
                    <section className="mt-3 rounded-xl border border-line bg-veil px-3 py-2">
                        <h3 className="text-sm uppercase tracking-widest text-mute">
                            {t.nameOrigin} · <bdi dir="ltr">{parsha.origin.ref}</bdi>
                        </h3>
                        <p className="mt-0.5 text-ink">{parsha.origin.note[locale]}</p>
                    </section>
                    <p className={`mt-2 text-sm ${tone.text}`}>
                        {sizeLabel(parsha.verses, parsha.sizeRank, 'verses', locale)}
                        {' · '}
                        {sizeLabel(parsha.raw, parsha.wordRank, 'words', locale)}
                        {' · '}
                        {sizeLabel(parsha.letters, parsha.letterRank, 'letters', locale)}
                    </p>
                    <CellFloors parsha={parsha} floor={floor} locale={locale} chip={tone.chip} large />
                    {floor < 3 ? <p className="mt-3 text-sm text-faint">{t.floorHint}</p> : null}
                    <DetailNav index={open} />
                </article>
            </div>
        );
    }
}
