import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {FLAGS} from '#src/ui/common/flags.tsx';
import {ToggleButton} from '#src/ui/common/ToggleButton.tsx';

/** Флаг и подпись языка. */
const LABELS = {
    he: <span className="flex items-center gap-1.5">{FLAGS.he}עברית</span>,
    ru: <span className="flex items-center gap-1.5">{FLAGS.ru}Рус</span>,
    en: <span className="flex items-center gap-1.5">{FLAGS.en}Eng</span>
};

/** Переключатель языка с флагами: Израиль, Россия, США. */
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
                <ToggleButton value="he" active={locale === 'he'} label={LABELS.he} onPick={this.pick} />
                <ToggleButton value="ru" active={locale === 'ru'} label={LABELS.ru} onPick={this.pick} />
                <ToggleButton value="en" active={locale === 'en'} label={LABELS.en} onPick={this.pick} />
            </div>
        );
    }
}
