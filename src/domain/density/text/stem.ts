const PREFIXES = 'והבכלמש';

/** Грубая основа: без приставок ו/ה/ב/כ/ל/מ/ש (до двух), если остаётся больше 3 букв. */
export const stem = (word: string): string => {
    let out = word;
    for (let k = 0; k < 2 && out.length > 3 && PREFIXES.includes(out[0]!); k++) out = out.slice(1);
    return out;
};
