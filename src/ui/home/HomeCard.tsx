import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {View} from '#src/stores/nav/NavStore.ts';

/** Свойства карточки режима. */
export interface IHomeCardProps {
    view: View;
    icon: string;
    title: string;
    text: string;
    /** Цвет заголовка — цвет книги (номер от 0 до 4). */
    book: number;
    onPick: (view: View) => void;
}

/** Большая стеклянная карточка входа в режим. */
export class HomeCard extends AntiHookComponent<IHomeCardProps> {
    /** Сообщает выбранный режим. */
    @bind
    protected onClick(): void {
        this.props.onPick(this.props.view);
    }

    /** Карточка. */
    public render(): ReactNode {
        const {icon, title, text, book} = this.props;
        return (
            <button type="button" onClick={this.onClick} className="home-card">
                <span className="home-card-icon">{icon}</span>
                <span className="home-card-body">
                    <span className="home-card-title" data-book={book}>{title}</span>
                    <span className="home-card-text">{text}</span>
                </span>
            </button>
        );
    }
}
