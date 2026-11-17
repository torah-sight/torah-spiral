import type {Layers} from './PrefsStore.ts';

/**
 * Копия слоёв с чтением каждого флага.
 *
 * Carburetor будит компонент по прочитанным полям: если передать объект дальше целиком, запись
 * `layers.story` подписчика не разбудит. Читать флаги нужно в рендере того, кто подписан на стор.
 */
export const copyLayers = (layers: Layers): Layers => ({
    names: layers.names,
    phrases: layers.phrases,
    story: layers.story
});
