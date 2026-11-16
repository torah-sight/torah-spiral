import {shuffle} from './shuffle.ts';
import type {ClueKind, IGameStep} from './types.ts';

const kindOf = (option: IGameStep): ClueKind => option.kind;

const kindsOf = (options: readonly IGameStep[]): ClueKind[] => [...new Set(options.map(kindOf))];

const byFewerKinds = (a: readonly IGameStep[], b: readonly IGameStep[]): number =>
    kindsOf(a).length - kindsOf(b).length;

const pickFrom = <T>(items: readonly T[], random: () => number): T => items[Math.floor(random() * items.length)]!;

/**
 * По одному вопросу на главу, виды вопросов — поровну.
 *
 * Главы с меньшим выбором видов идут первыми; каждой достаётся вид, который пока выпадал реже всего
 * (при равенстве — случайный), и случайный вопрос этого вида. Итог перемешан.
 */
export const pickBalanced = (choices: readonly (readonly IGameStep[])[], random: () => number): IGameStep[] => {
    const counts = new Map<ClueKind, number>();
    const out: IGameStep[] = [];
    for (const options of shuffle(choices, random).toSorted(byFewerKinds)) {
        const kinds = kindsOf(options);
        const least = Math.min(...kinds.map((kind: ClueKind): number => counts.get(kind) ?? 0));
        const kind = pickFrom(kinds.filter((k: ClueKind): boolean => (counts.get(k) ?? 0) === least), random);
        out.push(pickFrom(options.filter((o: IGameStep): boolean => o.kind === kind), random));
        counts.set(kind, least + 1);
    }
    return shuffle(out, random);
};
