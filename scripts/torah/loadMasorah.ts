// Огласованный текст Торы «Miqra according to the Masorah» (Sefaria, CC BY-SA) — с кэшем в .cache/.
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {fetchText} from './fetchText.ts';

const BOOKS = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'];
const CACHE = '.cache';
const VERSION = encodeURIComponent('hebrew|Miqra according to the Masorah');

interface IText {
    versions: {text: string[][]}[];
}

const load = async (name: string): Promise<string[][]> => {
    const path = `${CACHE}/mam-${name}.json`;
    if (!existsSync(path)) {
        mkdirSync(CACHE, {recursive: true});
        const url = `https://www.sefaria.org/api/v3/texts/${name}?version=${VERSION}`;
        writeFileSync(path, await fetchText(url));
    }
    return (JSON.parse(readFileSync(path, 'utf8')) as IText).versions[0]!.text;
};

/** Пять книг: книга → глава → стих (разметка MAM как есть). */
export const loadMasorah = async (): Promise<string[][][]> => {
    const books: string[][][] = [];
    for (const name of BOOKS) books.push(await load(name));
    return books;
};
