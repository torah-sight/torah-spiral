import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';

/** Свойства кнопки-переключателя. */
export interface IToggleButtonProps<V> {
    value: V;
    active: boolean;
    label: ReactNode;
    title?: string;
    /** Растянуть кнопку на две колонки сетки (на телефоне). */
    wide?: boolean;
    onPick: (value: V) => void;
}

/** Кнопка группы переключателей; выбранная помечена `aria-pressed`, по нему стиль и меняет цвет. */
export class ToggleButton<V> extends AntiHookComponent<IToggleButtonProps<V>> {
    /** Сообщает выбранное значение. */
    @bind
    protected onClick(): void {
        this.props.onPick(this.props.value);
    }

    /** Кнопка. */
    public render(): ReactNode {
        return (
            <button
                type="button"
                title={this.props.title}
                aria-pressed={this.props.active}
                onClick={this.onClick}
                className={this.props.wide === true ? 'toggle-button-wide' : 'toggle-button'}
            >
                {this.props.label}
            </button>
        );
    }
}
