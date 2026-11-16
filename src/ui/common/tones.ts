import type {IBook} from '#src/content/model/types.ts';

/** Классы Tailwind цветовой темы книги (литералы — чтобы Tailwind их нашёл). */
export interface ITone {
    cell: string;
    text: string;
    bar: string;
    chip: string;
    head: string;
}

/** Тема каждой книги: стекло с цветным неоном; светлый вариант и `dark:`. */
export const TONES: Record<IBook['tone'], ITone> = {
    cyan: {
        cell: [
            'border-cyan-500/50 dark:border-cyan-300/35 border-t-4 border-t-cyan-500 dark:border-t-cyan-400',
            'bg-gradient-to-b from-cyan-200/90 via-cyan-100/70 to-cyan-50/50',
            'dark:from-cyan-500/30 dark:via-cyan-800/20 dark:to-cyan-950/30',
            'hover:border-cyan-500/80 dark:hover:border-cyan-300/70 hover:shadow-[0_0_26px_-6px_rgba(34,211,238,0.75)]'
        ].join(' '),
        text: 'text-cyan-700 dark:text-cyan-200',
        bar: 'bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]',
        chip: 'border-cyan-500/25 dark:border-cyan-300/20 bg-cyan-400/10 text-cyan-900 dark:text-cyan-50',
        head: 'from-cyan-400/50 dark:from-cyan-500/35 text-cyan-800 dark:text-cyan-100 '
            + 'border-cyan-500/30 dark:border-cyan-300/30'
    },
    violet: {
        cell: [
            'border-violet-500/50 dark:border-violet-300/35 border-t-4 border-t-violet-500 dark:border-t-violet-400',
            'bg-gradient-to-b from-violet-200/90 via-violet-100/70 to-violet-50/50',
            'dark:from-violet-500/30 dark:via-violet-800/20 dark:to-violet-950/30',
            'hover:border-violet-500/80 dark:hover:border-violet-300/70 hover:shadow-[0_0_26px_-6px_rgba(167,139,250,0.75)]'
        ].join(' '),
        text: 'text-violet-700 dark:text-violet-200',
        bar: 'bg-violet-500 dark:bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.9)]',
        chip: 'border-violet-500/25 dark:border-violet-300/20 bg-violet-400/10 text-violet-900 dark:text-violet-50',
        head: 'from-violet-400/50 dark:from-violet-500/35 text-violet-800 dark:text-violet-100 '
            + 'border-violet-500/30 dark:border-violet-300/30'
    },
    amber: {
        cell: [
            'border-amber-500/50 dark:border-amber-300/35 border-t-4 border-t-amber-500 dark:border-t-amber-400',
            'bg-gradient-to-b from-amber-200/90 via-amber-100/70 to-amber-50/50',
            'dark:from-amber-500/30 dark:via-amber-800/20 dark:to-amber-950/30',
            'hover:border-amber-500/80 dark:hover:border-amber-300/70 hover:shadow-[0_0_26px_-6px_rgba(251,191,36,0.75)]'
        ].join(' '),
        text: 'text-amber-700 dark:text-amber-200',
        bar: 'bg-amber-500 dark:bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]',
        chip: 'border-amber-500/25 dark:border-amber-300/20 bg-amber-400/10 text-amber-900 dark:text-amber-50',
        head: 'from-amber-400/50 dark:from-amber-500/35 text-amber-800 dark:text-amber-100 '
            + 'border-amber-500/30 dark:border-amber-300/30'
    },
    emerald: {
        cell: [
            'border-emerald-500/50 dark:border-emerald-300/35',
            'border-t-4 border-t-emerald-500 dark:border-t-emerald-400',
            'bg-gradient-to-b from-emerald-200/90 via-emerald-100/70 to-emerald-50/50',
            'dark:from-emerald-500/30 dark:via-emerald-800/20 dark:to-emerald-950/30',
            'hover:border-emerald-500/80 dark:hover:border-emerald-300/70 hover:shadow-[0_0_26px_-6px_rgba(52,211,153,0.75)]'
        ].join(' '),
        text: 'text-emerald-700 dark:text-emerald-200',
        bar: 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]',
        chip: 'border-emerald-500/25 dark:border-emerald-300/20 bg-emerald-400/10 text-emerald-900 '
            + 'dark:text-emerald-50',
        head: 'from-emerald-400/50 dark:from-emerald-500/35 text-emerald-800 dark:text-emerald-100 '
            + 'border-emerald-500/30 dark:border-emerald-300/30'
    },
    rose: {
        cell: [
            'border-rose-500/50 dark:border-rose-300/35 border-t-4 border-t-rose-500 dark:border-t-rose-400',
            'bg-gradient-to-b from-rose-200/90 via-rose-100/70 to-rose-50/50',
            'dark:from-rose-500/30 dark:via-rose-800/20 dark:to-rose-950/30',
            'hover:border-rose-500/80 dark:hover:border-rose-300/70 hover:shadow-[0_0_26px_-6px_rgba(251,113,133,0.75)]'
        ].join(' '),
        text: 'text-rose-700 dark:text-rose-200',
        bar: 'bg-rose-500 dark:bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.9)]',
        chip: 'border-rose-500/25 dark:border-rose-300/20 bg-rose-400/10 text-rose-900 dark:text-rose-50',
        head: 'from-rose-400/50 dark:from-rose-500/35 text-rose-800 dark:text-rose-100 '
            + 'border-rose-500/30 dark:border-rose-300/30'
    }
};
