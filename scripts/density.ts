// Объём глав без повторов → src/content/generated/density.json. Запуск: npm run density (Node 24, нативный TS).
// Текст: Sefaria, «Tanach with Text Only» (Public Domain); кэш в .cache/.
import {writeFileSync} from 'node:fs';
import type {IParshaDensity, IToken} from '#src/domain/density/model/types.ts';
import {DEFAULT_REPEAT_OPTIONS} from '#src/domain/density/repeats/defaultRepeatOptions.ts';
import {measureParshiot} from '#src/domain/density/repeats/measureParshiot.ts';
import {loadTorah} from './torah/loadTorah.ts';

const OUT = 'src/content/generated/density.json';
const SOURCE = 'Sefaria — Tanach with Text Only (Public Domain)';

const percent = (p: IParshaDensity): number => Math.round((1 - p.effective / p.raw) * 100);

const report = (slug: string, p: IParshaDensity, i: number): string =>
    `${String(i + 1).padStart(2)} ${slug.padEnd(18)} ${String(p.raw).padStart(5)} → ${String(p.effective).padStart(5)}`
    + `  −${percent(p)}%`;

const sizeOf = (verses: Set<string>): number => verses.size;

const emptySet = (): Set<string> => new Set();

const zero = (): number => 0;

/** Число букв каждой главы (ктив, без огласовок). */
const countLetters = (tokens: readonly IToken[], count: number): number[] => {
    const letters = Array.from({length: count}, zero);
    for (const token of tokens) letters[token.parsha]! += token.word.length;
    return letters;
};

/** Число стихов каждой главы (размер главы для показа). */
const countVerses = (tokens: readonly IToken[], count: number): number[] => {
    const seen = Array.from({length: count}, emptySet);
    for (const token of tokens) seen[token.parsha]!.add(`${token.ref.chapter}:${token.ref.verse}`);
    return seen.map(sizeOf);
};

const main = async (): Promise<void> => {
    const {tokens, parshiot} = await loadTorah();
    const measured = measureParshiot(tokens, parshiot.length, DEFAULT_REPEAT_OPTIONS);
    const verses = countVerses(tokens, parshiot.length);
    const letters = countLetters(tokens, parshiot.length);
    // Одна глава — одна строка: файл короткий и читаемый в diff.
    const rows = parshiot.map((p, i): string => {
        const m = measured[i]!;
        const size = {verses: verses[i], letters: letters[i], raw: m.raw};
        const row = {...p, ...size, effective: m.effective, spans: m.spans.slice(0, 6)};
        return `  ${JSON.stringify(row)}`;
    });
    const head = ` "source": ${JSON.stringify(SOURCE)},\n "options": ${JSON.stringify(DEFAULT_REPEAT_OPTIONS)}`;
    writeFileSync(OUT, `{\n${head},\n "parshiot": [\n${rows.join(',\n')}\n ]\n}\n`);
    for (const [i, p] of parshiot.entries()) console.log(report(p.slug, measured[i]!, i));
};

await main();
