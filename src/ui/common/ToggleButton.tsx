import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';

/** Свойства кнопки-переключателя. */
export interface IToggleButtonProps<V> {
    value: V;
    active: boolean;
    label: ReactNode;
    title?: string;
    onPick: (value: V) => void;
}

const ACTIVE = 'bg-cyan-400/20 text-cyan-900 dark:text-cyan-50 border-cyan-500/60 dark:border-cyan-300/60 '
    + 'shadow-[0_0_18px_-4px_rgba(34,211,238,0.8)]';
const IDLE = 'bg-veil text-soft border-line hover:text-ink hover:border-line-strong';

/** Кнопка группы переключателей: матовое стекло, активная — с неоном. */
export class ToggleButton<V> extends AntiHookComponent<IToggleButtonProps<V>> {
    /** Сообщает выбранное значение. */
    @bind
    protected onClick(): void {
        this.props.onPick(this.props.value);
    }

    /** Кнопка. */
    public render(): ReactNode {
        const state = this.props.active ? ACTIVE : IDLE;
        return (
            <button
                type="button"
                title={this.props.title}
                aria-pressed={this.props.active}
                onClick={this.onClick}
                className={`rounded-lg border px-2.5 py-1 text-sm sm:text-base transition ${state}`}
            >
                {this.props.label}
            </button>
        );
    }
}
