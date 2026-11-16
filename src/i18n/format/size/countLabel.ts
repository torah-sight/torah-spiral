import type {Locale} from '#src/i18n/locales.ts';
import type {RuForms, SizeUnit} from './units.ts';

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

/** Количество в мере: «176 стихов», «2266 words», «8632 אותיות». */
export const countLabel = (count: number, unit: SizeUnit, locale: Locale): string => {
    if (locale === 'he') return `${count} ${HE[unit]}`;
    if (locale === 'ru') return `${count} ${ruForm(count, RU[unit])}`;
    return `${count} ${EN[unit]}`;
};
