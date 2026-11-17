import type {Locale} from '#src/i18n/locales.ts';
import type {Measure, RuForms, SizeUnit} from './units.ts';

const RU: Record<SizeUnit, RuForms> = {
    verses: ['стих', 'стиха', 'стихов'],
    words: ['слово', 'слова', 'слов'],
    letters: ['буква', 'буквы', 'букв']
};
const EN: Record<SizeUnit, string> = {verses: 'verses', words: 'words', letters: 'letters'};
const HE: Record<SizeUnit, string> = {verses: 'פסוקים', words: 'מילים', letters: 'אותיות'};

/** Русская форма для числа. */
const ruForm = (n: number, [one, few, many]: RuForms): string => {
    const tens = n % 100;
    const ones = n % 10;
    if (tens >= 11 && tens <= 14) return many;
    if (ones === 1) return one;
    if (ones >= 2 && ones <= 4) return few;
    return many;
};

/** «Раз» для Имён. */
const RU_TIMES: RuForms = ['раз', 'раза', 'раз'];

const isSize = (unit: Measure): unit is SizeUnit => unit === 'verses' || unit === 'words' || unit === 'letters';

/** Сколько раз стоит Имя: «12 раз», «1 time», «פעם אחת». */
const timesLabel = (count: number, locale: Locale): string => {
    if (locale === 'he') return count === 1 ? 'פעם אחת' : `${count} פעמים`;
    if (locale === 'ru') return `${count} ${ruForm(count, RU_TIMES)}`;
    return `${count} ${count === 1 ? 'time' : 'times'}`;
};

/** Количество в мере: «176 стихов», «2266 words», «8632 אותיות», «12 раз». */
export const countLabel = (count: number, unit: Measure, locale: Locale): string => {
    if (!isSize(unit)) return timesLabel(count, locale);
    if (locale === 'he') return `${count} ${HE[unit]}`;
    if (locale === 'ru') return `${count} ${ruForm(count, RU[unit])}`;
    return `${count} ${EN[unit]}`;
};
