import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {ToggleButton} from '#src/ui/common/ToggleButton.tsx';

/** Переключатель языка: עברית / Русский / English. */
export class LocaleSwitch extends ScopedAntiHookComponent {
    /** Меняет язык. */
    @bind
    protected pick(locale: Locale): void {
        this.resolve(prefsToken).setLocale(locale);
    }

    /** Три кнопки языков. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        return (
            <div role="group" aria-label={MESSAGES[locale].language} className="flex gap-1">
                <ToggleButton value="he" active={locale === 'he'} label="עברית" onPick={this.pick} />
                <ToggleButton value="ru" active={locale === 'ru'} label="Рус" onPick={this.pick} />
                <ToggleButton value="en" active={locale === 'en'} label="Eng" onPick={this.pick} />
            </div>
        );
    }
}
