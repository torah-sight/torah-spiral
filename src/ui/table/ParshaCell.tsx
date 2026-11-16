import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {formatRange} from '#src/domain/ranges/formatRange.ts';
import {sizeLabel} from '#src/i18n/format/size/sizeLabel.ts';
import type {SizeUnit} from '#src/i18n/format/size/units.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {textDir} from '#src/i18n/format/textDir.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {navToken} from '#src/stores/nav/navToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';
import {TONES} from '#src/ui/common/tones.ts';
import {CellFloors} from './CellFloors.tsx';
import {measure} from './size/measure.ts';
import {SizeGauge} from './size/SizeGauge.tsx';

/** Свойства клетки. */
export interface IParshaCellProps {
    index: number;
}

/** Узкие клетки на телефоне: перенос длинных слов вместо вылезания за край. */
const WRAP = 'text-start [overflow-wrap:anywhere] hyphens-auto transition';
const TITLE = 'text-[clamp(18px,3.2vw,32px)] leading-tight';
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


/** Что видно в открытой клетке. */
interface IFace {
    locale: Locale;
    floor: number;
    inGame: boolean;
    unit: SizeUnit;
    /** Раздел «Размеры»: градусники стихов и слов (и букв для этой меры) вместо строки размера. */
    sizes: boolean;
}

/** Градусники «Размеров»: стихи и слова всегда, буквы — для этой меры; выбранная мера ярче. */
const gauges = (parsha: IParsha, unit: SizeUnit, bar: string, locale: Locale): ReactNode => (
    <span className="mt-1.5 block space-y-1.5">
        <SizeGauge parsha={parsha} unit="verses" active={unit === 'verses'} bar={bar} locale={locale} />
        <SizeGauge parsha={parsha} unit="words" active={unit === 'words'} bar={bar} locale={locale} />
        {unit === 'letters' ? <SizeGauge parsha={parsha} unit="letters" active bar={bar} locale={locale} /> : null}
    </span>
);


/** Открытая клетка: номер, иврит, перевод, диапазон, размер, этажи. */
const openFace = (parsha: IParsha, face: IFace): ReactNode => {
    const {locale, floor, inGame, unit} = face;
    const tone = TONES[BOOKS[parsha.book]!.tone];
    const size = measure(parsha, unit);
    return (
        <>
            <span className="flex items-start justify-between gap-1">
                <span className={`${NUMBER} ${tone.text}`}>{parsha.ordinal}</span>
                <span dir="rtl" className={`font-hebrew ${TITLE} ${tone.text}`}>{parsha.he}</span>
            </span>
            {locale === 'he' ? null : (
                <span className="text-[clamp(13px,1.9vw,18px)] leading-tight text-ink">
                    {parsha.translit[locale]} <span className="text-mute">· «{parsha.title[locale]}»</span>
                </span>
            )}
            <span className="text-[clamp(12px,1.6vw,15px)] leading-tight text-faint">
                <bdi dir="ltr">{formatRange(parsha.range)}</bdi>
                {face.sizes ? null : ` · ${sizeLabel(size.count, size.rank, unit, locale)}`}
            </span>
            {inGame ? null : (
                <CellFloors parsha={parsha} floor={floor} locale={locale} chip={tone.chip} large={false} />
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
        // Этажи — только в обзоре; мера размера выбирается в разделе «Размеры».
        const floor = view === 'overview' ? prefs.floor : 0;
        const unit: SizeUnit = view === 'sizes' ? prefs.sizeBy : 'verses';
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
        const face: IFace = {locale, floor, inGame, unit, sizes: view === 'sizes'};
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
                className={`glass relative flex min-h-16 min-w-0 flex-col overflow-hidden rounded-xl border p-1 ${WRAP}
                    duration-200 sm:min-h-20 sm:p-2 ${tone.cell} ${state}`}
            >
                {hidden ? hiddenFace(parsha, face, tone.text) : openFace(parsha, face)}
                {inGame && guessed && !wrong ? GUESSED_MARK : null}
            </button>
        );
    }
}
