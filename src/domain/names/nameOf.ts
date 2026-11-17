import type {NameKey} from './types.ts';

const FINALS: Record<string, string> = {'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ'};

const toRegular = (ch: string): string => FINALS[ch] ?? ch;

/** Только буквы, конечные — как обычные. */
const lettersOf = (word: string): string => word.replace(/[^א-ת]/g, '').replace(/[ךםןףץ]/g, toRegular);

/** Приставки перед Именем: вопросительная ה, ו, одна из ב כ ל מ, артикль ה (מהללאל — не приставки). */
const PREFIX = 'ה?ו?[בכלמ]?ה?';

const HAVAYA = new RegExp(`^${PREFIX}יהוה$`);
/** אלקים и его формы: אלקי, אלקיך, אלקינו, אלקיכם, אלקיהם, אלקיהן, אלקיו, אלקיה, אלקימו, אלקי (мой). */
const ELOKIM = new RegExp(`^${PREFIX}אלה(?:ימ|י|יכ|ינו|יכמ|יהמ|יהנ|יו|יה|ימו)$`);
/** אֱלוֹהַּ и краткое אֱלֹהַּ — с мапиком в ה. */
const ELOAH = new RegExp(`^${PREFIX}(?:אלוה|אלה)$`);
/** אֵל и אֵלִי («мой Б-г», Шмот 15:2). */
const EL = new RegExp(`^${PREFIX}אלי?$`);
const ADNUT = new RegExp(`^${PREFIX}אדני$`);
const SHAKAI = new RegExp(`^${PREFIX}שדי$`);

/** Холам после ל: אֱלֹהִים, а не אֲלֵהֶם («к ним»). */
const LAMED_HOLAM = /לֹ/;
/** Цере под א: אֵל — Имя или «эти», но не אֶל («к») и не אַל («не»); אֵלִי, но не אֵלַי («ко мне»). */
const ALEF_TSERE = /אֵל(?:ִי)?$/;
/** Камац под נ: אֲדֹנָי — Имя; אֲדֹנִי, אֲדֹנַי — «мой господин», «господа». */
const NUN_KAMATZ = /נָי$/;
/** Точка шин (справа): שַׁדַּי; у שָׂדָי («поля») точка син. */
const SHIN_DOT = 'ׁ';

/** ה с мапиком в любом порядке огласовок: אֱלוֹהַּ, יָהּ (в «эти» — אֵלֶּה — его нет). */
const MAPPIQ_HE = /ה[ְ-ׇ]*ּ/;

/**
 * Какое Имя написано в слове — по буквам и огласовке MAM.
 *
 * Будничные вхождения того же написания («другие боги», «эти») снимаются отдельным списком по стихам.
 */
export const nameOf = (word: string): NameKey | null => {
    const letters = lettersOf(word);
    if (HAVAYA.test(letters)) return 'havaya';
    if (ELOKIM.test(letters) && LAMED_HOLAM.test(word)) return 'elokim';
    if (ELOAH.test(letters) && MAPPIQ_HE.test(word)) return 'eloah';
    if (EL.test(letters) && ALEF_TSERE.test(word)) return 'el';
    if (ADNUT.test(letters) && NUN_KAMATZ.test(word)) return 'adnut';
    if (SHAKAI.test(letters) && word.includes(SHIN_DOT)) return 'shakai';
    if (letters === 'יה' && MAPPIQ_HE.test(word)) return 'yah';
    if (letters === 'אהיה') return 'ehyeh';
    return null;
};
