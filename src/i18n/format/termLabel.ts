import type {Term} from '#src/content/model/types.ts';
import type {Locale} from '#src/i18n/locales.ts';

/** First Strong Isolate и Pop Directional Isolate. */
const FSI = String.fromCodePoint(0x20_68);
const PDI = String.fromCodePoint(0x20_69);

/** Изоляция направления: иврит не переворачивает скобки вокруг себя. */
const isolate = (he: string): string => `${FSI}${he}${PDI}`;

/** Имя/слово: на иврите — как есть, иначе «перевод (иврит)». */
export const termLabel = (term: Term, locale: Locale): string => {
    if (locale === 'he') return term[0];
    return `${locale === 'ru' ? term[1] : term[2]} (${isolate(term[0])})`;
};
