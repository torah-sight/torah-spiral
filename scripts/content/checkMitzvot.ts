import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {MITZVOT} from '#src/content/tallies/mitzvot.ts';

const CACHE = '.cache/chinukh-idx.json';
const INDEX_URL = 'https://www.sefaria.org/api/v2/raw/index/Sefer_HaChinukh';

interface IChinukhIndex {
    alt_structs: {Parasha: {nodes: {sharedTitle: string; nodes: unknown[]}[]}};
}

/** Разметка «Сефер а-Хинух» по главам в Sefaria (с кэшем). */
const loadIndex = async (): Promise<IChinukhIndex> => {
    if (!existsSync(CACHE)) {
        mkdirSync('.cache', {recursive: true});
        const response = await fetch(INDEX_URL);
        if (!response.ok) throw new Error(`${INDEX_URL}: ${response.status}`);
        writeFileSync(CACHE, await response.text());
    }
    return JSON.parse(readFileSync(CACHE, 'utf8')) as IChinukhIndex;
};

const slugOf = (parsha: IParsha): string => parsha.slug;

/** Числа заповедей из заголовков Хинуха совпадают с его разметкой в Sefaria; итог 248 + 365. */
export const checkMitzvot = async (problems: string[]): Promise<void> => {
    const slugs = new Set(PARSHIOT.map(slugOf));
    for (const slug of Object.keys(MITZVOT)) if (!slugs.has(slug)) problems.push(`mitzvot: нет главы ${slug}`);
    const listed = new Map<string, number>();
    for (const node of (await loadIndex()).alt_structs.Parasha.nodes) listed.set(node.sharedTitle, node.nodes.length);
    let positive = 0;
    let negative = 0;
    for (const slug of slugs) {
        const [pos, neg] = MITZVOT[slug] ?? [0, 0];
        positive += pos;
        negative += neg;
        if (pos + neg !== (listed.get(slug) ?? 0)) {
            problems.push(`mitzvot ${slug}: ${pos}+${neg}, а в Sefaria ${listed.get(slug) ?? 0}`);
        }
    }
    if (positive !== 248 || negative !== 365) {
        problems.push(`mitzvot: ${positive} עשה + ${negative} ל״ת вместо 248 + 365`);
    }
};
