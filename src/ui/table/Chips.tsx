import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';

/** Свойства списка «таблеток». */
export interface IChipsProps {
    labels: readonly string[];
    className: string;
}

/** Строка коротких меток: имена. */
export class Chips extends AntiHookComponent<IChipsProps> {
    /** Одна метка. */
    @bind
    protected renderChip(label: string): ReactNode {
        return <span key={label} className={`rounded-md border px-1 py-px ${this.props.className}`}>{label}</span>;
    }

    /** Все метки. */
    public render(): ReactNode {
        return <div className="flex flex-wrap gap-0.5 sm:gap-1">{this.props.labels.map(this.renderChip)}</div>;
    }
}
