import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {formatDuration} from '#src/i18n/format/formatDuration.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';

/** Текущее время для перерисовки секундомера. */
interface ITimerState {
    now: number;
}

/** Секундомер раунда: идёт, пока раунд не завершён; затем показывает итог. */
export class GameTimer extends ScopedAntiHookComponent<{}, ITimerState> {
    public state: ITimerState = {now: Date.now()};

    /** Тик раз в секунду, пока компонент на экране. */
    protected useEffects(): void {
        this.useEffect('tick', this.startTicking, []);
    }

    /** Запускает тик; возвращает остановку. */
    @bind
    protected startTicking(): () => void {
        const id = window.setInterval(this.tick, 1000);
        return (): void => window.clearInterval(id);
    }

    /** Обновляет текущее время. */
    @bind
    protected tick(): void {
        this.setState({now: Date.now()});
    }

    /** «Время 3:07». */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const {startedAt, finishedAt} = this.useCarburetor(this.resolve(gameToken));
        if (startedAt === null) return null;
        const elapsed = (finishedAt ?? this.state.now) - startedAt;
        return (
            <span>
                ⏱ {MESSAGES[locale].gameTime}: <b className="timer-value">{formatDuration(elapsed)}</b>
            </span>
        );
    }
}
