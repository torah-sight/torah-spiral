import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {FLAGS} from '#src/ui/common/flags.tsx';
import {ToggleButton} from '#src/ui/common/ToggleButton.tsx';

/** Флаг и подпись языка; на телефоне — один крупный флаг, подпись в подсказке. */
const label = (locale: Locale, text: string): ReactNode => (
    <span className="flag-label">
        {FLAGS[locale]}
        <span className="flag-name">{text}</span>
    </span>
);

const LABELS = {he: label('he', 'עברית'), ru: label('ru', 'Рус'), en: label('en', 'Eng')};

/** Переключатель языка с флагами: Израиль, Россия, США. */
export class LocaleSwitch extends ScopedAntiHookComponent {
    /** Меняет язык. */
    @bind
    protected pick(locale: Locale): void {
        this.resolve(prefsToken).setLocale(locale);
    }

    /** Кнопка языка: флаг, подсказка с названием. */
    protected button(value: Locale, title: string, current: Locale): ReactNode {
        return (
            <ToggleButton
                value={value}
                active={current === value}
                label={LABELS[value]}
                title={title}
                onPick={this.pick}
            />
        );
    }

    /** Три кнопки языков. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        return (
            <div role="group" aria-label={MESSAGES[locale].language} className="switch-group">
                {this.button('he', 'עברית', locale)}
                {this.button('ru', 'Русский', locale)}
                {this.button('en', 'English', locale)}
            </div>
        );
    }
}
