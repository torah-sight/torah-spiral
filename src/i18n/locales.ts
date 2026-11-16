/** Языки интерфейса: иврит, русский, английский. */
export const LOCALES = ['he', 'ru', 'en'] as const;

/** Язык интерфейса. */
export type Locale = (typeof LOCALES)[number];

/** Строка на каждом языке. */
export type Localized = Record<Locale, string>;
