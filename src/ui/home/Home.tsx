import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
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

    /** Три карточки режимов. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const t = MESSAGES[locale];
        return (
            <section className="mx-auto mt-6 max-w-5xl px-2 sm:px-4">
                <h2 className="mb-4 text-center text-xl text-soft sm:text-2xl">{t.homeChoose}</h2>
                <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                    <HomeCard
                        view="overview"
                        icon="📜"
                        title={t.navOverview}
                        text={t.homeOverview}
                        tone="cyan"
                        onPick={this.enter}
                    />
                    <HomeCard
                        view="sizes"
                        icon="📏"
                        title={t.navSizes}
                        text={t.homeSizes}
                        tone="amber"
                        onPick={this.enter}
                    />
                    <HomeCard
                        view="game"
                        icon="🎯"
                        title={t.navGame}
                        text={t.homeGame}
                        tone="fuchsia"
                        onPick={this.enter}
                    />
                </div>
            </section>
        );
    }
}
