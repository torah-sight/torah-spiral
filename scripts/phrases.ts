// Ключевые фразы для игры: только встречающиеся дословно в одной главе → src/content/generated/uniquePhrases.json.
// Запуск: npm run phrases (нужен кэш Sefaria в .cache/ или сеть).
import {writeFileSync} from 'node:fs';
import {PARSHIOT} from '#src/content/parshiot.ts';
import type {IToken} from '#src/domain/density/model/types.ts';
import {uniquePhrases} from './content/uniquePhrases.ts';
import {loadTorah} from './torah/loadTorah.ts';

const OUT = 'src/content/generated/uniquePhrases.json';

const rowJson = (row: number[]): string => `  ${JSON.stringify(row)}`;

const emptyList = (): IToken[] => [];

const main = async (): Promise<void> => {
    const {tokens} = await loadTorah();
    const byParsha: IToken[][] = PARSHIOT.map(emptyList);
    for (const token of tokens) byParsha[token.parsha]!.push(token);
    const unique = uniquePhrases(PARSHIOT, byParsha);
    writeFileSync(OUT, `[\n${unique.map(rowJson).join(',\n')}\n]\n`);
    let total = 0;
    let kept = 0;
    for (const [i, parsha] of PARSHIOT.entries()) {
        total += parsha.phrases.length;
        kept += unique[i]!.length;
        const dropped = parsha.phrases.filter((_, k: number): boolean => !unique[i]!.includes(k));
        for (const phrase of dropped) console.log(`${parsha.ordinal} ${parsha.slug}: не уникальна «${phrase[0]}»`);
    }
    console.log(`уникальных фраз: ${kept} из ${total}`);
};

await main();
