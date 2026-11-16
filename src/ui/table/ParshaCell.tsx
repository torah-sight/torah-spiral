import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {formatRange} from '#src/domain/ranges/formatRange.ts';
import {countLabel} from '#src/i18n/format/size/countLabel.ts';
import {rankLabel} from '#src/i18n/format/size/rankLabel.ts';
import {sizeLabel} from '#src/i18n/format/size/sizeLabel.ts';
import type {SizeUnit} from '#src/i18n/format/size/units.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {navToken} from '#src/stores/nav/navToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';
import {TONES} from '#src/ui/common/tones.ts';
import {CellFloors} from './CellFloors.tsx';
import {SizeBar} from './SizeBar.tsx';

/** Свойства клетки. */
export interface IParshaCellProps {
    index: number;
}

/** Узкие клетки на телефоне: перенос длинных слов вместо вылезания за край. */
const WRAP = 'text-start [overflow-wrap:anywhere] hyphens-auto transition';
const TITLE = 'text-[clamp(18px,3.2vw,32px)] leading-tight';
const NUMBER = 'text-[13px] font-semibold opacity-80 sm:text-sm';
const WRONG = 'ring-2 ring-rose-400/90 shadow-[0_0_24px_-4px_rgba(244,63,94,0.95)] animate-wrong';
const FOUND = 'ring-2 ring-emerald-400/90 dark:ring-emerald-300/80 shadow-[0_0_20px_-6px_rgba(52,211,153,0.9)]';
/** Глава вне раунда скрыта, но держит своё место в сетке. */
const OUTSIDE = 'invisible pointer-events-none';

/** Скрытая в игре клетка: только номер главы. */
const hiddenFace = (parsha: IParsha, text: string): ReactNode => {
    return (
        <>
            <span className={`${NUMBER} ${text}`}>{parsha.ordinal}</span>
            <span className="m-auto text-xl text-faint">?</span>
        </>
    );
};

/** Размер главы в выбранной мере и её место по ней. */
const measure = (parsha: IParsha, unit: SizeUnit): {count: number; rank: number} => {
    if (unit === 'words') return {count: parsha.raw, rank: parsha.wordRank};
    if (unit === 'letters') return {count: parsha.letters, rank: parsha.letterRank};
    return {count: parsha.verses, rank: parsha.sizeRank};
};

const HINT: Record<SizeUnit, 'sizeHint' | 'wordsHint' | 'lettersHint'> = {
    verses: 'sizeHint',
    words: 'wordsHint',
    letters: 'lettersHint'
};

/** Что видно в открытой клетке. */
interface IFace {
    locale: Locale;
    floor: number;
    inGame: boolean;
    unit: SizeUnit;
    /** Раздел «Размеры»: всегда стихи и слова (и буквы для этой меры) и место по мере. */
    sizes: boolean;
}

/** Подпись размера: в «Размерах» — стихи, слова [, буквы] и место; иначе — стихи и место. */
const sizeText = (parsha: IParsha, {locale, unit, sizes}: IFace): string => {
    const size = measure(parsha, unit);
    if (!sizes) return sizeLabel(size.count, size.rank, unit, locale);
    const parts = [countLabel(parsha.verses, 'verses', locale), countLabel(parsha.raw, 'words', locale)];
    if (unit === 'letters') parts.push(countLabel(parsha.letters, 'letters', locale));
    parts.push(rankLabel(size.rank, unit, locale));
    return parts.join(' · ');
};

/** Открытая клетка: номер, иврит, перевод, диапазон, размер, этажи. */
const openFace = (parsha: IParsha, face: IFace): ReactNode => {
    const {locale, floor, inGame, unit} = face;
    const tone = TONES[BOOKS[parsha.book]!.tone];
    const size = measure(parsha, unit);
    const t = MESSAGES[locale];
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
                <bdi dir="ltr">{formatRange(parsha.range)}</bdi> · {sizeText(parsha, face)}
            </span>
            {inGame ? null : (
                <CellFloors parsha={parsha} floor={floor} locale={locale} chip={tone.chip} large={false} />
            )}
            <span className="mt-auto" />
            <SizeBar
                value={size.count}
                unit={unit}
                bar={tone.bar}
                title={t[HINT[unit]]}
            />
        </>
    );
};

/** Клетка недельной главы: номер, иврит первой строкой, перевод, размер, этажи. */
export class ParshaCell extends ScopedAntiHookComponent<IParshaCellProps> {
    /** В игре — ответ, иначе — карточка главы. */
    @bind
    protected onClick(): void {
        const game = this.resolve(gameToken);
        if (game.isPlaying()) game.pick(this.props.index);
        else this.resolve(selectionToken).openParsha(this.props.index);
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
                tabIndex={outside ? -1 : undefined}
                className={`glass flex min-h-16 min-w-0 flex-col overflow-hidden rounded-xl border p-1 ${WRAP}
                    duration-200 sm:min-h-20 sm:p-2 ${tone.cell} ${state}`}
            >
                {hidden ? hiddenFace(parsha, tone.text) : openFace(parsha, face)}
            </button>
        );
    }
}
