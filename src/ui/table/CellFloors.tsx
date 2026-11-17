import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha, Term} from '#src/content/model/types.ts';
import type {Floor} from '#src/domain/density/quotas/floors.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {termLabel} from '#src/i18n/format/termLabel.ts';
import {termTranslation} from '#src/i18n/format/termTranslation.ts';
import type {Layers} from '#src/stores/prefs/PrefsStore.ts';
import {Chips} from './Chips.tsx';

/** Свойства этажей главы. */
export interface ICellFloorsProps {
    parsha: IParsha;
    /** Какие слои показать. */
    layers: Layers;
    locale: Locale;
    chip: string;
    /** Крупный шрифт для карточки, мелкий для клетки. */
    large: boolean;
}

/** Фраза — отдельная плашка: иврит от правого края, перевод под ним мельче. */
const PHRASE = 'rounded-lg border border-line bg-veil px-2 py-1';
const HEBREW = 'block font-hebrew text-[1.12em] leading-snug text-ink';
const TRANSLATION = 'mt-0.5 block text-[0.92em] leading-snug text-mute';
/** В карточке на широком экране фразы и сюжет — два столбца, если включены оба. */
const TWO_COLUMNS = 'space-y-2 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:space-y-0';
/** Сюжет отделён от фраз линией. */
const STORY = 'border-t border-line pt-2 leading-relaxed text-soft';

const labelsOf = (terms: readonly Term[], locale: Locale): string[] =>
    terms.map((term: Term): string => termLabel(term, locale));

/** Слои главы поверх названия: имена, фразы, краткий сюжет — какие включены. */
export class CellFloors extends AntiHookComponent<ICellFloorsProps> {
    /** Фраза: иврит из текста главы и перевод. */
    @bind
    protected renderPhrase(term: Term): ReactNode {
        const translation = termTranslation(term, this.props.locale);
        return (
            <li key={term[0]} className={PHRASE}>
                <span dir="rtl" className={HEBREW}>{term[0]}</span>
                {translation ? <span className={TRANSLATION}>{translation}</span> : null}
            </li>
        );
    }

    /** Подпись слоя (только в карточке). */
    protected caption(layer: Floor): ReactNode {
        if (!this.props.large) return null;
        const label = MESSAGES[this.props.locale].floors[layer];
        return <h3 className="mb-1 mt-3 text-sm uppercase tracking-widest text-mute">{label}</h3>;
    }

    /** Накопленные этажи до текущего. */
    public render(): ReactNode {
        const {parsha, layers, locale, chip, large} = this.props;
        // В карточке имена — строкой таблицы над слоями (TallyLines).
        const names = layers.names && !large;
        if (!names && !layers.phrases && !layers.story) return null;
        const size = large ? 'text-sm space-y-2' : 'text-[clamp(12px,1.7vw,16px)] leading-snug space-y-2';
        return (
            <div className={`mt-1 ${size}`}>
                {names ? <Chips labels={labelsOf(parsha.names, locale)} className={chip} /> : null}
                <div className={large && layers.phrases && layers.story ? TWO_COLUMNS : 'space-y-2'}>
                    <div>
                        {layers.phrases ? this.caption('phrases') : null}
                        {layers.phrases ? (
                            <ul className="space-y-1.5">{parsha.phrases.map(this.renderPhrase)}</ul>
                        ) : null}
                    </div>
                    <div>
                        {layers.story ? this.caption('story') : null}
                        {layers.story ? (
                            <p className={large ? 'leading-relaxed text-soft' : STORY}>
                                {parsha.story[locale].join(' ')}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}
