import {ScopedAntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {clueView} from './clueView.tsx';
import {GameTimer} from './GameTimer.tsx';

const PANEL = 'glass sticky top-2 z-40 mx-auto mb-3 flex max-w-7xl flex-wrap items-center justify-center gap-x-5 '
    + 'gap-y-1 rounded-2xl '
    + 'border-stone-300/70 px-4 py-2 dark:border-fuchsia-300/30 dark:shadow-[0_0_40px_-12px_rgba(217,70,239,0.8)]';
const AGAIN = 'rounded-lg border border-emerald-900 bg-emerald-900 px-3 py-1 text-sm text-emerald-50 '
    + 'hover:bg-emerald-950 dark:border-emerald-300/50 dark:bg-emerald-500/15 dark:text-emerald-100 '
    + 'dark:hover:bg-emerald-500/25';
const GOOD = 'text-emerald-800 dark:text-emerald-200';
const BAD = 'text-rose-800 dark:text-rose-200';
const DONE = `neon-text text-xl ${GOOD}`;
const FEEDBACK = 'inline-block min-w-[6.5rem]';

/** Выбранные книги: «Вся Тора» или их имена. */
const modeName = (books: readonly boolean[], locale: Locale): string => {
    if (books.every(Boolean)) return MESSAGES[locale].gameAll;
    const names: string[] = [];
    for (const [book, on] of books.entries()) {
        if (on) names.push(locale === 'he' ? BOOKS[book]!.he : BOOKS[book]!.translit[locale]);
    }
    return names.join(', ');
};

/** Панель игры: подсказка шага, прогресс, ошибки, итог. */
export class GameBar extends ScopedAntiHookComponent {
    /** Раунд или итог; выбор режима — в модалке. */
    public render(): ReactNode {
        const store = this.resolve(gameToken);
        const game = this.useCarburetor(store);
        if (game.status !== 'playing' && game.status !== 'done') return null;
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const t = MESSAGES[locale];
        // Итог — сколько глав было именно в этом раунде.
        const doneText = t.gameDone.replace('{n}', String(game.total));
        const feedback = game.lastWrong === null ? (game.lastRight === null ? '' : t.gameCorrect) : t.gameWrong;
        return (
            <section aria-live="polite" className={PANEL}>
                {game.step ? clueView(game.step, locale) : <div className={DONE}>{doneText}</div>}
                <div className="flex flex-wrap justify-center gap-x-4 text-sm text-soft">
                    <span className="text-mute">{modeName(game.setup.books, locale)}</span>
                    <span>{t.gameProgress}: <b className={GOOD}>{game.done}</b>/{game.total}</span>
                    <span>{t.gameMistakes}: <b className={BAD}>{game.mistakes}</b></span>
                    <GameTimer />
                    {/* Место под «Верно!»/«Мимо» занято всегда: панель по центру не дёргается. */}
                    <span className={`${FEEDBACK} ${game.lastWrong === null ? GOOD : BAD}`}>{feedback}</span>
                </div>
                {game.status === 'done' ? (
                    <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={store.start} className={AGAIN}>{t.gameAgain}</button>
                        <button type="button" onClick={store.choose} className={AGAIN}>{t.gameChoose}</button>
                    </div>
                ) : null}
            </section>
        );
    }
}
