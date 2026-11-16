import type {Locale} from '#src/i18n/locales.ts';

/** Короткое место главы у шкалы: «14-я», «#14», «מקום 14». */
export const rankShort = (rank: number, locale: Locale): string => {
    if (locale === 'he') return `מקום ${rank}`;
    if (locale === 'ru') return `${rank}-я`;
    return `#${rank}`;
};
