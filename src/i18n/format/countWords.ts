const hasLetter = (token: string): boolean => /\p{L}/u.test(token);

/** Число слов: фрагменты между пробелами, содержащие хотя бы одну букву. */
export const countWords = (text: string): number => text.split(/\s+/).filter(hasLetter).length;
