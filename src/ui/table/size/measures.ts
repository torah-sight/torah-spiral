import {NAME_KEYS} from '#src/domain/names/nameKeys.ts';
import type {Measure} from '#src/i18n/format/size/units.ts';

/** Все меры таблицы «Статистика»: святые Имена и все вместе, заповеди, затем стихи, слова, буквы. */
export const MEASURES: readonly Measure[] = [
    ...NAME_KEYS, 'allNames', 'mitzvot', 'positive', 'negative', 'verses', 'words', 'letters'
];
