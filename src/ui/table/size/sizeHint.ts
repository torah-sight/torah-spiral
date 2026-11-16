import type {SizeUnit} from '#src/i18n/format/size/units.ts';

/** Подсказка к шкале меры. */
export const SIZE_HINT: Record<SizeUnit, 'sizeHint' | 'wordsHint' | 'lettersHint'> = {
    verses: 'sizeHint',
    words: 'wordsHint',
    letters: 'lettersHint'
};
