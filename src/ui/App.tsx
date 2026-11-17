import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {textDir} from '#src/i18n/format/textDir.ts';
import {localePath} from '#src/i18n/route/localePath.ts';
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

/** Приложение: шапка, стартовый экран или раздел (таблица, игра), карточки главы и книги. */
export class App extends ScopedAntiHookComponent {
    /** Язык, направление и тема документа следуют настройкам. */
    protected useEffects(): void {
        const {locale, theme} = this.resolve(prefsToken).getData();
        this.useEffect('document-locale', this.applyLocale, [locale]);
        this.useEffect('document-theme', this.applyTheme, [theme]);
    }

    /** Класс .dark на <html> включает тёмную тему. */
    @bind
    protected applyTheme(): void {
        const dark = this.resolve(prefsToken).getData().theme === 'dark';
        document.documentElement.classList.toggle('dark', dark);
    }

    /** Ставит lang, dir и title документа; адрес — ссылка на страницу языка. */
    @bind
    protected applyLocale(): void {
        const locale: Locale = this.resolve(prefsToken).getData().locale;
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
        const {locale, theme} = this.useCarburetor(this.resolve(prefsToken));
        const {view} = this.useCarburetor(this.resolve(navToken));
        const {status} = this.useCarburetor(this.resolve(gameToken));
        // В игре до начала раунда — только страница выбора режима, без таблицы.
        const choosing = view === 'game' && status !== 'playing' && status !== 'done';
        return (
            <div dir={textDir(locale)} data-theme={theme} className="min-h-screen pb-10">
                <Header />
                {view === 'home' ? <Home /> : (
                    <main className="mx-auto mt-4 max-w-7xl px-1.5 sm:px-4">
                        {choosing ? <GameSetup /> : <><GameBar /><ParshaTable /></>}
                    </main>
                )}
                <Footer />
                <ParshaDetail />
                <BookDetail />
            </div>
        );
    }
}
