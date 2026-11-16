import {Carburetor, bind} from '@react-carburetor/core';
import {initialGame} from '#src/domain/game/initialGame.ts';
import {MODE_KINDS} from '#src/domain/game/modeKinds.ts';
import {planRound} from '#src/domain/game/planRound.ts';
import type {ClueKind, GameMode, IGameParsha, IGameState, PickResult} from '#src/domain/game/types.ts';
import {gameMutators} from './gameMutators.ts';

/** Игра «найди главу»: по названию или элементу сюжета указать клетку главы. */
export class GameStore extends Carburetor<IGameState> {
    private readonly parshiot: readonly IGameParsha[];
    private readonly random: () => number;
    private readonly now: () => number;

    /**
     * Создаёт игру по сведениям о главах.
     *
     * @param parshiot - книга и число элементов сюжета каждой главы, по порядку
     * @param random - источник случайности (в тестах — детерминированный)
     * @param now - часы, мс эпохи (в тестах — управляемые)
     */
    public constructor(
        parshiot: readonly IGameParsha[],
        random: () => number = Math.random,
        now: () => number = Date.now
    ) {
        super(initialGame(parshiot.length));
        this.parshiot = parshiot;
        this.random = random;
        this.now = now;
    }

    /** Открывает модалку выбора режима. */
    @bind
    public choose(): void {
        this.update(gameMutators.choose);
    }

    /** Включает или выключает книгу в настройке. */
    public toggleBook(book: number): void {
        this.update(gameMutators.toggleBook, book);
    }

    /** Выбирает всю Тору. */
    @bind
    public selectAllBooks(): void {
        this.update(gameMutators.selectAllBooks);
    }

    /** Оставлять ли отгаданные главы открытыми (режим «место»). */
    public setReveal(reveal: boolean): void {
        this.update(gameMutators.setReveal, reveal);
    }

    /** Выбирает режим игры. */
    public setMode(mode: GameMode): void {
        this.update(gameMutators.setMode, mode);
    }

    /** Включает или выключает вид вопросов. */
    public toggleKind(kind: ClueKind): void {
        this.update(gameMutators.toggleKind, kind);
    }

    /** Можно ли начать: есть книга и хотя бы один вид вопросов текущего режима. */
    public canStart(): boolean {
        const {setup} = this.data;
        return setup.books.some(Boolean) && MODE_KINDS[setup.mode].some((kind: ClueKind): boolean => setup.kinds[kind]);
    }

    /** Начинает раунд по текущей настройке: типы вопросов поровну, крайние — в конце. */
    @bind
    public start(): void {
        if (!this.canStart()) return;
        this.update(gameMutators.start, planRound(this.parshiot, this.data.setup, this.random), this.now());
    }

    /** Ответ игрока: клетка с индексом `index`. */
    public pick(index: number): PickResult {
        const {status, found, active, step} = this.data;
        if (status !== 'playing' || !active[index] || found[index]) return 'ignored';
        if (index === step?.parsha) {
            this.update(gameMutators.right, index, this.now());
            return 'right';
        }
        this.update(gameMutators.wrong, index);
        return 'wrong';
    }

    /** Идёт ли раунд. */
    public isPlaying(): boolean {
        return this.data.status === 'playing';
    }

    /** Выход из игры. */
    @bind
    public stop(): void {
        this.update(gameMutators.stop);
    }
}
