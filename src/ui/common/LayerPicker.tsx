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

/** Метка списка слоёв — по ней находится открытый список. */
const MARK = 'data-layer-picker';

/** Открытый список выбора слоёв. */
const OPEN_PICKER = `details[${MARK}][open]`;

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
    /** Клик вне списка закрывает его; подписка — на время жизни компонента. */
    protected useEffects(): void {
        this.useEffect('outside', this.listenOutside, []);
    }

    /** Слушает нажатия по странице. */
    @bind
    protected listenOutside(): () => void {
        document.addEventListener('pointerdown', this.onOutside);
        return this.unlistenOutside;
    }

    /** Снимает подписку. */
    @bind
    protected unlistenOutside(): void {
        document.removeEventListener('pointerdown', this.onOutside);
    }

    /** Закрывает открытый список, если нажали не по нему. */
    @bind
    protected onOutside(event: PointerEvent): void {
        const open = document.querySelector<HTMLDetailsElement>(OPEN_PICKER);
        if (open !== null && !open.contains(event.target as Node)) open.open = false;
    }

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
            <label className="layer-picker-option">
                <input type="checkbox" value={value} checked={checked} onChange={this.onToggle} className="layer-picker-box" />
                {label}
            </label>
        );
    }

    /** Кнопка со сводкой и меню. */
    public render(): ReactNode {
        const {layers, locale} = this.props;
        const t = MESSAGES[locale];
        return (
            <div dir={textDir(locale)} className="layer-picker">
                <span className="layer-picker-caption">{t.floorLabel}</span>
                <details data-layer-picker className="layer-picker-details">
                    <summary className="layer-picker-summary">
                        <span className="layer-picker-text">{summaryOf(layers, locale)}</span>
                        <span aria-hidden className="layer-picker-arrow">▾</span>
                    </summary>
                    <div className="layer-picker-menu">
                        {this.option('all', isAll(layers), t.layersAll)}
                        <div className="layer-picker-rule" />
                        {this.option('names', layers.names, t.floors.names)}
                        {this.option('phrases', layers.phrases, t.floors.phrases)}
                        {this.option('story', layers.story, t.floors.story)}
                    </div>
                </details>
            </div>
        );
    }
}
