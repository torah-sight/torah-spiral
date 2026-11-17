// Проверка контента по тексту Торы: иврит каждого термина есть в своей главе, объём этажей = квотам.
// Запуск: npm run content:check (нужен кэш Sefaria в .cache/ или сеть).
import type {IParsha, Term} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import type {IToken} from '#src/domain/density/model/types.ts';
import {LOCALES} from '#src/i18n/locales.ts';
import {countWords} from '#src/i18n/format/countWords.ts';
import {readFileSync} from 'node:fs';
import {countNames} from './content/countNames.ts';
import {findTerm} from './content/findTerm.ts';
import {uniquePhrases} from './content/uniquePhrases.ts';
import {torahWords} from './content/torahSpelling.ts';
import {loadMasorah} from './torah/loadMasorah.ts';
import {loadTorah} from './torah/loadTorah.ts';

type ListFloor = 'names' | 'phrases';

const emptyList = (): IToken[] => [];

const LIST_FLOORS: readonly ListFloor[] = ['names', 'phrases'];

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

/** Стих названия лежит в главе и содержит слово названия. */
const checkOrigin = (parsha: IParsha, tokens: readonly IToken[], problems: string[]): void => {
    const [chapter = 0, verse = 0] = parsha.origin.ref.split(':').map(Number);
    const {from, to} = parsha.range;
    const at = chapter * 1000 + verse;
    if (at < from.chapter * 1000 + from.verse || at > to.chapter * 1000 + to.verse) {
        problems.push(`${parsha.ordinal} ${parsha.slug}: origin ${parsha.origin.ref} вне главы`);
        return;
    }
    const inVerse = tokens.filter(
        (token: IToken): boolean => token.ref.chapter === chapter && token.ref.verse === verse
    );
    if (!findTerm(inVerse, torahWords(parsha.he), false)) {
        problems.push(`${parsha.ordinal} ${parsha.slug}: в стихе ${parsha.origin.ref} нет слова «${parsha.he}»`);
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
        checkOrigin(parsha, byParsha[parsha.index]!, problems);
    }
    const stored = readFileSync('src/content/generated/uniquePhrases.json', 'utf8');
    if (JSON.stringify(JSON.parse(stored)) !== JSON.stringify(uniquePhrases(PARSHIOT, byParsha))) {
        problems.push('src/content/generated/uniquePhrases.json устарел: npm run phrases');
    }
    const names = readFileSync('src/content/generated/names.json', 'utf8');
    if (JSON.stringify(JSON.parse(names)) !== JSON.stringify(countNames(await loadMasorah(), problems))) {
        problems.push('src/content/generated/names.json устарел: npm run names');
    }
    if (problems.length > 0) {
        console.error(problems.join('\n'));
        process.exit(1);
    }
    console.log(`content ok: ${PARSHIOT.length} глав`);
};

await main();
