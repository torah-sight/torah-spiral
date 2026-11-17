import {Carburetor, bind} from '@react-carburetor/core';

/** Открытая карточка: глава или книга. */
export interface ISelection {
    /** Индекс главы 0–53 или null. */
    open: number | null;
    /** Индекс книги 0–4 или null. */
    book: number | null;
    /** Этаж, выбранный в карточке главы; null — этаж по умолчанию (таблицы или верхний). */
    floor: number | null;
}

/** Верхний этаж. */
const TOP_FLOOR = 3;

/** Последний индекс: 54 недельные главы. */
const LAST = 53;

const setOpen = (draft: ISelection, open: number | null): void => {
    draft.open = open;
    draft.book = null;
    draft.floor = null;
};

const setBook = (draft: ISelection, book: number): void => {
    draft.open = null;
    draft.book = book;
    draft.floor = null;
};

const setFloor = (draft: ISelection, floor: number): void => {
    draft.floor = Math.min(TOP_FLOOR, Math.max(0, Math.round(floor)));
};

const stepOpen = (draft: ISelection, delta: number): void => {
    if (draft.open === null) return;
    draft.open = Math.min(LAST, Math.max(0, draft.open + delta));
};

/** Какая глава или книга раскрыта в карточке. */
export class SelectionStore extends Carburetor<ISelection> {
    /** Ничего не открыто. */
    public constructor() {
        super({open: null, book: null, floor: null});
    }

    /** Открывает карточку главы (карточка книги закрывается). */
    public openParsha(index: number): void {
        this.update(setOpen, index);
    }

    /** Открывает карточку книги. */
    public openBook(book: number): void {
        this.update(setBook, book);
    }

    /** Этаж карточки главы; держится при листании, сбрасывается при открытии и закрытии. */
    @bind
    public setFloor(floor: number): void {
        this.update(setFloor, floor);
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
