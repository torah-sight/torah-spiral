import {buildSteps} from './buildSteps.ts';
import {mixBalanced} from './mixBalanced.ts';
import {shuffle} from './shuffle.ts';
import type {IGameParsha, IGameSetup, IRound} from './types.ts';

const zero = (): number => 0;

/** Раунд: вопросы вперемешку (типы поровну), крайние — в конце; счётчики ответов по главам. */
export const planRound = (parshiot: readonly IGameParsha[], setup: IGameSetup, random: () => number): IRound => {
    const plan = buildSteps(parshiot, setup);
    const steps = [...mixBalanced(plan.groups, random), ...shuffle(plan.edges, random)];
    const left = Array.from({length: parshiot.length}, zero);
    for (const item of steps) left[item.parsha]! += 1;
    return {steps, active: plan.active, left};
};
