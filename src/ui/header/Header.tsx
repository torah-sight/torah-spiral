import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {textDir} from '#src/i18n/format/textDir.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {LOGO_URI} from '#src/shell/logo.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import type {View} from '#src/stores/nav/NavStore.ts';
import {navToken} from '#src/stores/nav/navToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {NavTabs} from '#src/ui/home/NavTabs.tsx';
import {GameButton} from './GameButton.tsx';
import {LayerSwitch} from './LayerSwitch.tsx';
import {LocaleSwitch} from './LocaleSwitch.tsx';
import {SizeSwitch} from './SizeSwitch.tsx';
import {ThemeSwitch} from './ThemeSwitch.tsx';

/** Переключатели текущего раздела; в игре — только во время раунда. */
const controls = (view: View, inRound: boolean): ReactNode => {
    if (view === 'overview') return <LayerSwitch />;
    if (view === 'sizes') return <SizeSwitch />;
    if (view === 'game' && inRound) return <GameButton />;
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

    /** Верхняя панель — всегда слева направо: тема и языки не прыгают при смене иврит ↔ русский. */
    protected renderBar(locale: Locale): ReactNode {
        const title = MESSAGES[locale].appTitle;
        return (
            <div dir="ltr" className="topbar-panel">
                {/* Иконка слева от вкладок; как и заголовок, ведёт на стартовый экран. */}
                <button type="button" onClick={this.goHome} aria-label={title} title={title} className="topbar-logo">
                    <img src={LOGO_URI} alt="" className="topbar-logo-image" />
                </button>
                <div dir={textDir(locale)} className="topbar-tabs">
                    <NavTabs />
                </div>
                <div className="topbar-switches">
                    <ThemeSwitch />
                    <LocaleSwitch />
                </div>
            </div>
        );
    }

    /** Заголовок и слоган; слоган в разделах на телефоне только отнимает место. */
    protected renderTitle(locale: Locale, view: View): ReactNode {
        const t = MESSAGES[locale];
        return (
            <div className="title-block">
                <h1>
                    <button type="button" onClick={this.goHome} className="title-button">{t.appTitle}</button>
                </h1>
                <p className={view === 'home' ? 'tagline-text' : 'tagline-collapsed'}>{t.tagline}</p>
            </div>
        );
    }

    /** Заголовок и панель. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const {view} = this.useCarburetor(this.resolve(navToken));
        const {status} = this.useCarburetor(this.resolve(gameToken));
        const panel = controls(view, status === 'playing' || status === 'done');
        return (
            <header className="header-shell">
                {this.renderBar(locale)}
                {this.renderTitle(locale, view)}
                {panel === null ? null : <nav className="controls-panel">{panel}</nav>}
            </header>
        );
    }
}
