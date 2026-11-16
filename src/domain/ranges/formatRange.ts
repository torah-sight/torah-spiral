import type {IVerseRange} from './parseRef.ts';

/** Диапазон стихов для показа: «1:1–6:8». */
export const formatRange = (range: IVerseRange): string =>
    `${range.from.chapter}:${range.from.verse}–${range.to.chapter}:${range.to.verse}`;
