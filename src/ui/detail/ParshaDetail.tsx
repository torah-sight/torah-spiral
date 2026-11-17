import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {MouseEvent, ReactNode, TouchEvent} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {gematria} from '#src/domain/gematria/gematria.ts';
import {formatRange} from '#src/domain/ranges/formatRange.ts';
import {sizeLabel} from '#src/i18n/format/size/sizeLabel.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {copyLayers} from '#src/stores/prefs/copyLayers.ts';
import type {Layers} from '#src/stores/prefs/PrefsStore.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import type {ISelection} from '#src/stores/selection/SelectionStore.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';
import type {IParsha} from '#src/content/model/types.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {textDir} from '#src/i18n/format/textDir.ts';
import {CloseButton} from '#src/ui/common/CloseButton.tsx';
import {LayerPicker} from '#src/ui/common/LayerPicker.tsx';
import {CellFloors} from '#src/ui/table/CellFloors.tsx';
import {DetailNav} from './DetailNav.tsx';
import {ScrollLock} from './ScrollLock.tsx';
import {TallyLines} from './TallyLines.tsx';

/**
 * Слои карточки по умолчанию: каждый из нынешних назван явно. Новый слой в этот список сам не попадёт:
 * тип `Layers` потребует решить для него отдельно, и он останется выключенным, пока его не включат здесь.
 */
const ALL_LAYERS: Layers = {names: true, phrases: true, story: true};

/** id панели карточки: прокрутка в начало при смене главы. */
const DIALOG_ID = 'parsha-dialog';

/** Свайп: сдвиг пальца по горизонтали не меньше этого и заметно больше вертикального. */
const SWIPE_PX = 60;

/** Какая глава открыта. */
const selectOpen = (data: Readonly<ISelection>): number | null => data.open;

/** Заголовок между стрелками: иврит, под ним транслитерация, перевод и гематрия; на низком экране — один иврит. */
const titleOf = (parsha: IParsha, locale: Locale): ReactNode => (
    <div dir={textDir(locale)} data-book={parsha.book} className="detail-title">
        <h2 dir="rtl" className="detail-hebrew">{parsha.he}</h2>
        {locale === 'he' ? null : (
            <p className="detail-translit">
                {parsha.translit[locale]} <span className="detail-sub">· «{parsha.title[locale]}»</span>
            </p>
        )}
        <p className="detail-gematria">
            {MESSAGES[locale].gematria}: <span className="detail-gematria-value">{gematria(parsha.he)}</span>
        </p>
    </div>
);

/** Сбоку от заголовка: номер главы, стихи и книга. */
const placeOf = (parsha: IParsha, locale: Locale): ReactNode => {
    const book = BOOKS[parsha.book]!;
    const t = MESSAGES[locale];
    return (
        <div dir={textDir(locale)} data-book={parsha.book} className="detail-side">
            <p>{t.parsha} {parsha.ordinal} · <bdi dir="ltr">{formatRange(parsha.range)}</bdi></p>
            <p>{t.book}: <span dir="rtl" className="detail-book-name">{book.he}</span></p>
            {locale === 'he' ? null : <p>{book.translit[locale]} · {book.common[locale]}</p>}
        </div>
    );
};

/** Сбоку от заголовка: размеры главы с местами. */
const sizesOf = (parsha: IParsha, locale: Locale): ReactNode => (
    <div dir={textDir(locale)} data-book={parsha.book} className="detail-side">
        <p>{sizeLabel(parsha.verses, parsha.sizeRank, 'verses', locale)}</p>
        <p>{sizeLabel(parsha.raw, parsha.wordRank, 'words', locale)}</p>
        <p>{sizeLabel(parsha.letters, parsha.letterRank, 'letters', locale)}</p>
    </div>
);

/** Содержимое: откуда название, заповеди и Имена, выбранные слои. */
const bodyOf = (parsha: IParsha, locale: Locale, layers: Layers): ReactNode => {
    const t = MESSAGES[locale];
    return (
        <div className="modal-body">
            {/* До lg размеры главы здесь, а не в шапке. */}
            <div className="detail-sizes-mobile">{sizesOf(parsha, locale)}</div>
            <section className="detail-section">
                <h3 className="detail-heading">
                    {t.nameOrigin} · <bdi dir="ltr">{parsha.origin.ref}</bdi>
                </h3>
                <p className="detail-text">{parsha.origin.note[locale]}</p>
            </section>
            <TallyLines parsha={parsha} locale={locale} names={layers.names} />
            <CellFloors parsha={parsha} layers={layers} locale={locale} large />
        </div>
    );
};

/** Карточка главы поверх таблицы: размер и все открытые этажи крупно; стрелки и свайп листают главы. */
export class ParshaDetail extends ScopedAntiHookComponent {
    /** Начало касания для свайпа. */
    private touchX = 0;
    private touchY = 0;
    /** Escape закрывает карточку главы или книги; новая глава открывается с начала. */
    protected useEffects(): void {
        this.useEffect('escape', this.listenEscape, []);
        this.useStoreEffect('scroll-top', this.resolve(selectionToken), selectOpen, this.scrollTop);
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

    /** Шапка карточки: стрелки при листании не сдвигаются, между ними — название и сведения. */
    protected renderHead(parsha: IParsha, locale: Locale, layers: Layers): ReactNode {
        const selection = this.resolve(selectionToken);
        const picker = <LayerPicker layers={layers} locale={locale} onChange={selection.setLayers} />;
        return (
            <header className="modal-head">
                <DetailNav
                    index={parsha.index}
                    before={placeOf(parsha, locale)}
                    after={sizesOf(parsha, locale)}
                    tools={picker}
                >
                    {titleOf(parsha, locale)}
                </DetailNav>
            </header>
        );
    }

    /** Модальная карточка или ничего. */
    public render(): ReactNode {
        const selection = this.resolve(selectionToken);
        const {open, layers: picked} = this.useCarburetor(selection);
        if (open === null) return null;
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        // Карточка всегда открывается со всеми слоями; дальше слои меняются прямо в ней.
        const layers = copyLayers(picked ?? ALL_LAYERS);
        const parsha = PARSHIOT[open]!;
        return (
            <div
                role="dialog"
                aria-modal="true"
                onClick={this.onBackdrop}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
                className="modal-overlay"
            >
                <ScrollLock />
                <CloseButton label={MESSAGES[locale].close} onClose={selection.close} />
                <article id={DIALOG_ID} className="modal-panel">
                    {this.renderHead(parsha, locale, layers)}
                    {bodyOf(parsha, locale, layers)}
                </article>
            </div>
        );
    }
}
