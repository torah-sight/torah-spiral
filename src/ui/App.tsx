import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {textDir} from '#src/i18n/format/textDir.ts';
import {localePath} from '#src/i18n/route/localePath.ts';
import type {IPrefs, Theme} from '#src/stores/prefs/PrefsStore.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {Footer} from './common/Footer.tsx';
import {BookDetail} from './detail/BookDetail.tsx';
import {ParshaDetail} from './detail/ParshaDetail.tsx';
import {GameBar} from './game/GameBar.tsx';
import {GameSetup} from './game/GameSetup.tsx';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {Header} from './header/Header.tsx';
import {Home} from './home/Home.tsx';
import {navToken} from '#src/stores/nav/navToken.ts';
import {ParshaTable} from './table/ParshaTable.tsx';

/** Язык интерфейса из настроек. */
const selectLocale = (data: Readonly<IPrefs>): Locale => data.locale;

/** Тема из настроек. */
const selectTheme = (data: Readonly<IPrefs>): Theme => data.theme;

/** Основная часть: выбор режима игры или таблица с панелью игры. */
const mainOf = (choosing: boolean): ReactNode => {
    return (
        <main className="app-main">
            {choosing ? <GameSetup /> : <><GameBar /><ParshaTable /></>}
        </main>
    );
};

/** Приложение: шапка, стартовый экран или раздел (таблица, игра), карточки главы и книги. */
export class App extends ScopedAntiHookComponent {
    /** Язык, направление и тема документа следуют настройкам. */
    protected useEffects(): void {
        const prefs = this.resolve(prefsToken);
        this.useStoreEffect('document-locale', prefs, selectLocale, this.applyLocale);
        this.useStoreEffect('document-theme', prefs, selectTheme, this.applyTheme);
    }

    /** Атрибут data-theme на <html> переключает Roles цвета: страница, фон и все компоненты. */
    @bind
    protected applyTheme(theme: Theme): void {
        document.documentElement.dataset.theme = theme;
    }

    /** Ставит lang, dir и title документа; адрес — ссылка на страницу языка. */
    @bind
    protected applyLocale(locale: Locale): void {
        document.documentElement.lang = locale;
        document.documentElement.dir = textDir(locale);
        document.title = MESSAGES[locale].appTitle;
        const {pathname, search, hash, protocol} = window.location;
        // Скачанный файл (file:) не переименовать: replaceState там запрещён.
        if (protocol === 'file:') return;
        const path = localePath(pathname, locale);
        if (path !== pathname)window.history.replaceState(window.history.state, '', path + search + hash);
    }

    /** Разметка страницы. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const {view} = this.useCarburetor(this.resolve(navToken));
        const {status} = this.useCarburetor(this.resolve(gameToken));
        // В игре до начала раунда — только страница выбора режима, без таблицы.
        const choosing = view === 'game' && status !== 'playing' && status !== 'done';
        return (
            <div dir={textDir(locale)} className="app-shell">
                <div aria-hidden className="page-backdrop" />
                <Header />
                {view === 'home' ? <Home /> : mainOf(choosing)}
                <Footer />
                <ParshaDetail />
                <BookDetail />
            </div>
        );
    }
}
