import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {Floor} from '#src/domain/density/quotas/floors.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import type {Layers} from '#src/stores/prefs/PrefsStore.ts';
import {ToggleButton} from './ToggleButton.tsx';

/** Свойства кнопок слоёв. */
export interface ILayerButtonsProps {
    layers: Layers;
    locale: Locale;
    onChange: (layers: Layers) => void;
}

/** Слои поверх названий — каждый включается и выключается сам по себе. */
export class LayerButtons extends AntiHookComponent<ILayerButtonsProps> {
    /** Переключает один слой. */
    @bind
    protected toggle(layer: Floor): void {
        const {layers} = this.props;
        this.props.onChange({...layers, [layer]: !layers[layer]});
    }

    /** Подпись и три кнопки. */
    public render(): ReactNode {
        const {layers, locale} = this.props;
        const t = MESSAGES[locale];
        return (
            <div role="group" aria-label={t.floorLabel} className="flex flex-wrap items-center justify-center gap-1">
                <span className="me-1 text-sm uppercase tracking-widest text-mute">{t.floorLabel}</span>
                <ToggleButton value="names" active={layers.names} label={t.floors.names} onPick={this.toggle} />
                <ToggleButton value="phrases" active={layers.phrases} label={t.floors.phrases} onPick={this.toggle} />
                <ToggleButton value="story" active={layers.story} label={t.floors.story} onPick={this.toggle} />
            </div>
        );
    }
}
