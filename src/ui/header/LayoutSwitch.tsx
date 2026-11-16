import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import type {Layout} from '#src/stores/prefs/PrefsStore.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {ToggleButton} from '#src/ui/common/ToggleButton.tsx';

/** Раскладка таблицы: сетка 6×9 или пять столбцов по книгам. */
export class LayoutSwitch extends ScopedAntiHookComponent {
    /** Меняет раскладку. */
    @bind
    protected pick(layout: Layout): void {
        this.resolve(prefsToken).setLayout(layout);
    }

    /** Две кнопки раскладок. */
    public render(): ReactNode {
        const {locale, layout} = this.useCarburetor(this.resolve(prefsToken));
        const t = MESSAGES[locale];
        return (
            <div role="group" aria-label={t.layoutLabel} className="flex items-center gap-1">
                <span className="me-1 text-sm uppercase tracking-widest text-mute">{t.layoutLabel}</span>
                <ToggleButton value="grid" active={layout === 'grid'} label={t.layoutGrid} onPick={this.pick} />
                <ToggleButton value="books" active={layout === 'books'} label={t.layoutBooks} onPick={this.pick} />
            </div>
        );
    }
}
