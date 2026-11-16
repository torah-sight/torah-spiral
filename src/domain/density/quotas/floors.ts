/** Этажи раскрытия поверх таблицы названий, снизу вверх. */
export const FLOORS = ['names', 'keywords', 'phrases', 'story'] as const;

/** Этаж раскрытия. */
export type Floor = (typeof FLOORS)[number];

/** Ёмкость главы по каждому этажу. */
export type Quotas = Record<Floor, number>;
