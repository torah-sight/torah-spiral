import type {IKnownRepeat, IParaphraseOptions, IScan, IToken} from '#src/domain/density/model/types.ts';
import {buildIdf} from './buildIdf.ts';
import {DEFAULT_PARAPHRASE_OPTIONS} from './defaultParaphraseOptions.ts';
import {groupVerses} from './groupVerses.ts';
import {scanAll} from './scan/scanAll.ts';
import {scanKnown} from './scan/scanKnown.ts';

/**
 * Помечает слова стихов-пересказов.
 *
 * @returns индекс первого слова окна-источника для пересказанных слов, иначе -1
 */
export const markParaphrases = (
    tokens: readonly IToken[],
    known: readonly IKnownRepeat[],
    options: IParaphraseOptions = DEFAULT_PARAPHRASE_OPTIONS
): Int32Array => {
    const verses = groupVerses(tokens);
    const scan: IScan = {verses, idf: buildIdf(verses), marks: new Int32Array(tokens.length).fill(-1), options};
    scanKnown(scan, known);
    scanAll(scan);
    return scan.marks;
};
