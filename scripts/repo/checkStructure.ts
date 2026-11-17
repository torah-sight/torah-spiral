// Проверка структуры: в каталоге ≤ 7 элементов, в файле кода ≤ 500 строк.
// Корень проекта не проверяется: там конфиги, которые требуют инструменты.
import {readdirSync, readFileSync, statSync} from 'node:fs';
import {extname, join} from 'node:path';

const ROOTS = ['src', 'scripts', 'tests', '.github'];
const MAX_ENTRIES = 7;
const MAX_LINES = 500;
const CODE = new Set(['.ts', '.tsx', '.js', '.mjs', '.css', '.html', '.json', '.yml', '.yaml']);

const problems: string[] = [];

const walk = (dir: string): void => {
    const entries = readdirSync(dir);
    if (entries.length > MAX_ENTRIES) problems.push(`${dir}: ${entries.length} элементов (> ${MAX_ENTRIES})`);
    for (const entry of entries) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) { walk(path); continue; }
        if (!CODE.has(extname(entry))) continue;
        const lines = readFileSync(path, 'utf8').split('\n').length;
        if (lines > MAX_LINES) problems.push(`${path}: ${lines} строк (> ${MAX_LINES})`);
    }
};

for (const root of ROOTS) {
    try { walk(root); } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    }
}

if (problems.length > 0) {
    console.error(problems.join('\n'));
    process.exit(1);
}
console.log('structure ok');
