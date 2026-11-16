import type {Term} from '#src/content/model/types.ts';
import type {Locale} from '#src/i18n/locales.ts';

/** Перевод термина; для иврита — пусто (оригинал показывается отдельно). */
export const termTranslation = (term: Term, locale: Locale): string => {
    if (locale === 'he') return '';
    return locale === 'ru' ? term[1] : term[2];
};
