import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {ToggleButton} from '#src/ui/common/ToggleButton.tsx';

/** Этажи спирали: 0 — названия, далее имена, слова, фразы, сюжет. */
export class FloorSwitch extends ScopedAntiHookComponent {
    /** Меняет этаж. */
    @bind
    protected pick(floor: number): void {
        this.resolve(prefsToken).setFloor(floor);
    }

    /** Пять кнопок этажей с номерами. */
    public render(): ReactNode {
        const {locale, floor} = this.useCarburetor(this.resolve(prefsToken));
        const t = MESSAGES[locale];
        return (
            <div role="group" aria-label={t.floorLabel} className="flex flex-wrap items-center gap-1">
                <span className="me-1 text-sm uppercase tracking-widest text-mute">{t.floorLabel}</span>
                <ToggleButton value={0} active={floor === 0} label={`0 · ${t.floors[0]}`} onPick={this.pick} />
                <ToggleButton value={1} active={floor === 1} label={`1 · ${t.floors[1]}`} onPick={this.pick} />
                <ToggleButton value={2} active={floor === 2} label={`2 · ${t.floors[2]}`} onPick={this.pick} />
                <ToggleButton value={3} active={floor === 3} label={`3 · ${t.floors[3]}`} onPick={this.pick} />
            </div>
        );
    }
}
