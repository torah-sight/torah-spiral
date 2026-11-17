import type {MitzvaKey} from '#src/content/model/types.ts';
import type {NameKey} from '#src/domain/names/types.ts';

/** Мера размера главы. */
export type SizeUnit = 'verses' | 'words' | 'letters';

/** Мера таблицы «Статистика»: святое Имя (сколько раз стоит), заповеди или размер. */
export type Measure = NameKey | MitzvaKey | SizeUnit;

/** Русские формы слова для числа: одна / две–четыре / много. */
export type RuForms = readonly [string, string, string];
