import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';

/** Свойства списка «таблеток». */
export interface IChipsProps {
    labels: readonly string[];
    /** Цвет таблеток — цвет книги (номер от 0 до 4). */
    book: number;
}

/** Строка коротких меток: имена. */
export class Chips extends AntiHookComponent<IChipsProps> {
    /** Одна метка. */
    @bind
    protected renderChip(label: string): ReactNode {
        return <span key={label} className="name-chip" data-book={this.props.book}>{label}</span>;
    }

    /** Все метки. */
    public render(): ReactNode {
        return <div className="chip-row">{this.props.labels.map(this.renderChip)}</div>;
    }
}
