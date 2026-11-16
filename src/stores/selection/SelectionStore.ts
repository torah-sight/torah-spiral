import {Carburetor, bind} from '@react-carburetor/core';

/** Открытая карточка главы. */
export interface ISelection {
    /** Индекс главы 0–53 или null. */
    open: number | null;
}

const setOpen = (draft: ISelection, open: number | null): void => {
    draft.open = open;
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

    /** Закрывает карточку. */
    @bind
    public close(): void {
        this.update(setOpen, null);
    }
}
