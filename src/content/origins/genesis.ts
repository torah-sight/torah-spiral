import type {IOrigin} from '#src/content/model/types.ts';

/** Берешит: откуда название каждой главы и к чему оно относится. */
export const GENESIS_ORIGINS: readonly IOrigin[] = [
    {
        slug: 'Bereshit', ref: '1:1',
        note: {
            he: 'המילים הראשונות של התורה: «בראשית ברא אלקים את השמים ואת הארץ» — על תחילת בריאת העולם.',
            ru: 'Первые слова Торы: «В начале сотворил Всесильный небо и землю» — о начале сотворения мира.',
            en: 'The first words of the Torah: “In the beginning G-d created the heavens and the earth” — the '
                + 'start of creation.'
        }
    },
    {
        slug: 'Noach', ref: '6:9',
        note: {
            he: '«אלה תולדת נח, נח איש צדיק» — נח, הצדיק בדורו, שהקב״ה מציל אותו ואת ביתו בתיבה מן המבול.',
            ru: '«Вот родословие Ноаха; Ноах — человек праведный» — праведник своего поколения, спасённый в '
                + 'ковчеге от потопа.',
            en: '“These are the generations of Noah; Noah was a righteous man” — the one righteous man of his '
                + 'generation, saved in the ark.'
        }
    },
    {
        slug: 'Lech Lecha', ref: '12:1',
        note: {
            he: 'ציווי ה׳ לאברם: «לך לך מארצך וממולדתך ומבית אביך» אל הארץ אשר יראהו.',
            ru: 'Повеление Всевышнего Авраму: «Иди себе из земли твоей, от родни твоей и из дома отца твоего» '
                + 'в землю, которую Он покажет.',
            en: 'G-d’s command to Abram: “Go forth from your land, your birthplace and your father’s house” '
                + 'to the land He will show him.'
        }
    },
    {
        slug: 'Vayera', ref: '18:1',
        note: {
            he: '«וירא אליו ה׳ באלני ממרא» — ה׳ נגלה לאברהם כשישב פתח האהל אחרי המילה.',
            ru: '«И явился ему Всевышний в дубраве Мамре» — Всевышний явился Аврааму, сидевшему у входа в '
                + 'шатёр после обрезания.',
            en: '“And G-d appeared to him by the oaks of Mamre” — G-d appears to Abraham, sitting at his tent '
                + 'door after his circumcision.'
        }
    },
    {
        slug: 'Chayei Sara', ref: '23:1',
        note: {
            he: '«ויהיו חיי שרה מאה שנה ועשרים שנה ושבע שנים» — הפרשה פותחת בסיכום חייה של שרה ובמותה.',
            ru: '«И было жизни Сары сто лет, двадцать лет и семь лет» — глава открывается итогом жизни Сары и '
                + 'её смертью.',
            en: '“And the life of Sarah was a hundred and twenty-seven years” — the portion opens with the '
                + 'sum of Sarah’s life and her death.'
        }
    },
    {
        slug: 'Toldot', ref: '25:19',
        note: {
            he: '«ואלה תולדת יצחק» — על צאצאי יצחק: לידת עשו ויעקב.',
            ru: '«Вот порождения Ицхака» — о потомстве Ицхака: рождение Эсава и Яакова.',
            en: '“These are the generations of Isaac” — about Isaac’s offspring: the birth of Esau and Jacob.'
        }
    },
    {
        slug: 'Vayetzei', ref: '28:10',
        note: {
            he: '«ויצא יעקב מבאר שבע וילך חרנה» — יעקב יוצא מבית הוריו לחרן, בורח מפני עשו.',
            ru: '«И вышел Яаков из Беэр-Шевы и пошёл в Харан» — Яаков покидает родительский дом, спасаясь от Эсава.',
            en: '“Jacob went out from Beersheba and went toward Haran” — Jacob leaves his parents’ home, '
                + 'fleeing from Esau.'
        }
    },
    {
        slug: 'Vayishlach', ref: '32:4',
        note: {
            he: '«וישלח יעקב מלאכים לפניו אל עשו אחיו» — לקראת הפגישה עם עשו.',
            ru: '«И послал Яаков вестников перед собой к Эсаву, брату своему» — перед встречей с братом.',
            en: '“Jacob sent messengers ahead of him to Esau his brother” — before the meeting with his brother.'
        }
    },
    {
        slug: 'Vayeshev', ref: '37:1',
        note: {
            he: '«וישב יעקב בארץ מגורי אביו» — יעקב מתיישב בכנען, וכאן מתחיל סיפור יוסף.',
            ru: '«И поселился Яаков в земле странствий отца своего» — Яаков оседает в Кнаане, и здесь '
                + 'начинается история Йосефа.',
            en: '“Jacob settled in the land of his father’s sojournings” — Jacob settles in Canaan, and '
                + 'Joseph’s story begins.'
        }
    },
    {
        slug: 'Miketz', ref: '41:1',
        note: {
            he: '«ויהי מקץ שנתים ימים» — שנתיים אחרי ששר המשקים שכח את יוסף, פרעה חולם את חלומותיו.',
            ru: '«И было по истечении двух лет» — через два года после того, как виночерпий забыл Йосефа, '
                + 'фараону снятся сны.',
            en: '“At the end of two full years” — two years after the cupbearer forgot Joseph, Pharaoh dreams '
                + 'his dreams.'
        }
    },
    {
        slug: 'Vayigash', ref: '44:18',
        note: {
            he: '«ויגש אליו יהודה» — יהודה ניגש אל יוסף ומבקש על בנימין.',
            ru: '«И подступил к нему Йеуда» — Йеуда подходит к Йосефу и просит за Биньямина.',
            en: '“Then Judah approached him” — Judah steps up to Joseph and pleads for Benjamin.'
        }
    },
    {
        slug: 'Vayechi', ref: '47:28',
        note: {
            he: '«ויחי יעקב בארץ מצרים שבע עשרה שנה» — שנותיו האחרונות של יעקב וברכותיו לבניו.',
            ru: '«И жил Яаков в земле Египетской семнадцать лет» — последние годы Яакова и его благословения сыновьям.',
            en: '“Jacob lived in the land of Egypt seventeen years” — Jacob’s last years and his blessings to '
                + 'his sons.'
        }
    }
];
