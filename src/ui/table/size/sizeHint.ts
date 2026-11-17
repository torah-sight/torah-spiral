import {NAME_LABELS} from '#src/content/tallies/nameLabels.ts';
import type {Measure} from '#src/i18n/format/size/units.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';

/** Подсказка к шкале меры: размер главы, число заповедей или сколько раз стоит Имя. */
export const hintOf = (unit: Measure, locale: Locale): string => {
    const t = MESSAGES[locale];
    if (unit === 'verses') return t.sizeHint;
    if (unit === 'words') return t.wordsHint;
    if (unit === 'letters') return t.lettersHint;
    if (unit === 'he') return t.heHint;
    if (unit === 'mitzvot') return t.mitzvotHint;
    if (unit === 'positive') return t.positiveHint;
    if (unit === 'negative') return t.negativeHint;
    return t.nameHint.replace('{name}', NAME_LABELS[unit]);
};
