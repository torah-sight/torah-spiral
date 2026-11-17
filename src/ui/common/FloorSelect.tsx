import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ChangeEvent, ReactNode} from 'react';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';

/** Свойства выпадающего списка этажей. */
export interface IFloorSelectProps {
    floor: number;
    locale: Locale;
    onPick: (floor: number) => void;
}

const SELECT = 'cursor-pointer rounded-lg border border-line bg-veil px-2 py-1 text-sm text-ink transition '
    + 'hover:border-line-strong';

/** Этаж одним выпадающим списком: компактно, для карточки главы. */
export class FloorSelect extends AntiHookComponent<IFloorSelectProps> {
    /** Сообщает выбранный этаж. */
    @bind
    protected onChange(event: ChangeEvent<HTMLSelectElement>): void {
        this.props.onPick(Number(event.target.value));
    }

    /** Подпись и список этажей 0–3. */
    public render(): ReactNode {
        const {floor, locale} = this.props;
        const t = MESSAGES[locale];
        return (
            <label className="flex items-center gap-2 text-sm text-mute">
                <span className="uppercase tracking-widest">{t.floorLabel}</span>
                <select value={floor} onChange={this.onChange} className={SELECT}>
                    <option value={0}>0 · {t.floors[0]}</option>
                    <option value={1}>1 · {t.floors[1]}</option>
                    <option value={2}>2 · {t.floors[2]}</option>
                    <option value={3}>3 · {t.floors[3]}</option>
                </select>
            </label>
        );
    }
}
