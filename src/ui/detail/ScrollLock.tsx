import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';

/** Пока карточка на экране, страница под ней не прокручивается. */
export class ScrollLock extends AntiHookComponent {
    /** Блокировка на время жизни компонента. */
    protected useEffects(): void {
        this.useEffect('lock', this.lock, []);
    }

    /** Запрещает прокрутку страницы. */
    @bind
    protected lock(): () => void {
        document.documentElement.classList.add('overflow-hidden');
        return this.unlock;
    }

    /** Возвращает прокрутку страницы. */
    @bind
    protected unlock(): void {
        document.documentElement.classList.remove('overflow-hidden');
    }

    /** Ничего не рисует. */
    public render(): ReactNode {
        return null;
    }
}
