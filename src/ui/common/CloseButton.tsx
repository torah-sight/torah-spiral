import {AntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';

/** Свойства кнопки закрытия. */
export interface ICloseButtonProps {
    /** Подсказка и имя для экранного диктора. */
    label: string;
    onClose: () => void;
}

/** Закрывает модальную карточку. */
export class CloseButton extends AntiHookComponent<ICloseButtonProps> {
    /** Кнопка-крестик. */
    public render(): ReactNode {
        return (
            <button type="button" onClick={this.props.onClose} aria-label={this.props.label}
                title={this.props.label} className="close-button">
                <span aria-hidden>✕</span>
            </button>
        );
    }
}
