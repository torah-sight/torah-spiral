import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ChangeEvent, ReactNode} from 'react';
import {FLOORS, type Floor} from '#src/domain/density/quotas/floors.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {textDir} from '#src/i18n/format/textDir.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import type {Layers} from '#src/stores/prefs/PrefsStore.ts';

/** Свойства выбора слоёв. */
export interface ILayerPickerProps {
    layers: Layers;
    locale: Locale;
    onChange: (layers: Layers) => void;
}

const SUMMARY = 'flex cursor-pointer list-none items-center gap-2 rounded-lg border border-line bg-veil px-2.5 py-1 '
    + 'text-sm text-ink transition hover:border-line-strong [&::-webkit-details-marker]:hidden';
const MENU = 'panel absolute end-0 top-full z-10 mt-1 min-w-44 rounded-xl p-1.5 text-sm';
const OPTION = 'flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-ink hover:bg-veil';
const BOX = 'size-4 cursor-pointer accent-stone-700 dark:accent-cyan-400';

const ALL_ON: Layers = {names: true, phrases: true, story: true};
const ALL_OFF: Layers = {names: false, phrases: false, story: false};

const isAll = (layers: Layers): boolean => FLOORS.every((layer: Floor): boolean => layers[layer]);

/** Сводка выбора: «Все», «Только названия» или перечень слоёв. */
const summaryOf = (layers: Layers, locale: Locale): string => {
    const t = MESSAGES[locale];
    if (isAll(layers)) return t.layersAll;
    const on = FLOORS.filter((layer: Floor): boolean => layers[layer]);
    if (on.length === 0) return t.layersNone;
    return on.map((layer: Floor): string => t.floors[layer]).join(', ');
};

/** Слои карточки: выпадающий список с галочками и «Все» — включить все разом (или снять все). */
export class LayerPicker extends AntiHookComponent<ILayerPickerProps> {
    /** Галочка слоя или «Все». */
    @bind
    protected onToggle(event: ChangeEvent<HTMLInputElement>): void {
        const {layers, onChange} = this.props;
        const value = event.target.value;
        if (value === 'all') {
            onChange(isAll(layers) ? ALL_OFF : ALL_ON);
            return;
        }
        const layer = value as Floor;
        onChange({...layers, [layer]: !layers[layer]});
    }

    /** Строка списка: галочка и подпись. */
    protected option(value: string, checked: boolean, label: string): ReactNode {
        return (
            <label className={OPTION}>
                <input type="checkbox" value={value} checked={checked} onChange={this.onToggle} className={BOX} />
                {label}
            </label>
        );
    }

    /** Кнопка со сводкой и меню. */
    public render(): ReactNode {
        const {layers, locale} = this.props;
        const t = MESSAGES[locale];
        return (
            <div dir={textDir(locale)} className="flex items-center gap-2 text-sm">
                <span className="uppercase tracking-widest text-mute">{t.floorLabel}</span>
                <details className="relative">
                    <summary className={SUMMARY}>
                        {summaryOf(layers, locale)}
                        <span aria-hidden className="text-xs text-mute">▾</span>
                    </summary>
                    <div className={MENU}>
                        {this.option('all', isAll(layers), t.layersAll)}
                        <div className="my-1 border-t border-line" />
                        {this.option('names', layers.names, t.floors.names)}
                        {this.option('phrases', layers.phrases, t.floors.phrases)}
                        {this.option('story', layers.story, t.floors.story)}
                    </div>
                </details>
            </div>
        );
    }
}
