import {PARSHIOT} from '#src/content/parshiot.ts';
import type {Measure} from '#src/i18n/format/size/units.ts';
import {measure} from './measure.ts';
import {MEASURES} from './measures.ts';

const maxOf = (unit: Measure): number => {
    let top = 1;
    for (const parsha of PARSHIOT) top = Math.max(top, measure(parsha, unit).count);
    return top;
};

/** Наибольшее значение каждой меры среди глав — полная шкала. */
export const SIZE_MAX = Object.fromEntries(
    MEASURES.map((unit: Measure): [Measure, number] => [unit, maxOf(unit)])
) as Record<Measure, number>;
