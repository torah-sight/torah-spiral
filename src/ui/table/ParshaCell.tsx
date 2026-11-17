import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {gematria} from '#src/domain/gematria/gematria.ts';
import {formatRange} from '#src/domain/ranges/formatRange.ts';
import {sizeLabel} from '#src/i18n/format/size/sizeLabel.ts';
import type {Measure} from '#src/i18n/format/size/units.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {textDir} from '#src/i18n/format/textDir.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {navToken} from '#src/stores/nav/navToken.ts';
import {copyLayers} from '#src/stores/prefs/copyLayers.ts';
import type {Layers} from '#src/stores/prefs/PrefsStore.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';
import {TONES} from '#src/ui/common/tones.ts';
import {CellFloors} from './CellFloors.tsx';
import {SizeGauge} from './size/SizeGauge.tsx';

/** Свойства клетки. */
export interface IParshaCellProps {
    index: number;
}

/** Узкие клетки на телефоне: перенос длинных слов вместо вылезания за край. */
const WRAP = 'text-start [overflow-wrap:anywhere] hyphens-auto transition';
const TITLE = 'text-[clamp(18px,3.2vw,32px)] leading-tight';
const GEMATRIA = 'text-[clamp(11px,1.4vw,13px)] leading-tight text-faint tabular-nums';
const TRANSLIT = 'min-w-0 text-[clamp(13px,1.9vw,18px)] leading-tight text-ink';
const NUMBER = 'text-[13px] font-semibold opacity-80 sm:text-sm';
const WRONG = 'ring-2 ring-rose-400/90 shadow-[0_0_24px_-4px_rgba(244,63,94,0.95)] animate-wrong';
const FOUND = 'ring-4 ring-emerald-500 dark:ring-emerald-400 shadow-[0_0_28px_-4px_rgba(16,185,129,0.95)]';

/** Отгаданная глава: зелёная вуаль и галочка поверх клетки — видно сразу и в «сюжете», где клетки открыты. */
const GUESSED_MARK: ReactNode = (
    <>
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-emerald-400/30 dark:bg-emerald-400/20" />
        <span
            aria-hidden
            className="absolute bottom-1 end-1 flex size-7 items-center justify-center rounded-full bg-emerald-500
                text-base font-bold text-white shadow-[0_0_12px_rgba(16,185,129,0.9)]"
        >
            ✓
        </span>
    </>
);
/** Глава вне раунда скрыта, но держит своё место в сетке. */
const OUTSIDE = 'invisible pointer-events-none';


/** Вне обзора — только названия. */
const NO_LAYERS: Layers = {names: false, phrases: false, story: false};

/** Что видно в открытой клетке. */
interface IFace {
    locale: Locale;
    layers: Layers;
    inGame: boolean;
    unit: Measure;
    /** Раздел «Статистика»: градусники стихов и слов (и букв для этой меры) вместо строки размера. */
    sizes: boolean;
}

/** Мера-подсчёт (Имя или заповеди), а не размер главы. */
const isTally = (unit: Measure): boolean => unit !== 'verses' && unit !== 'words' && unit !== 'letters';

/** Градусники «Статистики»: выбранный подсчёт сверху, стихи и слова всегда, буквы — для этой меры. */
const gauges = (parsha: IParsha, unit: Measure, bar: string, locale: Locale): ReactNode => (
    <span className="mt-1.5 block space-y-1.5">
        {isTally(unit) ? <SizeGauge parsha={parsha} unit={unit} active bar={bar} locale={locale} /> : null}
        <SizeGauge parsha={parsha} unit="verses" active={unit === 'verses'} bar={bar} locale={locale} />
        <SizeGauge parsha={parsha} unit="words" active={unit === 'words'} bar={bar} locale={locale} />
        {unit === 'letters' ? <SizeGauge parsha={parsha} unit="letters" active bar={bar} locale={locale} /> : null}
    </span>
);


/** Открытая клетка: номер, иврит, перевод, диапазон, размер, этажи. */
const openFace = (parsha: IParsha, face: IFace): ReactNode => {
    const {locale, layers, inGame, unit} = face;
    const tone = TONES[BOOKS[parsha.book]!.tone];
    return (
        <>
            {/* Номер и транслитерация слева — в одну строку с ивритом справа. */}
            <span className="flex flex-wrap items-baseline justify-between gap-x-1.5">
                <span className="flex min-w-0 items-baseline gap-1.5">
                    <span className={`${NUMBER} ${tone.text}`}>{parsha.ordinal}</span>
                    {locale === 'he' ? null : <span className={TRANSLIT}>{parsha.translit[locale]}</span>}
                </span>
                <span className="ms-auto flex flex-col items-end">
                    <span dir="rtl" className={`font-hebrew ${TITLE} ${tone.text}`}>{parsha.he}</span>
                    <span title={MESSAGES[locale].gematria} className={GEMATRIA}>
                        {MESSAGES[locale].gematriaShort} {gematria(parsha.he)}
                    </span>
                </span>
            </span>
            {locale === 'he' ? null : (
                <span className="text-[clamp(13px,1.9vw,18px)] leading-tight text-mute">«{parsha.title[locale]}»</span>
            )}
            <span className="text-[clamp(12px,1.6vw,15px)] leading-tight text-faint">
                <bdi dir="ltr">{formatRange(parsha.range)}</bdi>
                {face.sizes ? null : ` · ${sizeLabel(parsha.verses, parsha.sizeRank, 'verses', locale)}`}
            </span>
            {inGame ? null : (
                <CellFloors parsha={parsha} layers={layers} locale={locale} chip={tone.chip} large={false} />
            )}
            {face.sizes ? <span className="mt-auto" /> : null}
            {face.sizes ? gauges(parsha, unit, tone.bar, locale) : null}
        </>
    );
};

/** Скрытая в игре клетка: номер и «?»; открытое содержимое невидимо, но держит высоту клетки. */
const hiddenFace = (parsha: IParsha, face: IFace, text: string): ReactNode => (
    <>
        <span className="invisible flex min-w-0 flex-1 flex-col">{openFace(parsha, face)}</span>
        <span className={`absolute start-1 top-1 sm:start-2 sm:top-2 ${NUMBER} ${text}`}>{parsha.ordinal}</span>
        <span className="absolute inset-0 flex items-center justify-center text-xl text-faint">?</span>
    </>
);

/** Клетка недельной главы: номер, иврит первой строкой, перевод, размер, этажи. */
export class ParshaCell extends ScopedAntiHookComponent<IParshaCellProps> {
    /** В раунде — ответ; по отгаданной главе, после раунда и вне игры — карточка главы. */
    @bind
    protected onClick(): void {
        // В раунде клик по неотгаданной главе — ответ; по отгаданной и после раунда — просмотр главы.
        const game = this.resolve(gameToken);
        if (game.pick(this.props.index) !== 'ignored') return;
        this.resolve(selectionToken).openParsha(this.props.index);
    }

    /** Клетка таблицы. */
    public render(): ReactNode {
        const {index} = this.props;
        const parsha = PARSHIOT[index]!;
        const tone = TONES[BOOKS[parsha.book]!.tone];
        const prefs = this.useCarburetor(this.resolve(prefsToken));
        const {view} = this.useCarburetor(this.resolve(navToken));
        const {locale} = prefs;
        // Слои — только в обзоре; мера размера выбирается в разделе «Статистика».
        const layers = view === 'overview' ? copyLayers(prefs.layers) : NO_LAYERS;
        const unit: Measure = view === 'sizes' ? prefs.sizeBy : 'verses';
        const game = this.useCarburetor(this.resolve(gameToken));
        const playing = game.status === 'playing';
        const inGame = playing || game.status === 'done';
        const outside = inGame && game.active[index] !== true;
        const guessed = game.guessed[index] === true;
        const wrong = playing && game.lastWrong === index;
        const justRight = playing && game.lastRight === index;
        // «По сюжету» — главы видны; «место» — скрыты, отгаданные открыты по опции, только что отвеченная — открыта.
        const open = wrong || justRight || (guessed && game.setup.reveal);
        const hidden = playing && game.setup.mode === 'place' && !outside && !open;
        // Рамка отгаданной главы — до конца раунда.
        const mark = wrong ? WRONG : inGame && guessed ? FOUND : '';
        const state = outside ? OUTSIDE : mark;
        const face: IFace = {locale, layers, inGame, unit, sizes: view === 'sizes'};
        const name = hidden ? MESSAGES[locale].hidden : parsha.translit.en;
        const label = `${parsha.ordinal}. ${name}`;
        return (
            <button
                type="button"
                onClick={this.onClick}
                aria-label={label}
                aria-hidden={outside}
                dir={textDir(locale)}
                tabIndex={outside ? -1 : undefined}
                className={`glass relative flex min-h-16 min-w-0 cursor-pointer flex-col overflow-hidden rounded-xl
                    border p-1 ${WRAP} duration-200 sm:min-h-20 sm:p-2 ${tone.cell} ${state}`}
            >
                {hidden ? hiddenFace(parsha, face, tone.text) : openFace(parsha, face)}
                {inGame && guessed && !wrong ? GUESSED_MARK : null}
            </button>
        );
    }
}
