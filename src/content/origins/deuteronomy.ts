import type {IOrigin} from '#src/content/model/types.ts';

/** Дварим: откуда название каждой главы и к чему оно относится. */
export const DEUTERONOMY_ORIGINS: readonly IOrigin[] = [
    {
        slug: 'Devarim', ref: '1:1',
        note: {
            he: '«אלה הדברים אשר דבר משה אל כל ישראל» — תחילת נאום הפרידה של משה.',
            ru: '«Вот слова, которые говорил Моше всему Израилю» — начало прощальной речи Моше.',
            en: '“These are the words Moses spoke to all Israel” — the beginning of Moses’ farewell address.'
        }
    },
    {
        slug: 'Vaetchanan', ref: '3:23',
        note: {
            he: '«ואתחנן אל ה׳» — משה מתחנן להיכנס לארץ.',
            ru: '«И умолял я Всевышнего» — Моше просит позволить ему войти в землю.',
            en: '“And I pleaded with G-d” — Moses begs to be allowed to enter the land.'
        }
    },
    {
        slug: 'Eikev', ref: '7:12',
        note: {
            he: '«והיה עקב תשמעון» — השכר שבא בעקבות שמירת המצוות.',
            ru: '«И будет — вследствие того, что будете слушать» — награда, которая следует за исполнением заповедей.',
            en: '“Because you will listen” — the reward that follows keeping the commandments.'
        }
    },
    {
        slug: 'Re\'eh', ref: '11:26',
        note: {
            he: '«ראה אנכי נתן לפניכם היום ברכה וקללה» — הבחירה בין ברכה לקללה.',
            ru: '«Смотри, Я даю вам сегодня благословение и проклятие» — выбор между благословением и проклятием.',
            en: '“See, I set before you today a blessing and a curse” — the choice between blessing and curse.'
        }
    },
    {
        slug: 'Shoftim', ref: '16:18',
        note: {
            he: '«שפטים ושטרים תתן לך בכל שעריך» — מינוי שופטים ושוטרים.',
            ru: '«Судей и стражей поставь себе во всех вратах твоих» — назначение судей и стражей порядка.',
            en: '“Judges and officers you shall appoint in all your gates” — appointing judges and officers.'
        }
    },
    {
        slug: 'Ki Teitzei', ref: '21:10',
        note: {
            he: '«כי תצא למלחמה על איביך» — הראשונה מבין מצוות רבות בפרשה.',
            ru: '«Когда выйдешь на войну с врагами твоими» — первая из множества заповедей главы.',
            en: '“When you go out to war against your enemies” — the first of the portion’s many commandments.'
        }
    },
    {
        slug: 'Ki Tavo', ref: '26:1',
        note: {
            he: '«והיה כי תבוא אל הארץ» — מצוות הביכורים בבואם לארץ.',
            ru: '«И будет, когда придёшь в землю» — заповедь о первых плодах по приходе в землю.',
            en: '“When you come into the land” — the commandment of the first fruits upon entering the land.'
        }
    },
    {
        slug: 'Nitzavim', ref: '29:9',
        note: {
            he: '«אתם נצבים היום כלכם לפני ה׳ אלקיכם» — כריתת הברית עם כל העם.',
            ru: '«Вы стоите сегодня все перед Всевышним, вашим Б-гом» — заключение союза со всем народом.',
            en: '“You are standing today, all of you, before G-d your G-d” — the covenant made with the whole people.'
        }
    },
    {
        slug: 'Vayeilech', ref: '31:1',
        note: {
            he: '«וילך משה וידבר את הדברים האלה» — משה הולך ומדבר אל העם בסוף ימיו.',
            ru: '«И пошёл Моше и говорил эти слова» — Моше обращается к народу в конце своих дней.',
            en: '“Moses went and spoke these words” — Moses addresses the people at the end of his days.'
        }
    },
    {
        slug: 'Ha\'Azinu', ref: '32:1',
        note: {
            he: '«האזינו השמים ואדברה» — שירת משה.',
            ru: '«Внимайте, небеса, и я буду говорить» — песнь Моше.',
            en: '“Give ear, O heavens, and I will speak” — the song of Moses.'
        }
    },
    {
        slug: 'V\'Zot HaBerachah', ref: '33:1',
        note: {
            he: '«וזאת הברכה אשר ברך משה את בני ישראל לפני מותו» — ברכות משה לשבטים.',
            ru: '«И вот благословение, которым благословил Моше сынов Израиля перед смертью» — благословения коленам.',
            en: '“This is the blessing with which Moses blessed the children of Israel before his death” — '
                + 'his blessings to the tribes.'
        }
    }
];
