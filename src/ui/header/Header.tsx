import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {textDir} from '#src/i18n/format/textDir.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import type {View} from '#src/stores/nav/NavStore.ts';
import {navToken} from '#src/stores/nav/navToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {NavTabs} from '#src/ui/home/NavTabs.tsx';
import {FloorSwitch} from './FloorSwitch.tsx';
import {GameButton} from './GameButton.tsx';
import {LayoutSwitch} from './LayoutSwitch.tsx';
import {LocaleSwitch} from './LocaleSwitch.tsx';
import {SizeSwitch} from './SizeSwitch.tsx';
import {ThemeSwitch} from './ThemeSwitch.tsx';

/** Градиент текста рисуется только в рамке элемента: нижний отступ — под хвосты «р», «у». */
const TITLE = 'bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-rose-600 bg-clip-text pb-[0.18em] text-3xl font-semibold '
    + 'tracking-tight text-transparent sm:text-5xl neon-text dark:from-cyan-200 dark:via-fuchsia-200 dark:to-rose-200';

const TOP_BAR = 'glass flex flex-wrap items-center justify-between gap-2 rounded-2xl px-3 py-2';

/** Переключатели текущего раздела; в игре — только во время раунда. */
const controls = (view: View, inRound: boolean): ReactNode => {
    if (view === 'overview') return <><FloorSwitch /><LayoutSwitch /></>;
    if (view === 'sizes') return <SizeSwitch />;
    if (view === 'game' && inRound) return <><LayoutSwitch /><GameButton /></>;
    return null;
};

/** Шапка: вкладки разделов в самом верху, заголовок (ведёт на стартовый экран), переключатели раздела. */
export class Header extends ScopedAntiHookComponent {
    /** На стартовый экран; игра при этом завершается. */
    @bind
    protected goHome(): void {
        this.resolve(gameToken).stop();
        this.resolve(navToken).home();
    }

    /** Заголовок и панель. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const {view} = this.useCarburetor(this.resolve(navToken));
        const {status} = this.useCarburetor(this.resolve(gameToken));
        const panel = controls(view, status === 'playing' || status === 'done');
        const t = MESSAGES[locale];
        return (
            <header className="mx-auto max-w-7xl px-2 pt-3 sm:px-4 sm:pt-4">
                {/* Верхняя панель — всегда слева направо: тема и языки не прыгают при смене иврит ↔ русский. */}
                <div dir="ltr" className={TOP_BAR}>
                    <div dir={textDir(locale)}>
                        <NavTabs />
                    </div>
                    <div className="ms-auto flex flex-wrap gap-2">
                        <ThemeSwitch />
                        <LocaleSwitch />
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <h1>
                        <button type="button" onClick={this.goHome} className={TITLE}>{t.appTitle}</button>
                    </h1>
                    <p className="mx-auto mt-1 max-w-2xl text-sm text-mute">{t.tagline}</p>
                </div>
                {panel === null ? null : (
                    <nav className="glass mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-2xl px-3 py-2.5">
                        {panel}
                    </nav>
                )}
            </header>
        );
    }
}
