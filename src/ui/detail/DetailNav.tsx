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
    /** Заголовок карточки между стрелками. */
    children: ReactNode;
    /** Сведения по сторонам от заголовка: у предыдущей главы и у следующей. */
    before: ReactNode;
    after: ReactNode;
}

const ARROW = 'flex min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm '
    + 'text-soft transition hover:border-line-strong hover:text-ink';

/**
 * Телефон: стрелки строкой сверху, заголовок под ними, сведения — во всю ширину ниже.
 * С sm до lg сведения — двумя столбцами под заголовком.
 * С lg — одной строкой: стрелка, сведения, заголовок, сведения, стрелка.
 */
const ROW = 'mb-3 grid grid-cols-2 items-center gap-x-4 gap-y-2 border-b border-line pb-3 '
    + 'lg:grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto]';
const PREV_SLOT = 'col-start-1 row-start-1 justify-self-start';
const NEXT_SLOT = 'col-start-2 row-start-1 justify-self-end lg:col-start-5';
const TITLE_SLOT = 'col-span-2 row-start-2 lg:col-span-1 lg:col-start-3 lg:row-start-1';
const BEFORE_SLOT = 'col-span-2 row-start-3 sm:col-span-1 sm:col-start-1 lg:col-start-2 lg:row-start-1';
const AFTER_SLOT = 'col-span-2 row-start-4 sm:col-span-1 sm:col-start-2 sm:row-start-3 lg:col-start-4 lg:row-start-1';
const PREV = `${ARROW} ${PREV_SLOT}`;
const NEXT = `${ARROW} ${NEXT_SLOT}`;

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

    /** Стрелки и заголовок; в идущем раунде игры стрелок нет — листание открыло бы неотгаданные главы. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const {status} = this.useCarburetor(this.resolve(gameToken));
        const {index, children, before, after} = this.props;
        const t = MESSAGES[locale];
        const playing = status === 'playing';
        const prev = playing ? undefined : PARSHIOT[index - 1];
        const next = playing ? undefined : PARSHIOT[index + 1];
        return (
            <nav dir="rtl" className={ROW}>
                {prev === undefined ? <span className={PREV_SLOT} /> : (
                    <button type="button" onClick={this.prev} aria-label={t.prevParsha} className={PREV}>
                        <span aria-hidden className="text-lg">→</span>
                        <bdi className="truncate">{nameOf(prev, locale)}</bdi>
                    </button>
                )}
                <div className={BEFORE_SLOT}>{before}</div>
                <div className={TITLE_SLOT}>{children}</div>
                <div className={AFTER_SLOT}>{after}</div>
                {next === undefined ? <span className={NEXT_SLOT} /> : (
                    <button type="button" onClick={this.next} aria-label={t.nextParsha} className={NEXT}>
                        <bdi className="truncate">{nameOf(next, locale)}</bdi>
                        <span aria-hidden className="text-lg">←</span>
                    </button>
                )}
            </nav>
        );
    }
}
