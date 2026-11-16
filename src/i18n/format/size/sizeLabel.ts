import type {Locale} from '#src/i18n/locales.ts';
import {countLabel} from './countLabel.ts';
import {rankLabel} from './rankLabel.ts';
import type {SizeUnit} from './units.ts';

/** Размер главы и её место по этой мере: «176 стихов · 1-я по стихам». */
export const sizeLabel = (count: number, rank: number, unit: SizeUnit, locale: Locale): string =>
    `${countLabel(count, unit, locale)} · ${rankLabel(rank, unit, locale)}`;
