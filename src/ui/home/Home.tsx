import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import type {IMessages} from '#src/i18n/messages/types.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import type {View} from '#src/stores/nav/NavStore.ts';
import {navToken} from '#src/stores/nav/navToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {HomeCard} from './HomeCard.tsx';

/** Стартовый экран: три режима, куда можно войти. */
export class Home extends ScopedAntiHookComponent {
    /** Вход в раздел; игра сразу открывает выбор режима. */
    @bind
    protected enter(view: View): void {
        this.resolve(navToken).go(view);
        if (view === 'game') this.resolve(gameToken).choose();
    }

    /** Три карточки режимов; цвет карточки — цвет книги (0 — Берешит, 1 — Шмот, 2 — Ваикра). */
    protected renderCards(t: IMessages): ReactNode {
        return (
            <div className="home-grid">
                <HomeCard
                    view="overview"
                    icon="📜"
                    title={t.navOverview}
                    text={t.homeOverview}
                    book={0}
                    onPick={this.enter}
                />
                <HomeCard
                    view="sizes"
                    icon="📏"
                    title={t.navSizes}
                    text={t.homeSizes}
                    book={2}
                    onPick={this.enter}
                />
                <HomeCard
                    view="game"
                    icon="🎯"
                    title={t.navGame}
                    text={t.homeGame}
                    book={1}
                    onPick={this.enter}
                />
            </div>
        );
    }

    /** Заголовок и карточки. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const t = MESSAGES[locale];
        return (
            <section className="home-section">
                <h2 className="home-heading">{t.homeChoose}</h2>
                {this.renderCards(t)}
            </section>
        );
    }
}
