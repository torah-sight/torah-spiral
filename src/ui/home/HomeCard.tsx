import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {View} from '#src/stores/nav/NavStore.ts';

/** Цвет неона карточки. */
type CardTone = 'cyan' | 'amber' | 'fuchsia';

/** Свойства карточки режима. */
export interface IHomeCardProps {
    view: View;
    icon: string;
    title: string;
    text: string;
    tone: CardTone;
    onPick: (view: View) => void;
}

const TONE: Record<CardTone, string> = {
    cyan: 'border-cyan-500/40 text-cyan-800 hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.8)] dark:border-cyan-300/30 '
        + 'dark:text-cyan-100',
    amber: 'border-amber-500/40 text-amber-800 hover:shadow-[0_0_40px_-8px_rgba(251,191,36,0.8)] dark:border-amber-300/30 '
        + 'dark:text-amber-100',
    fuchsia: 'border-fuchsia-500/40 text-fuchsia-800 hover:shadow-[0_0_40px_-8px_rgba(217,70,239,0.8)] '
        + 'dark:border-fuchsia-300/30 dark:text-fuchsia-100'
};

/** Большая стеклянная карточка входа в режим. */
export class HomeCard extends AntiHookComponent<IHomeCardProps> {
    /** Сообщает выбранный режим. */
    @bind
    protected onClick(): void {
        this.props.onPick(this.props.view);
    }

    /** Карточка. */
    public render(): ReactNode {
        const {icon, title, text, tone} = this.props;
        return (
            <button
                type="button"
                onClick={this.onClick}
                className={`glass flex min-h-44 flex-col items-start gap-2 rounded-2xl border p-5 text-start transition
                    duration-300 hover:-translate-y-1 ${TONE[tone]}`}
            >
                <span className="text-4xl">{icon}</span>
                <span className="neon-text text-2xl font-semibold">{title}</span>
                <span className="text-sm text-soft">{text}</span>
            </button>
        );
    }
}
