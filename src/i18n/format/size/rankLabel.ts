import type {Locale} from '#src/i18n/locales.ts';
import type {SizeUnit} from './units.ts';

const RU_BY: Record<SizeUnit, string> = {verses: 'стихам', words: 'словам', letters: 'буквам'};
const EN_BY: Record<SizeUnit, string> = {verses: 'by verses', words: 'by words', letters: 'by letters'};
const HE_BY: Record<SizeUnit, string> = {verses: 'בפסוקים', words: 'במילים', letters: 'באותיות'};

/** Место главы по мере: «1-я по стихам», «#1 by verses», «מקום 1 בפסוקים». */
export const rankLabel = (rank: number, unit: SizeUnit, locale: Locale): string => {
    if (locale === 'he') return `מקום ${rank} ${HE_BY[unit]}`;
    if (locale === 'ru') return `${rank}-я по ${RU_BY[unit]}`;
    return `#${rank} ${EN_BY[unit]}`;
};
