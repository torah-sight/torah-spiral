import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha, Term} from '#src/content/model/types.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {termLabel} from '#src/i18n/format/termLabel.ts';
import {termTranslation} from '#src/i18n/format/termTranslation.ts';
import {Chips} from './Chips.tsx';

/** Свойства этажей главы. */
export interface ICellFloorsProps {
    parsha: IParsha;
    floor: number;
    locale: Locale;
    chip: string;
    /** Крупный шрифт для карточки, мелкий для клетки. */
    large: boolean;
}

/** Фраза — отдельная плашка: иврит от правого края, перевод под ним мельче. */
const PHRASE = 'rounded-lg border border-line bg-veil px-2 py-1';
const HEBREW = 'block font-hebrew text-[1.12em] leading-snug text-ink';
const TRANSLATION = 'mt-0.5 block text-[0.92em] leading-snug text-mute';
/** Сюжет отделён от фраз линией. */
const STORY = 'border-t border-line pt-2 leading-relaxed text-soft';

const labelsOf = (terms: readonly Term[], locale: Locale): string[] =>
    terms.map((term: Term): string => termLabel(term, locale));

/** Этажи 1–N главы: имена, фразы, краткий сюжет — по ёмкости главы. */
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

    /** Подпись этажа (только в карточке). */
    protected caption(floor: number): ReactNode {
        if (!this.props.large) return null;
        const label = MESSAGES[this.props.locale].floors[floor];
        return <h3 className="mb-1 mt-3 text-sm uppercase tracking-widest text-mute">{floor} · {label}</h3>;
    }

    /** Накопленные этажи до текущего. */
    public render(): ReactNode {
        const {parsha, floor, locale, chip, large} = this.props;
        if (floor < 1) return null;
        const size = large ? 'text-sm space-y-2' : 'text-[clamp(12px,1.7vw,16px)] leading-snug space-y-2';
        return (
            <div className={`mt-1 ${size}`}>
                {/* В карточке имена — строкой таблицы над этажами (TallyLines). */}
                {large ? null : <Chips labels={labelsOf(parsha.names, locale)} className={chip} />}
                {/* В карточке на широком экране фразы и сюжет — два столбца. */}
                <div className={large ? 'space-y-2 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:space-y-0' : 'space-y-2'}>
                    <div>
                        {floor >= 2 ? this.caption(2) : null}
                        {floor >= 2 ? <ul className="space-y-1.5">{parsha.phrases.map(this.renderPhrase)}</ul> : null}
                    </div>
                    <div>
                        {floor >= 3 ? this.caption(3) : null}
                        {floor >= 3 ? (
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
