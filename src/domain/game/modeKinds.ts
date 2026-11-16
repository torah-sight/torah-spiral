import type {ClueKind, GameMode} from './types.ts';

/** Виды вопросов каждого режима в порядке показа. */
export const MODE_KINDS: Record<GameMode, readonly ClueKind[]> = {
    place: ['name', 'between', 'before', 'after'],
    story: ['story', 'phrase']
};
