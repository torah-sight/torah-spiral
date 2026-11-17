import type {IRepeatSpan} from '#src/domain/density/model/types.ts';
import type {Quotas} from '#src/domain/density/quotas/floors.ts';
import type {NameKey} from '#src/domain/names/types.ts';
import type {IVerseRange} from '#src/domain/ranges/parseRef.ts';
import type {Locale, Localized} from '#src/i18n/locales.ts';

/** Термин: иврит (как в тексте Торы), русский, английский. */
export type Term = readonly [he: string, ru: string, en: string];

/** Авторский контент главы. */
export interface IParshaText {
    /** Имя главы в Sefaria — ключ связи с расчётом плотности. */
    slug: string;
    /** Название на иврите с огласовками. */
    he: string;
    /** Транслитерация названия. */
    translit: Omit<Localized, 'he'>;
    /** Перевод названия. */
    title: Omit<Localized, 'he'>;
    names: readonly Term[];
    /** Ключевые фразы: иврит дословно из текста главы и перевод. */
    phrases: readonly Term[];
    /** Очень краткий сюжет: предложения на каждом языке. */
    story: Record<Locale, readonly string[]>;
}

/** Откуда название главы: стих, где стоит слово, и к чему оно относится. */
export interface IOrigin {
    /** Имя главы в Sefaria — проверка порядка. */
    slug: string;
    /** Стих в книге: «глава:стих». */
    ref: string;
    note: Localized;
}

/** Книга Торы. */
export interface IBook {
    /** Название на иврите с огласовками. */
    he: string;
    translit: Omit<Localized, 'he'>;
    /** Буквальный перевод названия (Шмот — «Имена»). */
    literal: Omit<Localized, 'he'>;
    /** Привычное название (Исход). */
    common: Omit<Localized, 'he'>;
    /** Ключ цветовой темы книги. */
    tone: 'cyan' | 'violet' | 'amber' | 'emerald' | 'rose';
}

/** О книге: откуда название, что значит привычное имя, сюжет. */
export interface IBookAbout {
    /** Стих названия: «глава:стих». */
    ref: string;
    /** Откуда название и привычное имя. */
    note: Localized;
    /** Сюжет книги: предложения на каждом языке. */
    story: Record<Locale, readonly string[]>;
}

/** Глава с расчётом плотности и ёмкостью этажей. */
export interface IParsha extends IParshaText {
    /** Индекс 0–53. */
    index: number;
    /** Порядковый номер 1–54. */
    ordinal: number;
    book: number;
    /** Диапазон стихов (Sefaria). */
    ref: string;
    /** Диапазон глав и стихов книги. */
    range: IVerseRange;
    /** Число стихов — размер главы. */
    verses: number;
    /** Место по размеру: 1 — самая большая (по стихам, при равенстве — по словам). */
    sizeRank: number;
    /** Место по числу слов: 1 — самая большая (при равенстве — по стихам). */
    wordRank: number;
    /** Число букв (ктив). */
    letters: number;
    /** Место по числу букв: 1 — самая большая. */
    letterRank: number;
    /** Число слов текста главы. */
    raw: number;
    effective: number;
    spans: readonly IRepeatSpan[];
    quotas: Quotas;
    origin: IOrigin;
    /** Сколько раз стоит каждое святое Имя (только нестираемые вхождения). */
    holy: Record<NameKey, number>;
    /** Место по каждому Имени: 1 — больше всех; при равенстве место общее. */
    holyRanks: Record<NameKey, number>;
}

/** Охват книги: номера глав и номера недельных глав. */
export interface IBookSpan {
    firstChapter: number;
    lastChapter: number;
    firstOrdinal: number;
    lastOrdinal: number;
}
