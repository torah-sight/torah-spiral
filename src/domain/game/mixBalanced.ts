import {shuffle} from './shuffle.ts';

const nonEmpty = <T>(group: readonly T[]): boolean => group.length > 0;
const lengthOf = <T>(group: readonly T[]): number => group.length;
const zero = (): number => 0;

/**
 * Смешивает группы вопросов поровну.
 *
 * Каждая непустая группа перемешивается и обрезается до размера наименьшей; порядок типов —
 * случайная перестановка слотов, так что на каждом шаге тип выпадает равновероятно.
 */
export const mixBalanced = <T>(groups: readonly (readonly T[])[], random: () => number): T[] => {
    const filled = groups.filter(nonEmpty);
    if (filled.length === 0) return [];
    const size = Math.min(...filled.map(lengthOf));
    const pools: T[][] = [];
    const slots: number[] = [];
    for (const [kind, group] of filled.entries()) {
        pools.push(shuffle(group, random).slice(0, size));
        for (let i = 0; i < size; i++) slots.push(kind);
    }
    const cursor = pools.map(zero);
    const out: T[] = [];
    for (const kind of shuffle(slots, random)) out.push(pools[kind]![cursor[kind]!++]!);
    return out;
};
