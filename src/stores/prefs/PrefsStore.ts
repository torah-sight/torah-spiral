import {Carburetor} from '@react-carburetor/core';
import type {Measure} from '#src/i18n/format/size/units.ts';
import type {Locale} from '#src/i18n/locales.ts';

/** Раскладка таблицы: сетка 6×9 или пять столбцов-книг. */
export type Layout = 'grid' | 'books';

/** Мера таблицы «Размеры»: святое Имя или размер главы. */
export type SizeBy = Measure;

/** Цветовая тема. */
export type Theme = 'light' | 'dark';

/** Настройки пользователя (сохраняются в localStorage). */
export interface IPrefs {
    locale: Locale;
    layout: Layout;
    /** Этаж раскрытия 0–4: названия, имена, слова, фразы, сюжет. */
    floor: number;
    theme: Theme;
    sizeBy: SizeBy;
}

/** Верхний этаж. */
const TOP_FLOOR = 3;

const setLocale = (draft: IPrefs, locale: Locale): void => {
    draft.locale = locale;
};

const setLayout = (draft: IPrefs, layout: Layout): void => {
    draft.layout = layout;
};

const setFloor = (draft: IPrefs, floor: number): void => {
    draft.floor = Math.min(TOP_FLOOR, Math.max(0, Math.round(floor)));
};

const setSizeBy = (draft: IPrefs, sizeBy: SizeBy): void => {
    draft.sizeBy = sizeBy;
};

const setTheme = (draft: IPrefs, theme: Theme): void => {
    draft.theme = theme;
};

/** Язык, раскладка, этаж, тема и мера размера. */
export class PrefsStore extends Carburetor<IPrefs> {
    /** Русский, сетка, нижний этаж, светлая тема, размер по стихам. */
    public constructor() {
        super({locale: 'ru', layout: 'grid', floor: 0, theme: 'light', sizeBy: 'havaya'});
    }

    /** Меняет язык интерфейса. */
    public setLocale(locale: Locale): void {
        this.update(setLocale, locale);
    }

    /** Меняет раскладку таблицы. */
    public setLayout(layout: Layout): void {
        this.update(setLayout, layout);
    }

    /** Меняет этаж (обрезается до 0–4). */
    public setFloor(floor: number): void {
        this.update(setFloor, floor);
    }

    /** Меняет меру размера: стихи или слова. */
    public setSizeBy(sizeBy: SizeBy): void {
        this.update(setSizeBy, sizeBy);
    }

    /** Меняет цветовую тему. */
    public setTheme(theme: Theme): void {
        this.update(setTheme, theme);
    }
}
