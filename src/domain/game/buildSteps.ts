import type {IGameParsha, IGameSetup, IGameStep} from './types.ts';

/** План раунда: варианты вопроса для каждой главы, крайние и участие глав. */
export interface IRoundPlan {
    /** Для каждой главы раунда — все подходящие вопросы о ней; в раунд попадёт ровно один. */
    choices: IGameStep[][];
    /** Главы без подходящего вопроса (крайние без соседа) — вопрос-название, в последнюю очередь. */
    edges: IGameStep[];
    active: boolean[];
}

const step = (parsha: number, kind: IGameStep['kind'], item = 0, refs: readonly number[] = []): IGameStep =>
    ({parsha, kind, item, refs});

/** Вопросы режима «место», ответ на которые — глава `i` (соседи — внутри раунда). */
const placeChoices = (setup: IGameSetup, active: readonly boolean[], i: number): IGameStep[] => {
    const {kinds} = setup;
    const prev = active[i - 1] === true;
    const next = active[i + 1] === true;
    const out: IGameStep[] = [];
    if (kinds.name) out.push(step(i, 'name'));
    if (kinds.between && prev && next) out.push(step(i, 'between', 0, [i - 1, i + 1]));
    // «до»: показана следующая глава — найти эту.
    if (kinds.before && next) out.push(step(i, 'before', 0, [i + 1]));
    // «после»: показана предыдущая глава — найти эту.
    if (kinds.after && prev) out.push(step(i, 'after', 0, [i - 1]));
    return out;
};

/** Вопросы режима «по сюжету» о главе `i`: элементы сюжета и уникальные фразы. */
const textChoices = (meta: IGameParsha, setup: IGameSetup, i: number): IGameStep[] => {
    const out: IGameStep[] = [];
    if (setup.kinds.story) for (let item = 0; item < meta.stories; item++) out.push(step(i, 'story', item));
    if (setup.kinds.phrase) for (const item of meta.phrases) out.push(step(i, 'phrase', item));
    return out;
};

/** План раунда по выбранным книгам, режиму и видам вопросов: каждая глава — один раз. */
export const buildSteps = (parshiot: readonly IGameParsha[], setup: IGameSetup): IRoundPlan => {
    const active = parshiot.map((meta: IGameParsha): boolean => setup.books[meta.book] === true);
    const choices: IGameStep[][] = [];
    const edges: IGameStep[] = [];
    for (const [i, on] of active.entries()) {
        if (!on) continue;
        const own = setup.mode === 'place' ? placeChoices(setup, active, i) : textChoices(parshiot[i]!, setup, i);
        if (own.length > 0) choices.push(own);
        else if (setup.mode === 'place') edges.push(step(i, 'name'));
    }
    return {choices, edges, active};
};
