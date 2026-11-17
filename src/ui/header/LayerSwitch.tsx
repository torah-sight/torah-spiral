import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {copyLayers} from '#src/stores/prefs/copyLayers.ts';
import type {Layers} from '#src/stores/prefs/PrefsStore.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {LayerButtons} from '#src/ui/common/LayerButtons.tsx';

/** Слои клеток обзора: имена, фразы, сюжет; названия видны всегда. */
export class LayerSwitch extends ScopedAntiHookComponent {
    /** Меняет слои таблицы. */
    @bind
    protected change(layers: Layers): void {
        this.resolve(prefsToken).setLayers(layers);
    }

    /** Кнопки слоёв таблицы. */
    public render(): ReactNode {
        const {locale, layers} = this.useCarburetor(this.resolve(prefsToken));
        return <LayerButtons layers={copyLayers(layers)} locale={locale} onChange={this.change} />;
    }
}
