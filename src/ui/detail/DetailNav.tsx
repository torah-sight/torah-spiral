import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';

/** Свойства стрелок карточки. */
export interface IDetailNavProps {
    index: number;
}

const ARROW = 'flex min-w-0 items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm text-soft transition '
    + 'hover:border-line-strong hover:text-ink';

const nameOf = (parsha: IParsha, locale: Locale): string =>
    `${parsha.ordinal} · ${locale === 'he' ? parsha.he : parsha.translit[locale]}`;

/** Стрелки к соседним главам; порядок справа налево, как в таблице: предыдущая справа, следующая слева. */
export class DetailNav extends ScopedAntiHookComponent<IDetailNavProps> {
    /** Предыдущая глава. */
    @bind
    protected prev(): void {
        this.resolve(selectionToken).step(-1);
    }

    /** Следующая глава. */
    @bind
    protected next(): void {
        this.resolve(selectionToken).step(1);
    }

    /** Две стрелки; в идущем раунде игры их нет — листание открыло бы неотгаданные главы. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const {status} = this.useCarburetor(this.resolve(gameToken));
        if (status === 'playing') return null;
        const {index} = this.props;
        const t = MESSAGES[locale];
        const prev = PARSHIOT[index - 1];
        const next = PARSHIOT[index + 1];
        return (
            <nav dir="rtl" className="mt-5 flex items-center justify-between gap-2 border-t border-line pt-3">
                {prev === undefined ? <span /> : (
                    <button type="button" onClick={this.prev} aria-label={t.prevParsha} className={ARROW}>
                        <span aria-hidden className="text-lg">→</span>
                        <bdi className="truncate">{nameOf(prev, locale)}</bdi>
                    </button>
                )}
                {next === undefined ? <span /> : (
                    <button type="button" onClick={this.next} aria-label={t.nextParsha} className={ARROW}>
                        <bdi className="truncate">{nameOf(next, locale)}</bdi>
                        <span aria-hidden className="text-lg">←</span>
                    </button>
                )}
            </nav>
        );
    }
}
