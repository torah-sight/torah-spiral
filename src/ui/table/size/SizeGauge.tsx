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
    locale: Locale;
}

/** Градусник меры: заголовок «176 стихов · место», гладкая шкала от самой большой главы (вся шкала). */
export class SizeGauge extends AntiHookComponent<ISizeGaugeProps> {
    /** Заголовок и шкала. */
    public render(): ReactNode {
        const {parsha, unit, active, locale} = this.props;
        const {count, rank} = measure(parsha, unit);
        const width = (count / SIZE_MAX[unit]) * 100;
        return (
            <span title={hintOf(unit, locale)} className="gauge-row">
                <span className={active ? 'gauge-caption-active' : 'gauge-caption'}>
                    <span>{countLabel(count, unit, locale)}</span>
                    <span className="gauge-rank">{rankShort(rank, locale)}</span>
                </span>
                <span className={active ? 'gauge-line' : 'gauge-line-dim'}>
                    <span className={active ? 'gauge-track-active' : 'gauge-track'}>
                        <span className="gauge-fill" data-book={parsha.book} style={{width: `${width}%`}} />
                    </span>
                </span>
            </span>
        );
    }
}
