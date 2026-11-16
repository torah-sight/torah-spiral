import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import type {Theme} from '#src/stores/prefs/PrefsStore.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {ToggleButton} from '#src/ui/common/ToggleButton.tsx';

/** Переключатель темы: светлая / тёмная. */
export class ThemeSwitch extends ScopedAntiHookComponent {
    /** Меняет тему. */
    @bind
    protected pick(theme: Theme): void {
        this.resolve(prefsToken).setTheme(theme);
    }

    /** Две кнопки темы. */
    public render(): ReactNode {
        const {locale, theme} = this.useCarburetor(this.resolve(prefsToken));
        const t = MESSAGES[locale];
        return (
            <div role="group" aria-label={t.theme} className="flex gap-1">
                <ToggleButton
                    value="light"
                    active={theme === 'light'}
                    label="☀"
                    title={t.themeLight}
                    onPick={this.pick}
                />
                <ToggleButton value="dark" active={theme === 'dark'} label="☾" title={t.themeDark} onPick={this.pick} />
            </div>
        );
    }
}
