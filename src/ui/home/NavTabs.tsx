import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import type {View} from '#src/stores/nav/NavStore.ts';
import {navToken} from '#src/stores/nav/navToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {ToggleButton} from '#src/ui/common/ToggleButton.tsx';

/** Вкладка: значок над подписью на телефоне, в строку — на широком экране. */
const tab = (icon: string, text: string): ReactNode => (
    <span className="tab-label">
        <span aria-hidden>{icon}</span>
        <span className="tab-caption">{text}</span>
    </span>
);

/** Вкладки разделов: обзор, размеры, игра. */
export class NavTabs extends ScopedAntiHookComponent {
    /** Переход в раздел: из игры — с выходом из неё, в игру — с выбором режима. */
    @bind
    protected pick(view: View): void {
        const nav = this.resolve(navToken);
        const game = this.resolve(gameToken);
        if (nav.getData().view === view) return;
        if (nav.getData().view === 'game') game.stop();
        nav.go(view);
        if (view === 'game') game.choose();
    }

    /** Три вкладки. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const {view} = this.useCarburetor(this.resolve(navToken));
        const t = MESSAGES[locale];
        return (
            <div role="tablist" className="tab-list">
                <ToggleButton
                    value="overview"
                    active={view === 'overview'}
                    label={tab('📜', t.navOverview)}
                    onPick={this.pick}
                />
                <ToggleButton
                    value="sizes"
                    active={view === 'sizes'}
                    label={tab('📏', t.navSizes)}
                    onPick={this.pick}
                />
                <ToggleButton value="game" active={view === 'game'} label={tab('🎯', t.navGame)} onPick={this.pick} />
            </div>
        );
    }
}
