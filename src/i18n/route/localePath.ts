import type {Locale} from '#src/i18n/locales.ts';
import {localeFromPath} from './localeFromPath.ts';
import {pathSegments} from './pathSegments.ts';

/** Путь страницы языка: язык в пути заменяется, иначе дописывается (`/torah-spiral/` → `/torah-spiral/he/`). */
export const localePath = (pathname: string, locale: Locale): string => {
    const segments = pathSegments(pathname);
    if (localeFromPath(pathname) !== null) segments.pop();
    return `/${[...segments, locale].join('/')}/`;
};
