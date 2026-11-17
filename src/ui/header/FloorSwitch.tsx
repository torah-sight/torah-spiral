import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {FloorButtons} from '#src/ui/common/FloorButtons.tsx';

/** Этажи спирали в панели обзора: 0 — названия, далее имена, фразы, сюжет. */
export class FloorSwitch extends ScopedAntiHookComponent {
    /** Меняет этаж таблицы. */
    @bind
    protected pick(floor: number): void {
        this.resolve(prefsToken).setFloor(floor);
    }

    /** Кнопки этажей таблицы. */
    public render(): ReactNode {
        const {locale, floor} = this.useCarburetor(this.resolve(prefsToken));
        return <FloorButtons floor={floor} locale={locale} onPick={this.pick} />;
    }
}
