import type {IOrigin} from '#src/content/model/types.ts';

/** Шмот: откуда название каждой главы и к чему оно относится. */
export const EXODUS_ORIGINS: readonly IOrigin[] = [
    {
        slug: 'Shemot', ref: '1:1',
        note: {
            he: '«ואלה שמות בני ישראל הבאים מצרימה» — רשימת בני יעקב שירדו למצרים.',
            ru: '«Вот имена сынов Израиля, пришедших в Египет» — перечень сыновей Яакова, спустившихся в Египет.',
            en: '“These are the names of the sons of Israel who came to Egypt” — the list of Jacob’s sons who '
                + 'went down to Egypt.'
        }
    },
    {
        slug: 'Vaera', ref: '6:3',
        note: {
            he: '«וארא אל אברהם אל יצחק ואל יעקב באל שדי» — ה׳ אומר למשה שנגלה לאבות, ועתה יגאל את ישראל.',
            ru: '«И являлся Я Аврааму, Ицхаку и Яакову как Всемогущий» — Всевышний говорит Моше, что '
                + 'открывался праотцам, а теперь избавит Израиль.',
            en: '“I appeared to Abraham, Isaac and Jacob as G-d Almighty” — G-d tells Moses He revealed '
                + 'Himself to the fathers and will now redeem Israel.'
        }
    },
    {
        slug: 'Bo', ref: '10:1',
        note: {
            he: '«בא אל פרעה» — ה׳ שולח את משה אל פרעה לפני המכות האחרונות.',
            ru: '«Войди к фараону» — Всевышний посылает Моше к фараону перед последними казнями.',
            en: '“Come to Pharaoh” — G-d sends Moses to Pharaoh before the last plagues.'
        }
    },
    {
        slug: 'Beshalach', ref: '13:17',
        note: {
            he: '«ויהי בשלח פרעה את העם» — אחרי שפרעה שילח את העם: היציאה וקריעת ים סוף.',
            ru: '«И было, когда отпустил фараон народ» — исход и рассечение моря.',
            en: '“When Pharaoh let the people go” — the exodus and the splitting of the sea.'
        }
    },
    {
        slug: 'Yitro', ref: '18:1',
        note: {
            he: 'יתרו, כהן מדין וחותן משה, שמע את כל אשר עשה ה׳ לישראל ובא אל משה במדבר.',
            ru: 'Итро, священник Мидьяна и тесть Моше, услышал обо всём, что сделал Всевышний для Израиля, и '
                + 'пришёл к Моше в пустыню.',
            en: 'Jethro, priest of Midian and Moses’ father-in-law, heard all that G-d had done for Israel '
                + 'and came to Moses in the desert.'
        }
    },
    {
        slug: 'Mishpatim', ref: '21:1',
        note: {
            he: '«ואלה המשפטים אשר תשים לפניהם» — דיני ממונות ונזיקין שניתנו אחרי מעמד הר סיני.',
            ru: '«Вот законы, которые положишь перед ними» — гражданские законы, данные после Синая.',
            en: '“These are the laws you shall set before them” — the civil laws given after Sinai.'
        }
    },
    {
        slug: 'Terumah', ref: '25:2',
        note: {
            he: '«ויקחו לי תרומה» — איסוף התרומות לבניית המשכן.',
            ru: '«Пусть возьмут Мне приношение» — сбор пожертвований на строительство Мишкана.',
            en: '“Let them take for Me an offering” — collecting gifts to build the Tabernacle.'
        }
    },
    {
        slug: 'Tetzaveh', ref: '27:20',
        note: {
            he: '«ואתה תצוה את בני ישראל» — לצוות על שמן זית למנורה; בפרשה גם בגדי הכהונה.',
            ru: '«А ты повели сынам Израиля» — принести чистое масло для светильника; в главе также одежды коэнов.',
            en: '“And you shall command the children of Israel” — to bring pure oil for the lamp; the portion '
                + 'also describes the priestly garments.'
        }
    },
    {
        slug: 'Ki Tisa', ref: '30:12',
        note: {
            he: '«כי תשא את ראש בני ישראל» — מניין העם באמצעות מחצית השקל.',
            ru: '«Когда будешь вести счёт сынам Израиля» — подсчёт народа через половину шекеля.',
            en: '“When you take the census of the children of Israel” — counting the people by the half-shekel.'
        }
    },
    {
        slug: 'Vayakhel', ref: '35:1',
        note: {
            he: '«ויקהל משה את כל עדת בני ישראל» — משה מקהיל את העם לדבר על השבת ועל מלאכת המשכן.',
            ru: '«И собрал Моше всю общину сынов Израиля» — чтобы сказать о шабате и о работе над Мишканом.',
            en: '“Moses assembled all the congregation of Israel” — to speak of the Sabbath and the work of '
                + 'the Tabernacle.'
        }
    },
    {
        slug: 'Pekudei', ref: '38:21',
        note: {
            he: '«אלה פקודי המשכן» — חשבון החומרים שמהם נעשו המשכן וכליו.',
            ru: '«Вот счёт Мишкана» — отчёт о материалах, из которых сделаны Мишкан и его утварь.',
            en: '“These are the accounts of the Tabernacle” — the reckoning of materials used for the '
                + 'Tabernacle and its vessels.'
        }
    }
];
