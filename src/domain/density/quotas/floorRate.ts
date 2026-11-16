import type {Quotas} from './floors.ts';

/** Ёмкость этажа у главы средней плотности: имён, слов, фраз, слов сюжета. */
export const FLOOR_RATE: Quotas = {names: 5, keywords: 7, phrases: 3, story: 28};
