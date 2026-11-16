const FINALS: Record<string, string> = {'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ'};

const toRegular = (ch: string): string => FINALS[ch] ?? ch;

const unfinal = (word: string): string => word.replace(/[ךםןףץ]/g, toRegular);

/**
 * Разбивает стих на слова.
 *
 * Убирает кри в скобках, огласовки и служебные знаки; конечные буквы → обычные.
 */
export const normalizeVerse = (verse: string): string[] =>
    verse
        .replace(/\[[^\]]*\]/g, ' ')
        .replace(/<[^>]*>/g, ' ')
        .replace(/[־-]/g, ' ')
        .replace(/[֑-ׇ‍]/g, '')
        .replace(/[^א-ת ]/g, ' ')
        .split(/\s+/)
        .filter(Boolean)
        .map(unfinal);
