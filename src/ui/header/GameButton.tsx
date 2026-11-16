import {ScopedAntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';

const BASE = 'rounded-lg border px-3 py-1 text-sm transition';
const START = 'border-fuchsia-500/50 dark:border-fuchsia-300/50 bg-fuchsia-500/15 text-fuchsia-800 dark:text-fuchsia-100 '
    + 'shadow-[0_0_20px_-4px_rgba(217,70,239,0.8)] hover:bg-fuchsia-500/25';

/** Новая игра: возврат к странице выбора режима. */
export class GameButton extends ScopedAntiHookComponent {
    /** Неоновая кнопка игры. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const store = this.resolve(gameToken);
        const {status} = this.useCarburetor(store);
        const t = MESSAGES[locale];
        if (status !== 'playing' && status !== 'done') return null;
        return (
            <button type="button" onClick={store.choose} className={`${BASE} ${START}`}>
                ↺ {t.gameRestart}
            </button>
        );
    }
}
