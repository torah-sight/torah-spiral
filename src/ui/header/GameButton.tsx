import {ScopedAntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';

/** Новая игра: возврат к странице выбора режима. */
export class GameButton extends ScopedAntiHookComponent {
    /** Кнопка перезапуска игры. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const store = this.resolve(gameToken);
        const {status} = this.useCarburetor(store);
        const t = MESSAGES[locale];
        if (status !== 'playing' && status !== 'done') return null;
        return (
            <button type="button" onClick={store.choose} className="restart-button">
                ↺ {t.gameRestart}
            </button>
        );
    }
}
