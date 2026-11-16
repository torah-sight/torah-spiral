import type {IBook} from '#src/content/model/types.ts';

/** Пять книг Торы в порядке чтения: транслитерация, буквальный перевод, привычное название. */
export const BOOKS: readonly IBook[] = [
    {
        he: 'בְּרֵאשִׁית', tone: 'cyan',
        translit: {ru: 'Берешит', en: 'Bereshit'},
        literal: {ru: 'В начале', en: 'In the beginning'},
        common: {ru: 'Бытие', en: 'Genesis'}
    },
    {
        he: 'שְׁמוֹת', tone: 'violet',
        translit: {ru: 'Шмот', en: 'Shemot'},
        literal: {ru: 'Имена', en: 'Names'},
        common: {ru: 'Исход', en: 'Exodus'}
    },
    {
        he: 'וַיִּקְרָא', tone: 'amber',
        translit: {ru: 'Ваикра', en: 'Vayikra'},
        literal: {ru: 'И воззвал', en: 'And He called'},
        common: {ru: 'Левит', en: 'Leviticus'}
    },
    {
        he: 'בְּמִדְבַּר', tone: 'emerald',
        translit: {ru: 'Бемидбар', en: 'Bamidbar'},
        literal: {ru: 'В пустыне', en: 'In the wilderness'},
        common: {ru: 'Числа', en: 'Numbers'}
    },
    {
        he: 'דְּבָרִים', tone: 'rose',
        translit: {ru: 'Дварим', en: 'Devarim'},
        literal: {ru: 'Слова', en: 'Words'},
        common: {ru: 'Второзаконие', en: 'Deuteronomy'}
    }
];
