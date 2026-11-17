import {LOCALES, type Locale} from '#src/i18n/locales.ts';
import {pathSegments} from './pathSegments.ts';

const isLocale = (value: string | undefined): value is Locale => LOCALES.some((locale) => locale === value);

/** Язык из последнего сегмента пути (`/torah-spiral/en/` → en); нет языка — null. */
export const localeFromPath = (pathname: string): Locale | null => {
    const last = pathSegments(pathname).at(-1);
    return isLocale(last) ? last : null;
};
