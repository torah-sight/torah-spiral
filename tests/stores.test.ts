import {describe, expect, it} from '@rstest/core';
import type {IStorageLike} from '@react-carburetor/core';
import {flush} from '@react-carburetor/core/testing';
import {NavStore} from '#src/stores/nav/NavStore.ts';
import {PrefsStore} from '#src/stores/prefs/PrefsStore.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {createAppScope} from '#src/stores/scope/createAppScope.ts';
import {SelectionStore} from '#src/stores/selection/SelectionStore.ts';

const memoryStorage = (): IStorageLike & {items: Map<string, string>} => {
    const items = new Map<string, string>();
    return {
        items,
        getItem: (key: string): string | null => items.get(key) ?? null,
        setItem: (key: string, value: string): void => { items.set(key, value); },
        removeItem: (key: string): void => { items.delete(key); }
    };
};

describe('PrefsStore', () => {
    it('этаж ограничен 0–3, язык и раскладка меняются', () => {
        const prefs = new PrefsStore();
        prefs.setFloor(9);
        expect(prefs.getData().floor).toBe(3);
        prefs.setFloor(-3);
        expect(prefs.getData().floor).toBe(0);
        prefs.setLocale('he');
        prefs.setLayout('books');
        expect(prefs.getData()).toEqual({locale: 'he', layout: 'books', floor: 0, theme: 'light', sizeBy: 'havaya'});
        prefs.setSizeBy('words');
        expect(prefs.getData().sizeBy).toBe('words');
    });

    it('тема по умолчанию светлая и переключается', () => {
        const prefs = new PrefsStore();
        expect(prefs.getData().theme).toBe('light');
        prefs.setTheme('dark');
        expect(prefs.getData().theme).toBe('dark');
    });
});

describe('NavStore', () => {
    it('на входе — стартовый экран; переходы между разделами', () => {
        const nav = new NavStore();
        expect(nav.getData().view).toBe('home');
        nav.go('sizes');
        expect(nav.getData().view).toBe('sizes');
        nav.home();
        expect(nav.getData().view).toBe('home');
    });
});

describe('SelectionStore', () => {
    it('открывает и закрывает карточку главы', () => {
        const selection = new SelectionStore();
        selection.openParsha(34);
        expect(selection.getData().open).toBe(34);
        selection.step(1);
        expect(selection.getData().open).toBe(35);
        selection.openParsha(53);
        selection.step(1);
        expect(selection.getData().open).toBe(53);
        selection.openParsha(0);
        selection.step(-1);
        expect(selection.getData().open).toBe(0);
        selection.close();
        selection.step(1);
        expect(selection.getData().open).toBeNull();
    });

    it('карточка книги и карточка главы не открыты вместе', () => {
        const selection = new SelectionStore();
        selection.openBook(2);
        expect(selection.getData()).toEqual({open: null, book: 2});
        selection.openParsha(24);
        expect(selection.getData()).toEqual({open: 24, book: null});
        selection.openBook(4);
        selection.close();
        expect(selection.getData()).toEqual({open: null, book: null});
    });
});

describe('createAppScope', () => {
    it('сохраняет настройки в хранилище и восстанавливает их в новом scope', () => {
        const storage = memoryStorage();
        const first = createAppScope(storage);
        try {
            const prefs = first.scope.get(prefsToken);
            prefs.setFloor(3);
            prefs.setLocale('en');
            prefs.setTheme('dark');
            flush(prefs);
        } finally {
            first.dispose();
        }
        expect(storage.items.size).toBeGreaterThan(0);
        const second = createAppScope(storage);
        try {
            expect(second.scope.get(prefsToken).getData()).toEqual({
                locale: 'en', layout: 'grid', floor: 3, theme: 'dark', sizeBy: 'havaya'
            });
        } finally {
            second.dispose();
        }
    });
});
