/** Разметка MAM, которую выбрасываем целиком: сноски, знаки разделов, кетив. */
const DROP = [
    /<i class="footnote">.*?<\/i>/g,
    /<sup[^>]*>.*?<\/sup>/g,
    /<span class="mam-spi-[^"]*">.*?<\/span>/g,
    /<span class="mam-kq-k">.*?<\/span>/g
];

/**
 * Слова стиха в огласованном тексте MAM: с огласовками, без знаков кантилляции.
 *
 * Кри вместо кетива; макаф, пасек и соф-пасук разделяют слова.
 */
export const maskVerse = (verse: string): string[] => {
    let text = verse;
    for (const pattern of DROP) text = text.replace(pattern, ' ');
    return text
        .replace(/&[a-z]+;/g, ' ')
        .replace(/<[^>]*>/g, '')
        .replace(/[[\]]/g, '')
        .replace(/[־׀׃׆]/g, ' ')
        .replace(/[֑-ֽֿ֯]/g, '')
        .replace(/[^ְ-ׇא-ת ]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);
};
