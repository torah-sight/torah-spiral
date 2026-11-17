import {NAME_FIXES} from '#src/content/names/nameFixes.ts';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {maskVerse} from '#src/domain/names/maskVerse.ts';
import {NAME_KEYS} from '#src/domain/names/nameKeys.ts';
import {nameOf} from '#src/domain/names/nameOf.ts';
import type {INameFix, NameKey} from '#src/domain/names/types.ts';

/** Святые вхождения каждого Имени по 54 главам. */
export type NameCounts = Record<NameKey, number[]>;

/** Буквы Имени — поправка «+n» требует такое слово в стихе. */
const LETTERS: Record<NameKey, string> = {
    havaya: 'יהוה', elokim: 'אלה', el: 'אל', adnut: 'אדני', shakai: 'שדי', eloah: 'אלוה', yah: 'יה', ehyeh: 'אהיה'
};

/** Только буквы, без огласовок. */
const lettersOf = (word: string): string => word.replace(/[^א-ת]/g, '');

const at = (chapter: number, verse: number): number => chapter * 1000 + verse;

const parshaOf = (book: number, chapter: number, verse: number): IParsha => {
    const key = at(chapter, verse);
    const found = PARSHIOT.find((parsha: IParsha): boolean => parsha.book === book
        && key >= at(parsha.range.from.chapter, parsha.range.from.verse)
        && key <= at(parsha.range.to.chapter, parsha.range.to.verse));
    if (found === undefined) throw new Error(`нет главы для ${book} ${chapter}:${verse}`);
    return found;
};

const zero = (): number => 0;

const fixKey = (book: number, ref: string, name: NameKey): string => `${book} ${ref} ${name}`;

/** Применяет поправку к стиху; несовпадение с текстом — в problems. */
const applyFix = (fix: INameFix, words: readonly string[], found: number, problems: string[]): number => {
    const where = `${fix.book} ${fix.ref} ${fix.name}`;
    if (fix.count < 0 && found < -fix.count) {
        problems.push(`${where}: будничных ${-fix.count}, а Имён в стихе ${found}`);
    }
    if (fix.count > 0 && !words.some((word: string): boolean => lettersOf(word).includes(LETTERS[fix.name]))) {
        problems.push(`${where}: в стихе нет слова ${LETTERS[fix.name]}`);
    }
    return fix.count;
};

/** Считает святые Имена по огласованному тексту; поправки сверяет с текстом. */
export const countNames = (books: readonly string[][][], problems: string[]): NameCounts => {
    const counts = {} as NameCounts;
    for (const key of NAME_KEYS) counts[key] = PARSHIOT.map(zero);
    const fixes = new Map<string, INameFix>();
    for (const fix of NAME_FIXES) fixes.set(fixKey(fix.book, fix.ref, fix.name), fix);
    const used = new Set<string>();
    for (const [book, chapters] of books.entries()) {
        for (const [c, verses] of chapters.entries()) {
            for (const [v, verse] of verses.entries()) {
                const words = maskVerse(verse);
                const index = parshaOf(book, c + 1, v + 1).index;
                for (const key of NAME_KEYS) {
                    const found = words.filter((word: string): boolean => nameOf(word) === key).length;
                    const id = fixKey(book, `${c + 1}:${v + 1}`, key);
                    const fix = fixes.get(id);
                    if (fix !== undefined) used.add(id);
                    counts[key][index]! += found + (fix === undefined ? 0 : applyFix(fix, words, found, problems));
                }
            }
        }
    }
    for (const id of fixes.keys()) if (!used.has(id)) problems.push(`${id}: поправка вне текста`);
    return counts;
};
