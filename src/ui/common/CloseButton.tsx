import {AntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';

/** Свойства кнопки закрытия. */
export interface ICloseButtonProps {
    /** Подсказка и имя для экранного диктора. */
    label: string;
    onClose: () => void;
}

/** Круглая ✕ в углу экрана, вне карточки: не занимает места в шапке и видна при прокрутке. */
const BUTTON = 'panel fixed end-3 top-3 z-[60] flex size-11 cursor-pointer items-center justify-center rounded-full '
    + 'text-xl text-soft transition hover:text-ink sm:end-5 sm:top-4';

/** Закрывает модальную карточку. */
export class CloseButton extends AntiHookComponent<ICloseButtonProps> {
    /** Кнопка-крестик. */
    public render(): ReactNode {
        return (
            <button type="button" onClick={this.props.onClose} aria-label={this.props.label}
                title={this.props.label} className={BUTTON}>
                <span aria-hidden>✕</span>
            </button>
        );
    }
}
