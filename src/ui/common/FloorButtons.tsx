import {AntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {ToggleButton} from './ToggleButton.tsx';

/** Свойства кнопок этажей. */
export interface IFloorButtonsProps {
    floor: number;
    locale: Locale;
    onPick: (floor: number) => void;
}

/** Этажи 0–3 с подписью: в панели обзора и в карточке главы. */
export class FloorButtons extends AntiHookComponent<IFloorButtonsProps> {
    /** Подпись и четыре кнопки. */
    public render(): ReactNode {
        const {floor, locale, onPick} = this.props;
        const t = MESSAGES[locale];
        return (
            <div role="group" aria-label={t.floorLabel} className="flex flex-wrap items-center justify-center gap-1">
                <span className="me-1 text-sm uppercase tracking-widest text-mute">{t.floorLabel}</span>
                <ToggleButton value={0} active={floor === 0} label={`0 · ${t.floors[0]}`} onPick={onPick} />
                <ToggleButton value={1} active={floor === 1} label={`1 · ${t.floors[1]}`} onPick={onPick} />
                <ToggleButton value={2} active={floor === 2} label={`2 · ${t.floors[2]}`} onPick={onPick} />
                <ToggleButton value={3} active={floor === 3} label={`3 · ${t.floors[3]}`} onPick={onPick} />
            </div>
        );
    }
}
