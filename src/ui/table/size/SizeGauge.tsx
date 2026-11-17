import {AntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha} from '#src/content/model/types.ts';
import {countLabel} from '#src/i18n/format/size/countLabel.ts';
import {rankShort} from '#src/i18n/format/size/rankShort.ts';
import type {Measure} from '#src/i18n/format/size/units.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {measure} from './measure.ts';
import {hintOf} from './sizeHint.ts';
import {SIZE_MAX} from './sizeMax.ts';

/** Свойства градусника. */
export interface ISizeGaugeProps {
    parsha: IParsha;
    unit: Measure;
    /** Мера, выбранная для сортировки: ярче и толще. */
    active: boolean;
    bar: string;
    locale: Locale;
}

const CAPTION = 'flex items-baseline justify-between gap-1 text-[clamp(11px,1.5vw,15px)] leading-tight';

/** Градусник меры: заголовок «176 стихов · место», шкала от самой большой главы (вся шкала). */
export class SizeGauge extends AntiHookComponent<ISizeGaugeProps> {
    /** Заголовок и шкала. */
    public render(): ReactNode {
        const {parsha, unit, active, bar, locale} = this.props;
        const {count, rank} = measure(parsha, unit);
        const width = (count / SIZE_MAX[unit]) * 100;
        const fill = active ? bar : `${bar} opacity-50`;
        return (
            <span title={hintOf(unit, locale)} className="block">
                <span className={`${CAPTION} ${active ? 'font-semibold text-ink' : 'text-mute'}`}>
                    <span>{countLabel(count, unit, locale)}</span>
                    <span className="tabular-nums text-faint">{rankShort(rank, locale)}</span>
                </span>
                <span className="mt-0.5 flex items-center">
                    <span className={`z-10 shrink-0 rounded-full ${active ? 'size-3' : 'size-2.5'} ${fill}`} />
                    <span
                        className={`gauge-ticks relative -ms-1 block flex-1 overflow-hidden rounded-e-full bg-veil
                            ring-1 ring-inset ring-line ${active ? 'h-2' : 'h-1.5'}`}
                    >
                        <span
                            className={`absolute inset-y-0 start-0 rounded-e-full ${fill}`}
                            style={{width: `${width}%`}}
                        />
                    </span>
                </span>
            </span>
        );
    }
}
