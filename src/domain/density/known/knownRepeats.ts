import type {IKnownRepeat} from '#src/domain/density/model/types.ts';

const GEN = 0;
const EX = 1;
const LEV = 2;
const NUM = 3;
const DEUT = 4;

/** Известные пересказы Торы (книги 0–4). Источник поиска — предшествующий текст. */
export const KNOWN_REPEATS: IKnownRepeat[] = [
    {note: 'Eliezer retells the well', target: [GEN, '24:34-24:49'], sources: [[GEN, '24:1-24:27']]},
    {note: 'Pharaoh retells his dreams', target: [GEN, '41:17-41:24'], sources: [[GEN, '41:1-41:8']]},
    {note: 'Brothers report to Jacob', target: [GEN, '42:29-42:34'], sources: [[GEN, '42:6-42:20']]},
    {
        note: 'Judah retells the journeys',
        target: [GEN, '44:19-44:29'],
        sources: [[GEN, '42:7-42:38'], [GEN, '43:2-43:7']]
    },
    {note: 'Ritual decalogue', target: [EX, '34:10-34:26'], sources: [[EX, '23:12-23:19']]},
    {note: 'Mishkan built as commanded', target: [EX, '35:4-39:43'], sources: [[EX, '25:1-31:18']]},
    {note: 'Mishkan erected', target: [EX, '40:17-40:33'], sources: [[EX, '40:1-40:15']]},
    {note: 'Forbidden unions with penalties', target: [LEV, '20:10-20:21'], sources: [[LEV, '18:6-18:23']]},
    {note: 'Camps repeat the census', target: [NUM, '2:3-2:31'], sources: [[NUM, '1:5-1:46']]},
    {note: 'Gifts of the princes', target: [NUM, '7:18-7:83'], sources: [[NUM, '7:12-7:17']]},
    {note: 'Order of march', target: [NUM, '10:14-10:28'], sources: [[NUM, '2:3-2:31']]},
    {note: 'Second census', target: [NUM, '26:5-26:51'], sources: [[NUM, '1:20-1:46']]},
    {note: 'Sukkot offerings', target: [NUM, '29:17-29:38'], sources: [[NUM, '29:12-29:16']]},
    {note: 'Judges appointed', target: [DEUT, '1:9-1:18'], sources: [[EX, '18:13-18:26']]},
    {note: 'The spies', target: [DEUT, '1:19-1:46'], sources: [[NUM, '13:1-14:45']]},
    {note: 'Sihon and Og', target: [DEUT, '2:26-3:11'], sources: [[NUM, '21:21-21:35']]},
    {note: 'Ten Commandments', target: [DEUT, '5:6-5:18'], sources: [[EX, '20:2-20:14']]},
    {note: 'Golden calf and second tablets', target: [DEUT, '9:7-10:11'], sources: [[EX, '32:1-34:28']]},
    {note: 'Words on heart and doorposts', target: [DEUT, '11:18-11:21'], sources: [[DEUT, '6:6-6:9']]},
    {note: 'Kosher animals', target: [DEUT, '14:3-14:21'], sources: [[LEV, '11:1-11:47']]}
];
