import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {MouseEvent, ReactNode, TouchEvent} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {gematria} from '#src/domain/gematria/gematria.ts';
import {formatRange} from '#src/domain/ranges/formatRange.ts';
import {sizeLabel} from '#src/i18n/format/size/sizeLabel.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {navToken} from '#src/stores/nav/navToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';
import {FloorButtons} from '#src/ui/common/FloorButtons.tsx';
import {TONES} from '#src/ui/common/tones.ts';
import {CellFloors} from '#src/ui/table/CellFloors.tsx';
import {DetailNav} from './DetailNav.tsx';
import {OVERLAY} from './overlay.ts';
import {ScrollLock} from './ScrollLock.tsx';
import {TallyLines} from './TallyLines.tsx';

/** Верхний этаж: имена, фразы и сюжет. */
const ALL_FLOORS = 3;

/** id фона карточки: прокрутка в начало при смене главы. */
const DIALOG_ID = 'parsha-dialog';

/** Свайп: сдвиг пальца по горизонтали не меньше этого и заметно больше вертикального. */
const SWIPE_PX = 60;

/** Карточка главы поверх таблицы: размер и все открытые этажи крупно; стрелки и свайп листают главы. */
export class ParshaDetail extends ScopedAntiHookComponent {
    /** Начало касания для свайпа. */
    private touchX = 0;
    private touchY = 0;
    /** Escape закрывает карточку главы или книги; новая глава открывается с начала. */
    protected useEffects(): void {
        this.useEffect('escape', this.listenEscape, []);
        this.useEffect('scroll-top', this.scrollTop, [this.resolve(selectionToken).getData().open]);
    }

    /** Новая глава открывается с начала: верх карточки всегда на одной высоте. */
    @bind
    protected scrollTop(): void {
        document.getElementById(DIALOG_ID)?.scrollTo({top: 0});
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
    }

    /** Клик по фону закрывает, по панели — нет. */
    @bind
    protected onBackdrop(event: MouseEvent<HTMLDivElement>): void {
        if (event.target === event.currentTarget) this.resolve(selectionToken).close();
    }

    /** Модальная карточка или ничего. */
    public render(): ReactNode {
        const selection = this.resolve(selectionToken);
        const {open, floor: picked} = this.useCarburetor(selection);
        if (open === null) return null;
        const prefs = this.useCarburetor(this.resolve(prefsToken));
        const {locale} = prefs;
        // Карточка открывается на этаже таблицы в «Обзоре», а из «Статистики» и игры — целиком;
        // дальше этаж меняется прямо в карточке.
        const overview = this.useCarburetor(this.resolve(navToken)).view === 'overview';
        const floor = picked ?? (overview ? prefs.floor : ALL_FLOORS);
        const parsha = PARSHIOT[open]!;
        const book = BOOKS[parsha.book]!;
        const tone = TONES[book.tone];
        const t = MESSAGES[locale];
        return (
            <div
                id={DIALOG_ID}
                role="dialog"
                aria-modal="true"
                onClick={this.onBackdrop}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
                className={OVERLAY}
            >
                <ScrollLock />
                <article className="panel w-full max-w-2xl rounded-2xl p-4 sm:p-6 lg:max-w-5xl">
                    {/* Стрелки сверху: при листании они не сдвигаются, щёлкать можно не двигая мышь. */}
                    <DetailNav index={open} />
                    <div className="flex items-start justify-between gap-3">
                        <div className={`text-sm ${tone.text}`}>
                            {t.parsha} {parsha.ordinal} · <bdi dir="ltr">{formatRange(parsha.range)}</bdi>
                            <div className="mt-0.5 text-base">
                                {t.book}: <span dir="rtl" className="font-hebrew text-lg">{book.he}</span>
                                {locale === 'he' ? null : ` · ${book.translit[locale]} · ${book.common[locale]}`}
                            </div>
                        </div>
                        <button type="button" onClick={selection.close} className="cursor-pointer rounded-lg border
                            border-line px-2 text-soft hover:border-line-strong hover:text-ink">
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
                        <div className="flex flex-col items-end">
                            <h2 dir="rtl" className={`neon-text font-hebrew text-5xl leading-tight ${tone.text}`}>
                                {parsha.he}
                            </h2>
                            <span className="text-sm text-mute">
                                {t.gematria}: <span className="tabular-nums text-ink">{gematria(parsha.he)}</span>
                            </span>
                        </div>
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
                    <TallyLines parsha={parsha} locale={locale} chip={tone.chip} />
                    <div className="mt-3 border-t border-line pt-3">
                        <FloorButtons floor={floor} locale={locale} onPick={selection.setFloor} />
                    </div>
                    <CellFloors parsha={parsha} floor={floor} locale={locale} chip={tone.chip} large />
                </article>
            </div>
        );
    }
}
