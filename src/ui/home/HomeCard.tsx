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

/** Светлая — строгая карточка с мягкой тенью; тёмная — неон. */
const LIGHT = 'border-stone-300/70 hover:border-stone-400 hover:shadow-[0_16px_36px_-20px_rgba(41,37,36,0.5)]';
const TONE: Record<CardTone, string> = {
    cyan: `${LIGHT} text-cyan-900 dark:border-cyan-300/30 dark:text-cyan-100 `
        + 'dark:hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.8)]',
    amber: `${LIGHT} text-amber-900 dark:border-amber-300/30 dark:text-amber-100 `
        + 'dark:hover:shadow-[0_0_40px_-8px_rgba(251,191,36,0.8)]',
    fuchsia: `${LIGHT} text-fuchsia-950 dark:border-fuchsia-300/30 dark:text-fuchsia-100 `
        + 'dark:hover:shadow-[0_0_40px_-8px_rgba(217,70,239,0.8)]'
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
