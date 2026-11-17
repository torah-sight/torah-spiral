import {ScopedAntiHookComponent, type TReadonly} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import type {IGameState} from '#src/domain/game/types.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import type {IMessages} from '#src/i18n/messages/types.ts';
import type {GameStore} from '#src/stores/game/GameStore.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {clueView} from './clueView.tsx';
import {GameTimer} from './GameTimer.tsx';

/** Выбранные книги: «Вся Тора» или их имена. */
const modeName = (books: readonly boolean[], locale: Locale): string => {
    if (books.every(Boolean)) return MESSAGES[locale].gameAll;
    const names: string[] = [];
    for (const [book, on] of books.entries()) {
        if (on) names.push(locale === 'he' ? BOOKS[book]!.he : BOOKS[book]!.translit[locale]);
    }
    return names.join(', ');
};

/** Счётчики раунда; место под «Верно!»/«Мимо» занято всегда: панель по центру не дёргается. */
const statsOf = (game: TReadonly<IGameState>, locale: Locale, feedback: string): ReactNode => {
    const t = MESSAGES[locale];
    return (
        <div className="game-stats">
            <span className="game-mode">{modeName(game.setup.books, locale)}</span>
            <span>{t.gameProgress}: <b className="game-good">{game.done}</b>/{game.total}</span>
            <span>{t.gameMistakes}: <b className="game-bad">{game.mistakes}</b></span>
            <GameTimer />
            <span className={game.lastWrong === null ? 'game-feedback-good' : 'game-feedback-bad'}>{feedback}</span>
        </div>
    );
};

/** После раунда: сыграть ещё или выбрать другой режим. */
const againOf = (store: Pick<GameStore, 'start' | 'choose'>, t: IMessages): ReactNode => (
    <div className="game-actions">
        <button type="button" onClick={store.start} className="again-button">{t.gameAgain}</button>
        <button type="button" onClick={store.choose} className="again-button">{t.gameChoose}</button>
    </div>
);

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
            <section aria-live="polite" className="game-bar">
                {game.step ? clueView(game.step, locale) : <div className="game-done">{doneText}</div>}
                {statsOf(game, locale, feedback)}
                {game.status === 'done' ? againOf(store, t) : null}
            </section>
        );
    }
}
