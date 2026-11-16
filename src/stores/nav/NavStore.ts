import {Carburetor, bind} from '@react-carburetor/core';

/** Раздел приложения: стартовый экран, обзор глав, размеры глав, игра. */
export type View = 'home' | 'overview' | 'sizes' | 'game';

/** Текущий раздел (не сохраняется: на входе всегда стартовый экран). */
export interface INav {
    view: View;
}

const setView = (draft: INav, view: View): void => {
    draft.view = view;
};

/** Навигация между разделами. */
export class NavStore extends Carburetor<INav> {
    /** Начинаем со стартового экрана. */
    public constructor() {
        super({view: 'home'});
    }

    /** Переходит в раздел. */
    public go(view: View): void {
        this.update(setView, view);
    }

    /** Возвращает на стартовый экран. */
    @bind
    public home(): void {
        this.update(setView, 'home');
    }
}
