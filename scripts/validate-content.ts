// Проверка контента по тексту Торы: иврит каждого термина есть в своей главе, объём этажей = квотам.
// Запуск: npm run content:check (нужен кэш Sefaria в .cache/ или сеть).
import type {IParsha, Term} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import type {IToken} from '#src/domain/density/model/types.ts';
import {LOCALES} from '#src/i18n/locales.ts';
import {countWords} from '#src/i18n/format/countWords.ts';
import {readFileSync} from 'node:fs';
import {findTerm} from './content/findTerm.ts';
import {uniquePhrases} from './content/uniquePhrases.ts';
import {torahWords} from './content/torahSpelling.ts';
import {loadTorah} from './torah/loadTorah.ts';

type ListFloor = 'names' | 'keywords' | 'phrases';

const emptyList = (): IToken[] => [];

const LIST_FLOORS: readonly ListFloor[] = ['names', 'keywords', 'phrases'];

const checkTerms = (parsha: IParsha, tokens: readonly IToken[], floor: ListFloor, problems: string[]): void => {
    const list: readonly Term[] = parsha[floor];
    // Квота — ёмкость этажа (максимум): наполнители ради числа не нужны.
    if (list.length < 1 || list.length > parsha.quotas[floor]) {
        problems.push(`${parsha.ordinal} ${parsha.slug}: ${floor} ${list.length} вне 1…${parsha.quotas[floor]}`);
    }
    for (const term of list) {
        if (!findTerm(tokens, torahWords(term[0]), floor === 'phrases')) {
            problems.push(`${parsha.ordinal} ${parsha.slug}: ${floor} «${term[0]}» нет в тексте главы`);
        }
    }
};

const checkStory = (parsha: IParsha, problems: string[]): void => {
    const quota = parsha.quotas.story;
    const slack = Math.max(4, Math.round(quota * 0.25));
    for (const locale of LOCALES) {
        const words = countWords(parsha.story[locale].join(' '));
        if (Math.abs(words - quota) > slack) {
            problems.push(`${parsha.ordinal} ${parsha.slug}: story.${locale} ${words} слов, квота ${quota}±${slack}`);
        }
    }
};

const main = async (): Promise<void> => {
    const {tokens} = await loadTorah();
    const byParsha: IToken[][] = PARSHIOT.map(emptyList);
    for (const token of tokens) byParsha[token.parsha]!.push(token);
    const problems: string[] = [];
    for (const parsha of PARSHIOT) {
        for (const floor of LIST_FLOORS) checkTerms(parsha, byParsha[parsha.index]!, floor, problems);
        checkStory(parsha, problems);
    }
    const stored = readFileSync('src/content/uniquePhrases.json', 'utf8');
    if (JSON.stringify(JSON.parse(stored)) !== JSON.stringify(uniquePhrases(PARSHIOT, byParsha))) {
        problems.push('src/content/uniquePhrases.json устарел: npm run phrases');
    }
    if (problems.length > 0) {
        console.error(problems.join('\n'));
        process.exit(1);
    }
    console.log(`content ok: ${PARSHIOT.length} глав`);
};

await main();
