import {ScopedAntiHookComponent, bind, type TReadonly} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import {BOOK_SPANS} from '#src/content/bookSpans.ts';
import type {ClueKind, GameMode, IGameSetup} from '#src/domain/game/types.ts';
import type {IMessages} from '#src/i18n/messages/types.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {navToken} from '#src/stores/nav/navToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {ToggleButton} from '#src/ui/common/ToggleButton.tsx';

/** Включённые виды вопросов. */
type Kinds = TReadonly<IGameSetup>['kinds'];

/** Название книги; число глав не переносится отдельно от названия. */
const bookLabel = (book: number, locale: Locale): ReactNode => {
    const meta = BOOKS[book]!;
    const span = BOOK_SPANS[book]!;
    // На телефоне — только транслитерация: иврит с ней не помещается в столбец.
    const name = locale === 'he' ? meta.he : (
        <><span className="book-label-he">{meta.he} · </span>{meta.translit[locale]}</>
    );
    return <>{name} <span className="book-label-count">· {span.lastOrdinal - span.firstOrdinal + 1}</span></>;
};

/** Пять переключателей книг (мультивыбор). */
const bookToggles = (books: readonly boolean[], locale: Locale, onPick: (book: number) => void): ReactNode => (
    <>
        <ToggleButton value={0} active={books[0] === true} label={bookLabel(0, locale)} onPick={onPick} />
        <ToggleButton value={1} active={books[1] === true} label={bookLabel(1, locale)} onPick={onPick} />
        <ToggleButton value={2} active={books[2] === true} label={bookLabel(2, locale)} onPick={onPick} />
        <ToggleButton value={3} active={books[3] === true} label={bookLabel(3, locale)} onPick={onPick} />
        <ToggleButton value={4} active={books[4] === true} label={bookLabel(4, locale)} onPick={onPick} />
    </>
);

/** Вопросы режима «по сюжету»: элементы сюжета и/или ключевые фразы. */
const textToggles = (kinds: Kinds, t: IMessages, onPick: (kind: ClueKind) => void): ReactNode => (
    <>
        <ToggleButton value="story" active={kinds.story} label={t.clueStory} onPick={onPick} />
        <ToggleButton value="phrase" active={kinds.phrase} label={t.cluePhrases} onPick={onPick} />
    </>
);

/** Вопросы режима «место»: названия, между, до, после (мультивыбор). */
const kindToggles = (kinds: Kinds, t: IMessages, onPick: (kind: ClueKind) => void): ReactNode => (
    <>
        <ToggleButton value="name" active={kinds.name} label={t.clueNames} onPick={onPick} />
        <ToggleButton value="between" active={kinds.between} label={t.clueBetween} onPick={onPick} />
        <ToggleButton value="before" active={kinds.before} label={t.clueBefore} onPick={onPick} />
        <ToggleButton value="after" active={kinds.after} label={t.clueAfter} onPick={onPick} />
    </>
);

/** Страница выбора режима игры: «место» или «сюжет», книги (несколько) или вся Тора, виды вопросов. */
export class GameSetup extends ScopedAntiHookComponent {
    /** Отмена — на стартовый экран. */
    @bind
    protected cancel(): void {
        this.resolve(gameToken).stop();
        this.resolve(navToken).home();
    }

    /** Переключает книгу. */
    @bind
    protected pickBook(book: number): void {
        this.resolve(gameToken).toggleBook(book);
    }

    /** Переключает вид вопросов. */
    @bind
    protected pickKind(kind: ClueKind): void {
        this.resolve(gameToken).toggleKind(kind);
    }

    /** Оставлять ли отгаданные открытыми. */
    @bind
    protected pickReveal(reveal: boolean): void {
        this.resolve(gameToken).setReveal(reveal);
    }

    /** Начинает раунд. */
    @bind
    protected play(): void {
        this.resolve(gameToken).start();
    }

    /** Выбирает режим игры. */
    @bind
    protected pickMode(mode: GameMode): void {
        this.resolve(gameToken).setMode(mode);
    }

    /** Режим: найти место главы или угадать по сюжету. */
    protected renderMode(story: boolean, t: IMessages): ReactNode {
        return (
            <>
                <h3 className="setup-caption">{t.gameMode}</h3>
                <div className="setup-row">
                    <ToggleButton value="place" active={!story} label={t.modePlace} onPick={this.pickMode} />
                    <ToggleButton value="story" active={story} label={t.modeStory} onPick={this.pickMode} />
                </div>
            </>
        );
    }

    /** Книги: «Вся Тора» во всю ширину, книги по две в ряд (на телефоне) или столбиком. */
    protected renderBooks(books: readonly boolean[], locale: Locale, t: IMessages): ReactNode {
        return (
            <>
                <h3 className="setup-caption">{t.gameBooks}</h3>
                <div className="setup-books">
                    <ToggleButton
                        value={-1}
                        active={books.every(Boolean)}
                        label={`${t.gameAll} · 54`}
                        wide
                        onPick={this.resolve(gameToken).selectAllBooks}
                    />
                    {bookToggles(books, locale, this.pickBook)}
                </div>
            </>
        );
    }

    /** Виды вопросов и, в режиме «место», судьба отгаданных глав. */
    protected renderClues(setup: TReadonly<IGameSetup>, t: IMessages): ReactNode {
        const story = setup.mode === 'story';
        return (
            <>
                <h3 className="setup-caption">{t.gameClues}</h3>
                <div className="setup-row">
                    {story ? textToggles(setup.kinds, t, this.pickKind) : kindToggles(setup.kinds, t, this.pickKind)}
                </div>
                <p className="setup-note">{story ? t.modeStoryNote : t.gameEdgesNote}</p>
                {story ? null : this.renderReveal(setup.reveal, t)}
            </>
        );
    }

    /** Оставлять ли отгаданные главы открытыми. */
    protected renderReveal(reveal: boolean, t: IMessages): ReactNode {
        return (
            <>
                <h3 className="setup-caption">{t.guessedLabel}</h3>
                <div className="setup-row">
                    <ToggleButton value active={reveal} label={t.guessedShow} onPick={this.pickReveal} />
                    <ToggleButton value={false} active={!reveal} label={t.guessedHide} onPick={this.pickReveal} />
                </div>
            </>
        );
    }

    /** Отмена и начало раунда. */
    protected renderActions(ready: boolean, t: IMessages): ReactNode {
        return (
            <div className="setup-actions">
                <button type="button" onClick={this.cancel} className="cancel-button">{t.gameCancel}</button>
                <button type="button" onClick={this.play} disabled={!ready} className="play-button">
                    {t.gamePlay}
                </button>
            </div>
        );
    }

    /** Страница выбора режима (до начала раунда таблица не показывается). */
    public render(): ReactNode {
        const {setup} = this.useCarburetor(this.resolve(gameToken));
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const t = MESSAGES[locale];
        const kinds = setup.kinds;
        const picked = setup.mode === 'story' ? kinds.story || kinds.phrase
            : kinds.name || kinds.between || kinds.before || kinds.after;
        return (
            <section aria-label={t.gameSetup} className="setup-section">
                <article className="setup-panel">
                    <h2 className="setup-title">🎯 {t.gameSetup}</h2>
                    {this.renderMode(setup.mode === 'story', t)}
                    {this.renderBooks(setup.books, locale, t)}
                    {this.renderClues(setup, t)}
                    {this.renderActions(setup.books.some(Boolean) && picked, t)}
                </article>
            </section>
        );
    }
}
