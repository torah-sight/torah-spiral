import type {IGameParsha, IGameSetup, IGameStep} from './types.ts';

/** План раунда: группы вопросов (смешиваются поровну), крайние (в конце) и участие глав. */
export interface IRoundPlan {
    /** Режим «место» — одна группа; «по сюжету» — по группе на вид. */
    groups: IGameStep[][];
    /** Крайние главы без соседа в раунде — обычный вопрос-название, в последнюю очередь. */
    edges: IGameStep[];
    active: boolean[];
}

const step = (parsha: number, kind: IGameStep['kind'], item = 0, refs: readonly number[] = []): IGameStep =>
    ({parsha, kind, item, refs});

const nameStep = (parsha: number): IGameStep => step(parsha, 'name');

/** Вопросы режима «место» для главы `i`; главы без соседа попадают в `edges`. */
const placeSteps = (
    setup: IGameSetup,
    active: readonly boolean[],
    i: number,
    out: {steps: IGameStep[]; edges: Set<number>}
): void => {
    const {kinds} = setup;
    const prev = active[i - 1] === true;
    const next = active[i + 1] === true;
    if (kinds.name) out.steps.push(step(i, 'name'));
    if (kinds.between) {
        if (prev && next) out.steps.push(step(i, 'between', 0, [i - 1, i + 1]));
        else out.edges.add(i);
    }
    // «до»: показана глава i — найти предыдущую; у первой предыдущей нет.
    if (kinds.before) {
        if (prev) out.steps.push(step(i - 1, 'before', 0, [i]));
        else out.edges.add(i);
    }
    // «после»: показана глава i — найти следующую; у последней следующей нет.
    if (kinds.after) {
        if (next) out.steps.push(step(i + 1, 'after', 0, [i]));
        else out.edges.add(i);
    }
};

/** Вопросы режима «по сюжету» для главы `i`: элементы сюжета и уникальные фразы. */
const textSteps = (
    meta: IGameParsha,
    setup: IGameSetup,
    i: number,
    out: {stories: IGameStep[]; phrases: IGameStep[]}
): void => {
    if (setup.kinds.story) for (let item = 0; item < meta.stories; item++) out.stories.push(step(i, 'story', item));
    if (setup.kinds.phrase) for (const item of meta.phrases) out.phrases.push(step(i, 'phrase', item));
};

/** План раунда по выбранным книгам, режиму и видам вопросов (соседство — внутри раунда). */
export const buildSteps = (parshiot: readonly IGameParsha[], setup: IGameSetup): IRoundPlan => {
    const active = parshiot.map((meta: IGameParsha): boolean => setup.books[meta.book] === true);
    const place = {steps: [] as IGameStep[], edges: new Set<number>()};
    const text = {stories: [] as IGameStep[], phrases: [] as IGameStep[]};
    for (const [i, on] of active.entries()) {
        if (!on) continue;
        if (setup.mode === 'place') placeSteps(setup, active, i, place);
        else textSteps(parshiot[i]!, setup, i, text);
    }
    // Крайняя глава, уже спрошенная по названию, повторно не спрашивается.
    if (setup.kinds.name) place.edges.clear();
    const groups = setup.mode === 'place' ? [place.steps] : [text.stories, text.phrases];
    return {groups, edges: [...place.edges].map(nameStep), active};
};
