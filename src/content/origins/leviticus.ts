import type {IOrigin} from '#src/content/model/types.ts';

/** Ваикра: откуда название каждой главы и к чему оно относится. */
export const LEVITICUS_ORIGINS: readonly IOrigin[] = [
    {
        slug: 'Vayikra', ref: '1:1',
        note: {
            he: '«ויקרא אל משה» — ה׳ קורא למשה מאהל מועד ומלמד את דיני הקרבנות.',
            ru: '«И воззвал к Моше» — Всевышний зовёт Моше из Шатра встречи и учит законам жертвоприношений.',
            en: '“And He called to Moses” — G-d calls Moses from the Tent of Meeting and teaches the laws of '
                + 'offerings.'
        }
    },
    {
        slug: 'Tzav', ref: '6:2',
        note: {
            he: '«צו את אהרן ואת בניו» — הוראות לכהנים על עבודת הקרבנות.',
            ru: '«Повели Аарону и сынам его» — указания коэнам о служении с жертвами.',
            en: '“Command Aaron and his sons” — instructions to the priests for the service of the offerings.'
        }
    },
    {
        slug: 'Shmini', ref: '9:1',
        note: {
            he: '«ויהי ביום השמיני» — היום שאחרי שבעת ימי המילואים, שבו החלה העבודה במשכן.',
            ru: '«И было в восьмой день» — после семи дней посвящения коэнов, когда началось служение в Мишкане.',
            en: '“On the eighth day” — after the seven days of the priests’ inauguration, when the Tabernacle '
                + 'service began.'
        }
    },
    {
        slug: 'Tazria', ref: '12:2',
        note: {
            he: '«אשה כי תזריע» — דיני טהרת היולדת, ואחריהם דיני צרעת.',
            ru: '«Женщина, когда зачнёт» — законы чистоты после родов, а затем законы о цараат.',
            en: '“When a woman conceives” — the purity laws after childbirth, followed by the laws of tzaraat.'
        }
    },
    {
        slug: 'Metzora', ref: '14:2',
        note: {
            he: '«זאת תהיה תורת המצרע ביום טהרתו» — דין המצורע ביום טהרתו.',
            ru: '«Вот закон о поражённом цараат в день его очищения» — мецора — человек, поражённый цараат.',
            en: '“This shall be the law of the metzora on the day of his purification” — the metzora is one '
                + 'afflicted with tzaraat.'
        }
    },
    {
        slug: 'Achrei Mot', ref: '16:1',
        note: {
            he: '«אחרי מות שני בני אהרן» — אחרי מות נדב ואביהוא: עבודת יום הכיפורים.',
            ru: '«После смерти двух сыновей Аарона» — после гибели Надава и Авиу: служение Йом Кипура.',
            en: '“After the death of Aaron’s two sons” — after Nadab and Abihu died: the Yom Kippur service.'
        }
    },
    {
        slug: 'Kedoshim', ref: '19:2',
        note: {
            he: '«קדשים תהיו כי קדוש אני ה׳ אלקיכם» — קריאה להתקדש בכל תחומי החיים.',
            ru: '«Святы будьте, ибо свят Я, Всевышний» — призыв к святости во всех сторонах жизни.',
            en: '“You shall be holy, for I G-d your G-d am holy” — a call to holiness in every part of life.'
        }
    },
    {
        slug: 'Emor', ref: '21:1',
        note: {
            he: '«אמר אל הכהנים בני אהרן» — דיני קדושת הכהנים, ואחריהם מועדי השנה.',
            ru: '«Скажи коэнам, сынам Аарона» — законы святости коэнов, а затем праздники года.',
            en: '“Speak to the priests, the sons of Aaron” — the holiness of the priests, then the festivals '
                + 'of the year.'
        }
    },
    {
        slug: 'Behar', ref: '25:1',
        note: {
            he: '«וידבר ה׳ אל משה בהר סיני» — דיני שמיטה ויובל שנאמרו בהר סיני.',
            ru: '«И говорил Всевышний Моше на горе Синай» — законы шмиты и юбилея, сказанные на горе Синай.',
            en: '“G-d spoke to Moses on Mount Sinai” — the laws of the sabbatical and jubilee years, given at Sinai.'
        }
    },
    {
        slug: 'Bechukotai', ref: '26:3',
        note: {
            he: '«אם בחקתי תלכו» — הברכות למי שהולך בחוקי ה׳, והתוכחה למי שאינו.',
            ru: '«Если по уставам Моим будете ходить» — благословения за верность и предостережения за отступничество.',
            en: '“If you walk in My statutes” — the blessings for keeping G-d’s laws and the warnings for '
                + 'forsaking them.'
        }
    }
];
