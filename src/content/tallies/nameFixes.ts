import type {INameFix, NameKey} from '#src/domain/names/types.ts';

/** Почему вхождение будничное (или святое вопреки огласовке). */
const WHY = {
    idols: 'чужие боги, идолы — будничное',
    soferim: 'Софрим 4:4–5 — будничное',
    judges: 'судьи, власть (Онкелос, Раши) — будничное',
    princes: 'сыны знатных (Онкелос: בני רברביא) — будничное',
    place: 'Бейт-Эль — имя места',
    these: 'הָאֵל — «эти»',
    power: 'לְאֵל יָד — «в силе руки», Софрим 4:9',
    person: 'Лаэль — имя человека',
    noGod: '«не-бог», о бесах и идолах',
    ehyeh: 'אֶהְיֶה — «буду»; Имя — только «אהיה אשר אהיה» (Шмот 3:14)',
    adnut: 'Софрим 4:5: «וַאדֹנֵי הָאֲדֹנִים» — первое святое'
} as const;

type Row = readonly [book: number, ref: string, name: NameKey, count: number, why: keyof typeof WHY];

const ROWS: readonly Row[] = [
    [0, '3:5', 'elokim', -1, 'soferim'], [0, '6:2', 'elokim', -1, 'princes'], [0, '6:4', 'elokim', -1, 'princes'],
    [0, '31:30', 'elokim', -1, 'idols'], [0, '31:32', 'elokim', -1, 'idols'], [0, '31:53', 'elokim', -2, 'soferim'],
    [0, '33:10', 'elokim', -1, 'soferim'], [0, '35:2', 'elokim', -1, 'idols'], [0, '35:4', 'elokim', -1, 'idols'],
    [1, '4:16', 'elokim', -1, 'judges'], [1, '7:1', 'elokim', -1, 'judges'], [1, '12:12', 'elokim', -1, 'idols'],
    [1, '18:11', 'elokim', -1, 'idols'], [1, '20:3', 'elokim', -1, 'idols'], [1, '20:20', 'elokim', -2, 'idols'],
    [1, '21:6', 'elokim', -1, 'judges'], [1, '22:7', 'elokim', -1, 'judges'], [1, '22:8', 'elokim', -2, 'judges'],
    [1, '22:19', 'elokim', -1, 'idols'], [1, '23:13', 'elokim', -1, 'idols'], [1, '23:24', 'elokim', -1, 'idols'],
    [1, '23:32', 'elokim', -1, 'idols'], [1, '23:33', 'elokim', -1, 'idols'], [1, '32:1', 'elokim', -1, 'idols'],
    [1, '32:4', 'elokim', -1, 'idols'], [1, '32:8', 'elokim', -1, 'idols'], [1, '32:23', 'elokim', -1, 'idols'],
    [1, '32:31', 'elokim', -1, 'idols'], [1, '34:15', 'elokim', -2, 'idols'], [1, '34:16', 'elokim', -2, 'idols'],
    [1, '34:17', 'elokim', -1, 'idols'], [2, '19:4', 'elokim', -1, 'idols'], [3, '25:2', 'elokim', -2, 'idols'],
    [3, '33:4', 'elokim', -1, 'idols'], [4, '4:28', 'elokim', -1, 'idols'], [4, '5:7', 'elokim', -1, 'idols'],
    [4, '6:14', 'elokim', -2, 'idols'], [4, '7:4', 'elokim', -1, 'idols'], [4, '7:16', 'elokim', -1, 'idols'],
    [4, '7:25', 'elokim', -1, 'idols'], [4, '8:19', 'elokim', -1, 'idols'], [4, '10:17', 'elokim', -1, 'soferim'],
    [4, '11:16', 'elokim', -1, 'idols'], [4, '11:28', 'elokim', -1, 'idols'], [4, '12:2', 'elokim', -1, 'idols'],
    [4, '12:3', 'elokim', -1, 'idols'], [4, '12:30', 'elokim', -2, 'idols'], [4, '12:31', 'elokim', -2, 'idols'],
    [4, '13:3', 'elokim', -1, 'idols'], [4, '13:7', 'elokim', -1, 'idols'], [4, '13:8', 'elokim', -1, 'idols'],
    [4, '13:14', 'elokim', -1, 'idols'], [4, '17:3', 'elokim', -1, 'idols'], [4, '18:20', 'elokim', -1, 'idols'],
    [4, '20:18', 'elokim', -1, 'idols'], [4, '28:14', 'elokim', -1, 'idols'], [4, '28:36', 'elokim', -1, 'idols'],
    [4, '28:64', 'elokim', -1, 'idols'], [4, '29:17', 'elokim', -1, 'idols'], [4, '29:25', 'elokim', -2, 'idols'],
    [4, '30:17', 'elokim', -1, 'idols'], [4, '31:16', 'elokim', -1, 'idols'], [4, '31:18', 'elokim', -1, 'idols'],
    [4, '31:20', 'elokim', -1, 'idols'], [4, '32:17', 'elokim', -1, 'noGod'], [4, '32:37', 'elokim', -1, 'idols'],
    [4, '32:39', 'elokim', -1, 'noGod'],
    [0, '12:8', 'el', -2, 'place'], [0, '13:3', 'el', -2, 'place'], [0, '19:8', 'el', -1, 'these'],
    [0, '19:25', 'el', -1, 'these'], [0, '26:3', 'el', -1, 'these'], [0, '26:4', 'el', -1, 'these'],
    [0, '28:19', 'el', -1, 'place'], [0, '31:13', 'el', -1, 'place'], [0, '31:29', 'el', -1, 'power'],
    [0, '35:1', 'el', -1, 'place'], [0, '35:3', 'el', -1, 'place'], [0, '35:6', 'el', -1, 'place'],
    [0, '35:7', 'el', -1, 'place'], [0, '35:8', 'el', -1, 'place'], [0, '35:15', 'el', -1, 'place'],
    [0, '35:16', 'el', -1, 'place'], [1, '34:14', 'el', -1, 'idols'], [2, '18:27', 'el', -1, 'these'],
    [3, '3:24', 'el', -1, 'person'], [4, '4:42', 'el', -1, 'these'], [4, '7:22', 'el', -1, 'these'],
    [4, '19:11', 'el', -1, 'these'], [4, '28:32', 'el', -1, 'power'], [4, '32:12', 'el', -1, 'idols'],
    [4, '32:21', 'el', -1, 'noGod'],
    [4, '32:17', 'eloah', -1, 'noGod'],
    [1, '3:12', 'ehyeh', -1, 'ehyeh'], [1, '4:12', 'ehyeh', -1, 'ehyeh'], [1, '4:15', 'ehyeh', -1, 'ehyeh'],
    [4, '31:23', 'ehyeh', -1, 'ehyeh'],
    [4, '10:17', 'adnut', 1, 'adnut']
];

const toFix = ([book, ref, name, count, why]: Row): INameFix => ({book, ref, name, count, why: WHY[why]});

/**
 * Поправки к подсчёту Имён по написанию и огласовке MAM.
 *
 * Спорные места оставлены святыми: Берешит 18:3 и 20:13 (Шевуот 35б, Софрим 4:6), 33:20 и 35:7 (простой смысл),
 * Шмот 22:27 («и святое, и будничное» — Софрим 4:5).
 */
export const NAME_FIXES: readonly INameFix[] = ROWS.map(toFix);
