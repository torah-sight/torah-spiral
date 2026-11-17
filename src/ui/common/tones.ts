import type {IBook} from '#src/content/model/types.ts';

/** Классы Tailwind цветовой темы книги (литералы — чтобы Tailwind их нашёл). */
export interface ITone {
    cell: string;
    text: string;
    bar: string;
    chip: string;
    head: string;
}

/**
 * Градиент клетки — фиксированной высоты сверху и уходит в прозрачность; ниже — ровный фон.
 * Так у высокой клетки он не растягивается, а выглядит как у низкой.
 */
const GRADIENT = 'bg-[length:100%_12rem] bg-no-repeat';

/** Светлая клетка: белая бумага, нейтральная рамка, при наведении — мягкая тень без неона. */
const LIGHT_CELL = 'border-stone-300/70 bg-white/75 border-t-[3px] to-transparent '
    + 'hover:border-stone-400/80 hover:shadow-[0_12px_30px_-18px_rgba(41,37,36,0.5)]';

/**
 * Тема каждой книги. Светлая — строгая: глубокие тона книги (-800) только в полосе, подцветке и тексте.
 * Тёмная (`dark:`) — стекло с цветным неоном.
 */
export const TONES: Record<IBook['tone'], ITone> = {
    cyan: {
        cell: [
            LIGHT_CELL, GRADIENT, 'border-t-cyan-800/80 bg-gradient-to-b from-cyan-100/70',
            'dark:border-cyan-300/35 dark:border-t-4 dark:border-t-cyan-400 dark:bg-cyan-950/30',
            'dark:from-cyan-500/30 dark:via-cyan-800/20 dark:to-transparent',
            'dark:hover:border-cyan-300/70 dark:hover:shadow-[0_0_26px_-6px_rgba(34,211,238,0.75)]'
        ].join(' '),
        text: 'text-cyan-800 dark:text-cyan-200',
        bar: 'bg-cyan-800/80 dark:bg-cyan-400 dark:shadow-[0_0_10px_rgba(34,211,238,0.9)]',
        chip: 'border-cyan-800/20 bg-cyan-50/80 text-cyan-950 '
            + 'dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-50',
        head: 'border-stone-300/70 from-cyan-100/80 text-cyan-900 '
            + 'dark:border-cyan-300/30 dark:from-cyan-500/35 dark:text-cyan-100'
    },
    violet: {
        cell: [
            LIGHT_CELL, GRADIENT, 'border-t-violet-800/80 bg-gradient-to-b from-violet-100/70',
            'dark:border-violet-300/35 dark:border-t-4 dark:border-t-violet-400 dark:bg-violet-950/30',
            'dark:from-violet-500/30 dark:via-violet-800/20 dark:to-transparent',
            'dark:hover:border-violet-300/70 dark:hover:shadow-[0_0_26px_-6px_rgba(167,139,250,0.75)]'
        ].join(' '),
        text: 'text-violet-800 dark:text-violet-200',
        bar: 'bg-violet-800/80 dark:bg-violet-400 dark:shadow-[0_0_10px_rgba(167,139,250,0.9)]',
        chip: 'border-violet-800/20 bg-violet-50/80 text-violet-950 '
            + 'dark:border-violet-300/20 dark:bg-violet-400/10 dark:text-violet-50',
        head: 'border-stone-300/70 from-violet-100/80 text-violet-900 '
            + 'dark:border-violet-300/30 dark:from-violet-500/35 dark:text-violet-100'
    },
    amber: {
        cell: [
            LIGHT_CELL, GRADIENT, 'border-t-amber-800/80 bg-gradient-to-b from-amber-100/70',
            'dark:border-amber-300/35 dark:border-t-4 dark:border-t-amber-400 dark:bg-amber-950/30',
            'dark:from-amber-500/30 dark:via-amber-800/20 dark:to-transparent',
            'dark:hover:border-amber-300/70 dark:hover:shadow-[0_0_26px_-6px_rgba(251,191,36,0.75)]'
        ].join(' '),
        text: 'text-amber-800 dark:text-amber-200',
        bar: 'bg-amber-800/80 dark:bg-amber-400 dark:shadow-[0_0_10px_rgba(251,191,36,0.9)]',
        chip: 'border-amber-800/20 bg-amber-50/80 text-amber-950 '
            + 'dark:border-amber-300/20 dark:bg-amber-400/10 dark:text-amber-50',
        head: 'border-stone-300/70 from-amber-100/80 text-amber-900 '
            + 'dark:border-amber-300/30 dark:from-amber-500/35 dark:text-amber-100'
    },
    emerald: {
        cell: [
            LIGHT_CELL, GRADIENT, 'border-t-emerald-800/80 bg-gradient-to-b from-emerald-100/70',
            'dark:border-emerald-300/35 dark:border-t-4 dark:border-t-emerald-400 dark:bg-emerald-950/30',
            'dark:from-emerald-500/30 dark:via-emerald-800/20 dark:to-transparent',
            'dark:hover:border-emerald-300/70 dark:hover:shadow-[0_0_26px_-6px_rgba(52,211,153,0.75)]'
        ].join(' '),
        text: 'text-emerald-800 dark:text-emerald-200',
        bar: 'bg-emerald-800/80 dark:bg-emerald-400 dark:shadow-[0_0_10px_rgba(52,211,153,0.9)]',
        chip: 'border-emerald-800/20 bg-emerald-50/80 text-emerald-950 '
            + 'dark:border-emerald-300/20 dark:bg-emerald-400/10 dark:text-emerald-50',
        head: 'border-stone-300/70 from-emerald-100/80 text-emerald-900 '
            + 'dark:border-emerald-300/30 dark:from-emerald-500/35 dark:text-emerald-100'
    },
    rose: {
        cell: [
            LIGHT_CELL, GRADIENT, 'border-t-rose-800/80 bg-gradient-to-b from-rose-100/70',
            'dark:border-rose-300/35 dark:border-t-4 dark:border-t-rose-400 dark:bg-rose-950/30',
            'dark:from-rose-500/30 dark:via-rose-800/20 dark:to-transparent',
            'dark:hover:border-rose-300/70 dark:hover:shadow-[0_0_26px_-6px_rgba(251,113,133,0.75)]'
        ].join(' '),
        text: 'text-rose-800 dark:text-rose-200',
        bar: 'bg-rose-800/80 dark:bg-rose-400 dark:shadow-[0_0_10px_rgba(251,113,133,0.9)]',
        chip: 'border-rose-800/20 bg-rose-50/80 text-rose-950 '
            + 'dark:border-rose-300/20 dark:bg-rose-400/10 dark:text-rose-50',
        head: 'border-stone-300/70 from-rose-100/80 text-rose-900 '
            + 'dark:border-rose-300/30 dark:from-rose-500/35 dark:text-rose-100'
    }
};
