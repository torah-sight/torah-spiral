import type {IParaphraseOptions} from '#src/domain/density/model/types.ts';

/** Пороги подобраны так, чтобы обычный рассказ (Лех-Леха, Ваера) почти не сворачивался. */
export const DEFAULT_PARAPHRASE_OPTIONS: IParaphraseOptions = {
    threshold: 0.8,
    knownThreshold: 0.3,
    minWords: 5,
    window: 3
};
