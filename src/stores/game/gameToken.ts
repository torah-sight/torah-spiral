import {carburetorToken} from '@react-carburetor/core';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import uniquePhrases from '#src/content/generated/uniquePhrases.json' with {type: 'json'};
import type {IGameParsha} from '#src/domain/game/types.ts';
import {splitSentences} from '#src/i18n/format/splitSentences.ts';
import {GameStore} from './GameStore.ts';

const PHRASES: readonly (readonly number[])[] = uniquePhrases;

/** Элемент сюжета — предложение; их столько, сколько в самом коротком языке; фразы — только уникальные. */
const metaOf = (parsha: IParsha): IGameParsha => ({
    book: parsha.book,
    stories: Math.min(
        splitSentences(parsha.story.he).length,
        splitSentences(parsha.story.ru).length,
        splitSentences(parsha.story.en).length
    ),
    phrases: PHRASES[parsha.index] ?? []
});

const createGame = (): GameStore => new GameStore(PARSHIOT.map(metaOf));

/** Стор игры в scope приложения. */
export const gameToken = carburetorToken(createGame, 'torah-spiral/game');
