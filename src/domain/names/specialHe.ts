/** Сноски MAM: в них бывает та же буква в другой рукописи — не считаем. */
const FOOTNOTE = /<i class="footnote">.*?<\/i>/g;

/** Буква, набранная мельче или крупнее строки. */
const SIZED = /<(small|big)>([^<]*)<\/\1>/g;

/**
 * Сколько в стихе особых букв ה — маленькой или большой.
 *
 * В Торе их две: маленькая в «בְּהִבָּרְאָם» (Берешит 2:4) и большая отдельная в «הַ לַה׳» (Дварим 32:6).
 */
export const specialHe = (verse: string): number => {
    let count = 0;
    for (const [, , inner = ''] of verse.replace(FOOTNOTE, ' ').matchAll(SIZED)) {
        if (inner.replace(/[^א-ת]/g, '') === 'ה') count += 1;
    }
    return count;
};
