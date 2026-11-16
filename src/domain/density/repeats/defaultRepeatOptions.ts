import type {IRepeatOptions} from '#src/domain/density/model/types.ts';
import {DEFAULT_PARAPHRASE_OPTIONS} from '#src/domain/density/paraphrase/defaultParaphraseOptions.ts';

/** Шингл из 5 слов: формулы короче не считаются дословным повтором. */
export const DEFAULT_REPEAT_OPTIONS: IRepeatOptions = {
    shingle: 5,
    reportMin: 20,
    gap: 12,
    paraphrase: DEFAULT_PARAPHRASE_OPTIONS
};
