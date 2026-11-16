import {PARSHIOT} from '#src/content/parshiot.ts';
import type {SizeUnit} from '#src/i18n/format/size/units.ts';
import {measure} from './measure.ts';

const maxOf = (unit: SizeUnit): number => {
    let top = 1;
    for (const parsha of PARSHIOT) top = Math.max(top, measure(parsha, unit).count);
    return top;
};

/** Размер самой большой главы по каждой мере — полная шкала. */
export const SIZE_MAX: Record<SizeUnit, number> = {
    verses: maxOf('verses'),
    words: maxOf('words'),
    letters: maxOf('letters')
};
