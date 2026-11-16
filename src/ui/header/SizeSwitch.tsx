import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import type {SizeBy} from '#src/stores/prefs/PrefsStore.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {ToggleButton} from '#src/ui/common/ToggleButton.tsx';

/** Мера таблицы размеров: по стихам, словам или буквам. */
export class SizeSwitch extends ScopedAntiHookComponent {
    /** Меняет меру. */
    @bind
    protected pick(sizeBy: SizeBy): void {
        this.resolve(prefsToken).setSizeBy(sizeBy);
    }

    /** Три кнопки меры. */
    public render(): ReactNode {
        const {locale, sizeBy} = this.useCarburetor(this.resolve(prefsToken));
        const t = MESSAGES[locale];
        return (
            <div role="group" aria-label={t.sizeByLabel} className="flex items-center gap-1">
                <span className="me-1 text-sm uppercase tracking-widest text-mute">{t.sizeByLabel}</span>
                <ToggleButton value="verses" active={sizeBy === 'verses'} label={t.layoutSize} onPick={this.pick} />
                <ToggleButton value="words" active={sizeBy === 'words'} label={t.layoutWords} onPick={this.pick} />
                <ToggleButton
                    value="letters"
                    active={sizeBy === 'letters'}
                    label={t.layoutLetters}
                    onPick={this.pick}
                />
            </div>
        );
    }
}
