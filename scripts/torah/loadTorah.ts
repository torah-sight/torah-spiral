// Загрузка текста Торы и границ недельных глав с Sefaria (с кэшем в .cache/).
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import type {IToken, IVerseRef} from '#src/domain/density/model/types.ts';
import {normalizeVerse} from '#src/domain/density/text/normalizeVerse.ts';

const BOOKS = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'];
const CACHE = '.cache';
const API = 'https://www.sefaria.org/api';
const VERSION = encodeURIComponent('hebrew|Tanach with Text Only');

interface IParshaNode {
    sharedTitle: string;
    wholeRef: string;
}

interface IIndex {
    alt_structs: {Parasha: {nodes: IParshaNode[]}};
}

interface IText {
    versions: {text: string[][]}[];
}

/** Недельная глава: имя Sefaria, книга, диапазон. */
export interface IParshaInfo {
    slug: string;
    book: number;
    ref: string;
}

type Range = [IVerseRef, IVerseRef];

const cached = async (file: string, url: string): Promise<unknown> => {
    const path = `${CACHE}/${file}`;
    if (!existsSync(path)) {
        mkdirSync(CACHE, {recursive: true});
        const response = await fetch(url);
        if (!response.ok) throw new Error(`${url}: ${response.status}`);
        writeFileSync(path, await response.text());
    }
    return JSON.parse(readFileSync(path, 'utf8'));
};

const parseRange = (book: number, ref: string): Range => {
    const match = /(\d+):(\d+)-(?:(\d+):)?(\d+)$/.exec(ref);
    if (!match) throw new Error(`bad ref ${ref}`);
    const [, c1, v1, c2, v2] = match;
    return [
        {book, chapter: Number(c1), verse: Number(v1)},
        {book, chapter: Number(c2 ?? c1), verse: Number(v2)}
    ];
};

const key = (ref: IVerseRef): number => ref.chapter * 1000 + ref.verse;

const parshaOf = (ranges: readonly Range[], ref: IVerseRef): number => {
    const at = ranges.findIndex(([from, to]): boolean => key(ref) >= key(from) && key(ref) <= key(to));
    if (at < 0) throw new Error(`no parsha for ${ref.book} ${ref.chapter}:${ref.verse}`);
    return at;
};

/** Все слова Торы в порядке чтения и список из 54 глав. */
export const loadTorah = async (): Promise<{tokens: IToken[]; parshiot: IParshaInfo[]}> => {
    const tokens: IToken[] = [];
    const parshiot: IParshaInfo[] = [];
    for (const [book, name] of BOOKS.entries()) {
        const index = await cached(`idx-${name}.json`, `${API}/v2/raw/index/${name}`) as IIndex;
        const text = await cached(`txt-${name}.json`, `${API}/v3/texts/${name}?version=${VERSION}`) as IText;
        const nodes = index.alt_structs.Parasha.nodes;
        const ranges = nodes.map((node): Range => parseRange(book, node.wholeRef));
        const base = parshiot.length;
        for (const node of nodes) parshiot.push({slug: node.sharedTitle, book, ref: node.wholeRef});
        for (const [c, chapter] of text.versions[0]!.text.entries()) {
            for (const [v, verse] of chapter.entries()) {
                const ref = {book, chapter: c + 1, verse: v + 1};
                const parsha = base + parshaOf(ranges, ref);
                for (const word of normalizeVerse(verse)) tokens.push({word, ref, parsha});
            }
        }
    }
    return {tokens, parshiot};
};
