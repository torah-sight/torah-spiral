import {Carburetor} from '@react-carburetor/core';
import {FLOORS, type Floor} from '#src/domain/density/quotas/floors.ts';
import type {Measure} from '#src/i18n/format/size/units.ts';
import type {Locale} from '#src/i18n/locales.ts';

/** Мера таблицы «Статистика»: святое Имя или размер главы. */
export type SizeBy = Measure;

/** Какие слои поверх названий открыты: имена, фразы, сюжет — каждый сам по себе. */
export type Layers = Record<Floor, boolean>;

/** Цветовая тема. */
export type Theme = 'light' | 'dark';

/** Настройки пользователя (сохраняются в localStorage). */
export interface IPrefs {
    locale: Locale;
    /** Слои клеток обзора; названия видны всегда. */
    layers: Layers;
    theme: Theme;
    sizeBy: SizeBy;
}

const setLocale = (draft: IPrefs, locale: Locale): void => {
    draft.locale = locale;
};

const setLayers = (draft: IPrefs, layers: Layers): void => {
    for (const layer of FLOORS) draft.layers[layer] = layers[layer];
};

const setSizeBy = (draft: IPrefs, sizeBy: SizeBy): void => {
    draft.sizeBy = sizeBy;
};

const setTheme = (draft: IPrefs, theme: Theme): void => {
    draft.theme = theme;
};

/** Язык, слои, тема и мера размера. */
export class PrefsStore extends Carburetor<IPrefs> {
    /** Русский, только названия, светлая тема, топ по четырёхбуквенному Имени. */
    public constructor() {
        super({
            locale: 'ru', layers: {names: false, phrases: false, story: false}, theme: 'light',
            sizeBy: 'havaya'
        });
    }

    /** Меняет язык интерфейса. */
    public setLocale(locale: Locale): void {
        this.update(setLocale, locale);
    }

    /** Задаёт слои клеток обзора. */
    public setLayers(layers: Layers): void {
        this.update(setLayers, layers);
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
