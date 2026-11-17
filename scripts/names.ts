// Святые Имена по главам → src/content/generated/names.json. Запуск: npm run names.
import {writeFileSync} from 'node:fs';
import {countNames} from './content/countNames.ts';
import {loadMasorah} from './torah/loadMasorah.ts';

const OUT = 'src/content/generated/names.json';

const problems: string[] = [];
const counts = countNames(await loadMasorah(), problems);
if (problems.length > 0) {
    console.error(problems.join('\n'));
    process.exit(1);
}
writeFileSync(OUT, `${JSON.stringify(counts)}\n`);
const add = (a: number, b: number): number => a + b;
const total = (list: readonly number[]): number => list.reduce(add, 0);
console.log(Object.entries(counts).map(([key, list]): string => `${key} ${total(list)}`).join(', '));
