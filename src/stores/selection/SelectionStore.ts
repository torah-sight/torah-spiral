import {Carburetor, bind} from '@react-carburetor/core';

/** Открытая карточка главы. */
export interface ISelection {
    /** Индекс главы 0–53 или null. */
    open: number | null;
}

/** Последний индекс: 54 недельные главы. */
const LAST = 53;

const setOpen = (draft: ISelection, open: number | null): void => {
    draft.open = open;
};

const stepOpen = (draft: ISelection, delta: number): void => {
    if (draft.open === null) return;
    draft.open = Math.min(LAST, Math.max(0, draft.open + delta));
};

/** Какая глава раскрыта в карточке. */
export class SelectionStore extends Carburetor<ISelection> {
    /** Ничего не открыто. */
    public constructor() {
        super({open: null});
    }

    /** Открывает карточку главы. */
    public openParsha(index: number): void {
        this.update(setOpen, index);
    }

    /** Листает открытую карточку: +1 — следующая глава, −1 — предыдущая; на краях стоит. */
    public step(delta: number): void {
        this.update(stepOpen, delta);
    }

    /** Закрывает карточку. */
    @bind
    public close(): void {
        this.update(setOpen, null);
    }
}
