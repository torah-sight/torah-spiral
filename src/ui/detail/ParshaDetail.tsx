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
import {copyLayers} from '#src/stores/prefs/copyLayers.ts';
import type {Layers} from '#src/stores/prefs/PrefsStore.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';
import type {IParsha} from '#src/content/model/types.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {textDir} from '#src/i18n/format/textDir.ts';
import {CloseButton} from '#src/ui/common/CloseButton.tsx';
import {LayerPicker} from '#src/ui/common/LayerPicker.tsx';
import {TONES} from '#src/ui/common/tones.ts';
import {CellFloors} from '#src/ui/table/CellFloors.tsx';
import {DetailNav} from './DetailNav.tsx';
import {OVERLAY} from './overlay.ts';
import {ScrollLock} from './ScrollLock.tsx';
import {TallyLines} from './TallyLines.tsx';

/** Все слои: из «Статистики» и игры карточка открывается целиком. */
const ALL_LAYERS: Layers = {names: true, phrases: true, story: true};

/** id фона карточки: прокрутка в начало при смене главы. */
const DIALOG_ID = 'parsha-dialog';

/** Свайп: сдвиг пальца по горизонтали не меньше этого и заметно больше вертикального. */
const SWIPE_PX = 60;

/** Заголовок между стрелками: иврит крупно, под ним транслитерация, перевод и гематрия. */
const titleOf = (parsha: IParsha, locale: Locale, text: string): ReactNode => (
    <div dir={textDir(locale)} className="text-center">
        <h2 dir="rtl" className={`neon-text font-hebrew text-4xl leading-tight sm:text-5xl ${text}`}>{parsha.he}</h2>
        {locale === 'he' ? null : (
            <p className="text-ink">
                {parsha.translit[locale]} <span className="text-mute">· «{parsha.title[locale]}»</span>
            </p>
        )}
        <p className="text-sm text-mute">
            {MESSAGES[locale].gematria}: <span className="tabular-nums text-ink">{gematria(parsha.he)}</span>
        </p>
    </div>
);

/** Сведения сбоку: на телефоне строки идут в линию, с sm — столбиком. */
const SIDE = 'flex flex-wrap items-center justify-center gap-x-3 text-center text-sm leading-relaxed '
    + 'sm:flex-col sm:gap-x-0';

/** Сбоку от заголовка: номер главы, стихи и книга. */
const placeOf = (parsha: IParsha, locale: Locale, text: string): ReactNode => {
    const book = BOOKS[parsha.book]!;
    const t = MESSAGES[locale];
    return (
        <div dir={textDir(locale)} className={`${SIDE} ${text}`}>
            <p>{t.parsha} {parsha.ordinal} · <bdi dir="ltr">{formatRange(parsha.range)}</bdi></p>
            <p>{t.book}: <span dir="rtl" className="font-hebrew text-base">{book.he}</span></p>
            {locale === 'he' ? null : <p>{book.translit[locale]} · {book.common[locale]}</p>}
        </div>
    );
};

/** Сбоку от заголовка: размеры главы с местами. */
const sizesOf = (parsha: IParsha, locale: Locale, text: string): ReactNode => (
    <div dir={textDir(locale)} className={`${SIDE} ${text}`}>
        <p>{sizeLabel(parsha.verses, parsha.sizeRank, 'verses', locale)}</p>
        <p>{sizeLabel(parsha.raw, parsha.wordRank, 'words', locale)}</p>
        <p>{sizeLabel(parsha.letters, parsha.letterRank, 'letters', locale)}</p>
    </div>
);

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
        const {open, layers: picked} = this.useCarburetor(selection);
        if (open === null) return null;
        const prefs = this.useCarburetor(this.resolve(prefsToken));
        const {locale} = prefs;
        // Карточка открывается со слоями таблицы в «Обзоре», а из «Статистики» и игры — целиком;
        // дальше слои меняются прямо в карточке.
        const overview = this.useCarburetor(this.resolve(navToken)).view === 'overview';
        const layers = copyLayers(picked ?? (overview ? prefs.layers : ALL_LAYERS));
        const parsha = PARSHIOT[open]!;
        const book = BOOKS[parsha.book]!;
        const tone = TONES[book.tone];
        const t = MESSAGES[locale];
        const picker = <LayerPicker layers={layers} locale={locale} onChange={selection.setLayers} />;
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
                <CloseButton label={t.close} onClose={selection.close} />
                <article className="panel w-full max-w-2xl rounded-2xl p-4 sm:p-6 lg:max-w-5xl">
                    {/* Стрелки сверху: при листании они не сдвигаются; между ними — название и сведения. */}
                    <DetailNav
                        index={open}
                        before={placeOf(parsha, locale, tone.text)}
                        after={sizesOf(parsha, locale, tone.text)}
                        tools={picker}
                    >
                        {titleOf(parsha, locale, tone.text)}
                    </DetailNav>
                    <section className="rounded-xl border border-line bg-veil px-3 py-2">
                        <h3 className="text-sm uppercase tracking-widest text-mute">
                            {t.nameOrigin} · <bdi dir="ltr">{parsha.origin.ref}</bdi>
                        </h3>
                        <p className="mt-0.5 text-ink">{parsha.origin.note[locale]}</p>
                    </section>
                    <TallyLines
                        parsha={parsha}
                        locale={locale}
                        chip={tone.chip}
                        names={layers.names}
                    />
                    <CellFloors parsha={parsha} layers={layers} locale={locale} chip={tone.chip} large />
                </article>
            </div>
        );
    }
}
