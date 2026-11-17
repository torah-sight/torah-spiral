import {ScopedAntiHookComponent, bind, type TReadonly} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import type {IGameState} from '#src/domain/game/types.ts';
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
import {CellFloors} from './CellFloors.tsx';
import {SizeGauge} from './size/SizeGauge.tsx';

/** Свойства клетки. */
export interface IParshaCellProps {
    index: number;
}

/** Отгаданная глава: зелёная вуаль с рамкой и галочка поверх клетки — видно и в «сюжете», где клетки открыты. */
const FOUND_MARK: ReactNode = (
    <>
        <span aria-hidden className="cell-found" />
        <span aria-hidden className="cell-found-mark">✓</span>
    </>
);

/** Неверный ответ: рамка, которая дважды вздрагивает. */
const WRONG_MARK: ReactNode = <span aria-hidden className="cell-wrong" />;

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

/** Состояние клетки в игре. */
interface IState {
    /** Глава вне раунда: клетка держит место, но не видна. */
    outside: boolean;
    /** Режим «место»: содержимое скрыто. */
    hidden: boolean;
    guessed: boolean;
    wrong: boolean;
    inGame: boolean;
}

/** Мера-подсчёт (Имя или заповеди), а не размер главы. */
const isTally = (unit: Measure): boolean => unit !== 'verses' && unit !== 'words' && unit !== 'letters';

/** Градусники «Статистики»: выбранный подсчёт сверху, стихи и слова всегда, буквы — для этой меры. */
const gauges = (parsha: IParsha, unit: Measure, locale: Locale): ReactNode => (
    <span className="cell-gauges">
        {isTally(unit) ? <SizeGauge parsha={parsha} unit={unit} active locale={locale} /> : null}
        <SizeGauge parsha={parsha} unit="verses" active={unit === 'verses'} locale={locale} />
        <SizeGauge parsha={parsha} unit="words" active={unit === 'words'} locale={locale} />
        {unit === 'letters' ? <SizeGauge parsha={parsha} unit="letters" active locale={locale} /> : null}
    </span>
);

/** Номер и транслитерация слева — в одну строку с ивритом справа; под ивритом гематрия. */
const headOf = (parsha: IParsha, locale: Locale): ReactNode => (
    <span className="cell-head">
        <span className="cell-title-left">
            <span className="cell-number">{parsha.ordinal}</span>
            {locale === 'he' ? null : <span className="cell-translit">{parsha.translit[locale]}</span>}
        </span>
        <span className="cell-title-right">
            <span dir="rtl" className="cell-hebrew">{parsha.he}</span>
            <span title={MESSAGES[locale].gematria} className="cell-gematria">
                {MESSAGES[locale].gematriaShort} {gematria(parsha.he)}
            </span>
        </span>
    </span>
);

/** Открытая клетка: номер, иврит, перевод, диапазон, размер, этажи. */
const openFace = (parsha: IParsha, face: IFace): ReactNode => {
    const {locale, layers, inGame, unit} = face;
    return (
        <>
            {headOf(parsha, locale)}
            {locale === 'he' ? null : <span className="cell-subtitle">«{parsha.title[locale]}»</span>}
            <span className="cell-range">
                <bdi dir="ltr">{formatRange(parsha.range)}</bdi>
                {face.sizes ? null : (
                    <span className="cell-verses">
                        {` · ${sizeLabel(parsha.verses, parsha.sizeRank, 'verses', locale)}`}
                    </span>
                )}
            </span>
            {inGame ? null : <CellFloors parsha={parsha} layers={layers} locale={locale} large={false} />}
            {face.sizes ? <span className="cell-spacer" /> : null}
            {face.sizes ? gauges(parsha, unit, locale) : null}
        </>
    );
};

/** Скрытая в игре клетка: номер и «?»; открытое содержимое невидимо, но держит высоту клетки. */
const hiddenFace = (parsha: IParsha, face: IFace): ReactNode => (
    <>
        <span className="cell-ghost">{openFace(parsha, face)}</span>
        <span className="cell-corner-number">{parsha.ordinal}</span>
        <span className="cell-question">?</span>
    </>
);

/** Состояние клетки: «место» скрывает главы, «сюжет» держит открытыми; отгаданная открыта по опции. */
const stateOf = (game: TReadonly<IGameState>, index: number): IState => {
    const playing = game.status === 'playing';
    const inGame = playing || game.status === 'done';
    const outside = inGame && game.active[index] !== true;
    const guessed = game.guessed[index] === true;
    const wrong = playing && game.lastWrong === index;
    const justRight = playing && game.lastRight === index;
    const open = wrong || justRight || (guessed && game.setup.reveal);
    const hidden = playing && game.setup.mode === 'place' && !outside && !open;
    return {outside, hidden, guessed, wrong, inGame};
};

/** Отметка поверх клетки: неверный ответ, отгаданная (до конца раунда) или ничего. */
const markOf = (state: IState): ReactNode => {
    if (state.wrong) return WRONG_MARK;
    return state.inGame && state.guessed ? FOUND_MARK : null;
};

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
        const prefs = this.useCarburetor(this.resolve(prefsToken));
        const {view} = this.useCarburetor(this.resolve(navToken));
        const state = stateOf(this.useCarburetor(this.resolve(gameToken)), index);
        if (state.outside) return <span aria-hidden className="cell-void" />;
        const {locale} = prefs;
        // Слои — только в обзоре; мера размера выбирается в разделе «Статистика».
        const layers = view === 'overview' ? copyLayers(prefs.layers) : NO_LAYERS;
        const unit: Measure = view === 'sizes' ? prefs.sizeBy : 'verses';
        const face: IFace = {locale, layers, inGame: state.inGame, unit, sizes: view === 'sizes'};
        const name = state.hidden ? MESSAGES[locale].hidden : parsha.translit.en;
        return (
            <button
                type="button"
                onClick={this.onClick}
                aria-label={`${parsha.ordinal}. ${name}`}
                dir={textDir(locale)}
                data-book={parsha.book}
                className="parsha-cell"
            >
                {state.hidden ? hiddenFace(parsha, face) : openFace(parsha, face)}
                {markOf(state)}
            </button>
        );
    }
}
