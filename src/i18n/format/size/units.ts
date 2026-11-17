import type {NameKey} from '#src/domain/names/types.ts';

/** Мера размера главы. */
export type SizeUnit = 'verses' | 'words' | 'letters';

/** Мера таблицы «Размеры»: святое Имя (сколько раз стоит) или размер. */
export type Measure = NameKey | SizeUnit;

/** Русские формы слова для числа: одна / две–четыре / много. */
export type RuForms = readonly [string, string, string];
