import {Carburetor, bind} from '@react-carburetor/core';
import type {Layers} from '#src/stores/prefs/PrefsStore.ts';

/** Открытая карточка: глава или книга. */
export interface ISelection {
    /** Индекс главы 0–53 или null. */
    open: number | null;
    /** Индекс книги 0–4 или null. */
    book: number | null;
    /** Слои, выбранные в карточке главы; null — по умолчанию (как в таблице обзора или все). */
    layers: Layers | null;
}

/** Последний индекс: 54 недельные главы. */
const LAST = 53;

const setOpen = (draft: ISelection, open: number | null): void => {
    draft.open = open;
    draft.book = null;
    draft.layers = null;
};

const setBook = (draft: ISelection, book: number): void => {
    draft.open = null;
    draft.book = book;
    draft.layers = null;
};

const setLayers = (draft: ISelection, layers: Layers): void => {
    draft.layers = {...layers};
};

const stepOpen = (draft: ISelection, delta: number): void => {
    if (draft.open === null) return;
    draft.open = Math.min(LAST, Math.max(0, draft.open + delta));
};

/** Какая глава или книга раскрыта в карточке. */
export class SelectionStore extends Carburetor<ISelection> {
    /** Ничего не открыто. */
    public constructor() {
        super({open: null, book: null, layers: null});
    }

    /** Открывает карточку главы (карточка книги закрывается). */
    public openParsha(index: number): void {
        this.update(setOpen, index);
    }

    /** Открывает карточку книги. */
    public openBook(book: number): void {
        this.update(setBook, book);
    }

    /** Слои карточки главы; держатся при листании, сбрасываются при открытии и закрытии. */
    @bind
    public setLayers(layers: Layers): void {
        this.update(setLayers, layers);
    }

    /** Листает открытую карточку: +1 — следующая глава, −1 — предыдущая; на краях стоит. */
    public step(delta: number): void {
        this.update(stepOpen, delta);
    }

    /** Закрывает любую карточку. */
    @bind
    public close(): void {
        this.update(setOpen, null);
    }
}
