import {ScopedAntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {clueView} from './clueView.tsx';
import {GameTimer} from './GameTimer.tsx';

const PANEL = 'glass sticky top-2 z-40 mx-auto mb-3 flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-1 rounded-2xl '
    + 'border-fuchsia-500/30 dark:border-fuchsia-300/30 px-4 py-2 shadow-[0_0_40px_-12px_rgba(217,70,239,0.8)]';
const AGAIN = 'rounded-lg border border-emerald-500/50 dark:border-emerald-300/50 bg-emerald-500/15 px-3 py-1 '
    + 'text-sm text-emerald-800 dark:text-emerald-100 hover:bg-emerald-500/25';
const GOOD = 'text-emerald-700 dark:text-emerald-200';
const BAD = 'text-rose-600 dark:text-rose-200';
const DONE = `neon-text text-xl ${GOOD}`;

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
        const feedback = game.lastWrong === null ? (game.lastRight === null ? '' : t.gameCorrect) : t.gameWrong;
        return (
            <section aria-live="polite" className={PANEL}>
                {game.step ? clueView(game.step, locale) : <div className={DONE}>{t.gameDone}</div>}
                <div className="flex flex-wrap gap-x-4 text-sm text-soft">
                    <span className="text-mute">{modeName(game.setup.books, locale)}</span>
                    <span>{t.gameProgress}: <b className={GOOD}>{game.done}</b>/{game.total}</span>
                    <span>{t.gameMistakes}: <b className={BAD}>{game.mistakes}</b></span>
                    <GameTimer />
                    {feedback ? <span className={game.lastWrong === null ? GOOD : BAD}>{feedback}</span> : null}
                </div>
                {game.status === 'done' ? (
                    <div className="ms-auto flex flex-wrap gap-2">
                        <button type="button" onClick={store.start} className={AGAIN}>{t.gameAgain}</button>
                        <button type="button" onClick={store.choose} className={AGAIN}>{t.gameChoose}</button>
                    </div>
                ) : null}
            </section>
        );
    }
}
