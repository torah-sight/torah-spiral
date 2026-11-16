import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
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

const PANEL = 'glass mx-auto mt-2 w-full max-w-2xl rounded-2xl border border-fuchsia-500/30 p-4 sm:p-6 dark:border-fuchsia-300/30 '
    + 'shadow-[0_0_50px_-14px_rgba(217,70,239,0.8)]';
const PLAY = 'rounded-lg border border-emerald-500/50 bg-emerald-500/15 px-4 py-1.5 text-emerald-800 transition '
    + 'hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-40 dark:border-emerald-300/50 dark:text-emerald-100';
const CANCEL = 'rounded-lg border border-line px-4 py-1.5 text-soft transition hover:border-line-strong hover:text-ink';
const TITLE = 'neon-text text-2xl font-semibold text-fuchsia-800 dark:text-fuchsia-100';
const CAPTION = 'mb-2 mt-4 text-sm uppercase tracking-widest text-mute';

const bookLabel = (book: number, locale: Locale): string => {
    const meta = BOOKS[book]!;
    const span = BOOK_SPANS[book]!;
    const name = locale === 'he' ? meta.he : `${meta.he} · ${meta.translit[locale]}`;
    return `${name} · ${span.lastOrdinal - span.firstOrdinal + 1}`;
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
const textToggles = (kinds: IGameSetup['kinds'], t: IMessages, onPick: (kind: ClueKind) => void): ReactNode => (
    <>
        <ToggleButton value="story" active={kinds.story} label={t.clueStory} onPick={onPick} />
        <ToggleButton value="phrase" active={kinds.phrase} label={t.cluePhrases} onPick={onPick} />
    </>
);

/** Вопросы режима «место»: названия, между, до, после (мультивыбор). */
const kindToggles = (kinds: IGameSetup['kinds'], t: IMessages, onPick: (kind: ClueKind) => void): ReactNode => (
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

    /** Выбирает режим игры. */
    @bind
    protected pickMode(mode: GameMode): void {
        this.resolve(gameToken).setMode(mode);
    }

    /** Страница выбора режима (до начала раунда таблица не показывается). */
    public render(): ReactNode {
        const store = this.resolve(gameToken);
        const {setup} = this.useCarburetor(store);
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const t = MESSAGES[locale];
        const books = setup.books;
        const all = books.every(Boolean);
        const story = setup.mode === 'story';
        const kinds = setup.kinds;
        const ready = books.some(Boolean) && (story ? kinds.story || kinds.phrase : kinds.name || kinds.between
            || kinds.before || kinds.after);
        return (
            <section aria-label={t.gameSetup} className="px-1.5 sm:px-0">
                <article className={PANEL}>
                    <h2 className={TITLE}>🎯 {t.gameSetup}</h2>
                    <h3 className={CAPTION}>{t.gameMode}</h3>
                    <div className="flex flex-wrap gap-1.5">
                        <ToggleButton value="place" active={!story} label={t.modePlace} onPick={this.pickMode} />
                        <ToggleButton value="story" active={story} label={t.modeStory} onPick={this.pickMode} />
                    </div>
                    <h3 className={CAPTION}>{t.gameBooks}</h3>
                    <div className="flex flex-col items-stretch gap-1.5">
                        <ToggleButton
                            value={-1}
                            active={all}
                            label={`${t.gameAll} · 54`}
                            onPick={store.selectAllBooks}
                        />
                        {bookToggles(books, locale, this.pickBook)}
                    </div>
                    <h3 className={CAPTION}>{t.gameClues}</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {story ? textToggles(kinds, t, this.pickKind) : kindToggles(kinds, t, this.pickKind)}
                    </div>
                    <p className="mt-2 text-sm text-mute">{story ? t.modeStoryNote : t.gameEdgesNote}</p>
                    {story ? null : (
                        <>
                            <h3 className={CAPTION}>{t.guessedLabel}</h3>
                            <div className="flex flex-wrap gap-1.5">
                                <ToggleButton
                                    value
                                    active={setup.reveal}
                                    label={t.guessedShow}
                                    onPick={this.pickReveal}
                                />
                                <ToggleButton
                                    value={false}
                                    active={!setup.reveal}
                                    label={t.guessedHide}
                                    onPick={this.pickReveal}
                                />
                            </div>
                        </>
                    )}
                    <div className="mt-6 flex justify-end gap-2">
                        <button type="button" onClick={this.cancel} className={CANCEL}>{t.gameCancel}</button>
                        <button type="button" onClick={store.start} disabled={!ready} className={PLAY}>
                            {t.gamePlay}
                        </button>
                    </div>
                </article>
            </section>
        );
    }
}
