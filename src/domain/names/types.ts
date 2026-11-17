import type {NAME_KEYS} from './nameKeys.ts';

/** Ключ святого Имени. */
export type NameKey = (typeof NAME_KEYS)[number];

/** Поправка к подсчёту по написанию: будничное вхождение (count < 0) или святое, что не узнаётся по огласовке. */
export interface INameFix {
    /** Книга 0–4. */
    book: number;
    /** «глава:стих». */
    ref: string;
    name: NameKey;
    /** −n — столько вхождений в стихе будничные; +n — столько святых добавить. */
    count: number;
    /** Почему; источник. */
    why: string;
}
