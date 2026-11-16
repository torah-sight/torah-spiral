import type {Locale} from '#src/i18n/locales.ts';

/** Направление письма языка. */
export const textDir = (locale: Locale): 'rtl' | 'ltr' => (locale === 'he' ? 'rtl' : 'ltr');
