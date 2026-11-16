import {FLOOR_RATE} from './floorRate.ts';
import {FLOORS, type Quotas} from './floors.ts';

const sum = (total: number, value: number): number => total + value;

const scaleQuotas = (scale: number): Quotas => {
    const quotas = {} as Quotas;
    for (const floor of FLOORS) quotas[floor] = Math.max(1, Math.round(FLOOR_RATE[floor] * scale));
    return quotas;
};

/** Ёмкость каждого этажа пропорциональна объёму главы без повторов (минимум 1). */
export const computeQuotas = (effective: readonly number[]): Quotas[] => {
    const mean = effective.reduce(sum, 0) / Math.max(1, effective.length);
    return effective.map((value: number): Quotas => scaleQuotas(mean > 0 ? value / mean : 1));
};
