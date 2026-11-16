/** Граница предложения: . ! ? (возможно, с закрывающей кавычкой) и пробел. */
const BOUNDARY = /(?<=[.!?][»"”']?)\s+/u;

/** Текст сюжета → самостоятельные предложения (элементы сюжета для игры). */
export const splitSentences = (lines: readonly string[]): string[] =>
    lines.join(' ').split(BOUNDARY).filter(Boolean);
