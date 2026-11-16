import type {IOrigin} from '#src/content/model/types.ts';

/** Бемидбар: откуда название каждой главы и к чему оно относится. */
export const NUMBERS_ORIGINS: readonly IOrigin[] = [
    {
        slug: 'Bamidbar', ref: '1:1',
        note: {
            he: '«וידבר ה׳ אל משה במדבר סיני» — מפקד העם במדבר.',
            ru: '«И говорил Всевышний Моше в пустыне Синай» — перепись народа в пустыне.',
            en: '“G-d spoke to Moses in the wilderness of Sinai” — the census of the people in the desert.'
        }
    },
    {
        slug: 'Nasso', ref: '4:22',
        note: {
            he: '«נשא את ראש בני גרשון» — מניין בני גרשון ועבודתם במשכן.',
            ru: '«Исчисли (вознеси голову) сынов Гершона» — подсчёт сынов Гершона и их служба в Мишкане.',
            en: '“Take a count (lift the heads) of the sons of Gershon” — counting the Gershonites and their '
                + 'Tabernacle duties.'
        }
    },
    {
        slug: 'Beha\'alotcha', ref: '8:2',
        note: {
            he: '«בהעלתך את הנרת» — הדלקת נרות המנורה בידי אהרן.',
            ru: '«Когда будешь зажигать светильники» — Аарон зажигает лампады меноры.',
            en: '“When you light the lamps” — Aaron kindles the lamps of the menorah.'
        }
    },
    {
        slug: 'Sh\'lach', ref: '13:2',
        note: {
            he: '«שלח לך אנשים ויתרו את ארץ כנען» — שליחת המרגלים.',
            ru: '«Пошли себе людей, пусть разведают землю Кнаан» — отправка разведчиков.',
            en: '“Send for yourself men to scout the land of Canaan” — the sending of the spies.'
        }
    },
    {
        slug: 'Korach', ref: '16:1',
        note: {
            he: 'קרח, הלוי שחלק על משה ועל אהרן יחד עם עדתו.',
            ru: 'Корах — левит, который вместе со своей общиной восстал против Моше и Аарона.',
            en: 'Korah — the Levite who rose up with his company against Moses and Aaron.'
        }
    },
    {
        slug: 'Chukat', ref: '19:2',
        note: {
            he: '«זאת חקת התורה» — דין הפרה האדומה.',
            ru: '«Вот устав Торы» — закон о красной корове.',
            en: '“This is the statute of the Torah” — the law of the red heifer.'
        }
    },
    {
        slug: 'Balak', ref: '22:2',
        note: {
            he: 'בלק בן צפור, מלך מואב, ששכר את בלעם לקלל את ישראל.',
            ru: 'Балак, сын Ципора, царь Моава, который нанял Билама проклясть Израиль.',
            en: 'Balak son of Zippor, king of Moab, who hired Balaam to curse Israel.'
        }
    },
    {
        slug: 'Pinchas', ref: '25:11',
        note: {
            he: 'פינחס בן אלעזר בן אהרן, שבקנאתו לה׳ עצר את המגפה וזכה בברית שלום.',
            ru: 'Пинхас, сын Эльазара, внук Аарона: ревностью за Всевышнего он остановил мор и получил союз мира.',
            en: 'Phinehas son of Eleazar, grandson of Aaron: his zeal for G-d stopped the plague and earned '
                + 'him a covenant of peace.'
        }
    },
    {
        slug: 'Matot', ref: '30:2',
        note: {
            he: '«וידבר משה אל ראשי המטות» — דיני נדרים שנאמרו לראשי השבטים.',
            ru: '«И говорил Моше главам колен» — законы обетов, сказанные главам колен.',
            en: '“Moses spoke to the heads of the tribes” — the laws of vows, told to the tribal heads.'
        }
    },
    {
        slug: 'Masei', ref: '33:1',
        note: {
            he: '«אלה מסעי בני ישראל» — רשימת המסעות והחניות במדבר.',
            ru: '«Вот странствия сынов Израиля» — перечень переходов и стоянок в пустыне.',
            en: '“These are the journeys of the children of Israel” — the list of travels and camps in the desert.'
        }
    }
];
