import {NAME_KEYS} from '#src/domain/names/nameKeys.ts';
import type {Measure} from '#src/i18n/format/size/units.ts';

/** Все меры таблицы «Размеры»: святые Имена, затем стихи, слова, буквы. */
export const MEASURES: readonly Measure[] = [...NAME_KEYS, 'verses', 'words', 'letters'];
