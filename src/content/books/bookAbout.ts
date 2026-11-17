import type {IBookAbout} from '#src/content/model/types.ts';

/** Пять книг Торы: откуда название, привычное имя и сюжет. */
export const BOOK_ABOUT: readonly IBookAbout[] = [
    {
        ref: '1:1',
        note: {
            he: 'המילה הראשונה של התורה: «בראשית ברא אלקים את השמים ואת הארץ». השם היווני Genesis — «הולדה, '
                + 'מוצא»: ספר בריאת העולם וראשית בית ישראל.',
            ru: 'Первое слово Торы: «В начале сотворил Всесильный небо и землю». Привычное «Бытие» (греч. '
                + 'Genesis — «происхождение»): книга о сотворении мира и начале рода Израиля.',
            en: 'The first word of the Torah: “In the beginning G-d created the heavens and the earth”. The '
                + 'common name Genesis means “origin”: the book of creation and of the beginning of Israel.'
        },
        story: {
            ru: ['Всевышний творит мир; Адам и Хава изгнаны из сада Эден.',
                'Потоп и спасение Ноаха; Вавилонская башня и рассеяние народов.',
                'Праотцы Авраам, Ицхак и Яаков: союз со Всевышним и обещание земли.',
                'Йосеф продан братьями в Египет, возвышается и спасает семью; Яаков с сыновьями '
                    + 'поселяются в Египте.'],
            en: ['G-d creates the world; Adam and Eve are driven out of the Garden of Eden.',
                'The flood and the rescue of Noah; the Tower of Babel and the scattering of nations.',
                'The patriarchs Abraham, Isaac and Jacob: the covenant with G-d and the promise of the land.',
                'Joseph is sold by his brothers into Egypt, rises to power and saves the family; Jacob and his '
                    + 'sons settle in Egypt.'],
            he: ['הקב״ה בורא את העולם; אדם וחוה מגורשים מגן עדן.',
                'המבול והצלת נח; מגדל בבל ופיזור העמים.',
                'האבות אברהם, יצחק ויעקב: הברית עם ה׳ והבטחת הארץ.',
                'יוסף נמכר בידי אחיו למצרים, עולה לגדולה ומציל את המשפחה; יעקב ובניו יורדים למצרים.']
        }
    },
    {
        ref: '1:1',
        note: {
            he: 'מן הפסוק הראשון: «ואלה שמות בני ישראל הבאים מצרימה». השם היווני Exodus — «יציאה»: ספר יציאת '
                + 'מצרים.',
            ru: 'Из первого стиха: «И вот имена сынов Израиля, пришедших в Египет». Привычное «Исход» (греч. '
                + 'Exodus — «выход»): книга о выходе из Египта.',
            en: 'From the first verse: “These are the names of the sons of Israel who came into Egypt”. The '
                + 'common name Exodus means “going out”: the book of leaving Egypt.'
        },
        story: {
            ru: ['Сыны Израиля порабощены в Египте; рождается Моше, и Всевышний посылает его к фараону.',
                'Десять казней, первый Песах и выход из Египта; море расступается.',
                'У горы Синай Всевышний дарует Тору и Десять речений.',
                'Золотой телец, разбитые и новые скрижали; народ строит Мишкан, и Слава Всевышнего '
                    + 'наполняет его.'],
            en: ['The children of Israel are enslaved in Egypt; Moses is born, and G-d sends him to Pharaoh.',
                'Ten plagues, the first Passover and the going out of Egypt; the sea splits.',
                'At Mount Sinai G-d gives the Torah and the Ten Commandments.',
                'The golden calf, the broken and the new tablets; the people build the Tabernacle, and the Glory '
                    + 'of G-d fills it.'],
            he: ['בני ישראל משועבדים במצרים; משה נולד, וה׳ שולח אותו אל פרעה.',
                'עשר המכות, הפסח הראשון ויציאת מצרים; קריעת ים סוף.',
                'בהר סיני ה׳ נותן את התורה ואת עשרת הדברות.',
                'חטא העגל, הלוחות השבורים והלוחות השניים; העם בונה את המשכן, וכבוד ה׳ ממלא אותו.']
        }
    },
    {
        ref: '1:1',
        note: {
            he: 'המילה הראשונה: «ויקרא אל משה» — ה׳ קורא למשה מאוהל מועד. בפי חז״ל — «תורת כהנים»; השם '
                + 'היווני Leviticus — ספר עבודת הכהנים מבני לוי.',
            ru: 'Первое слово: «И воззвал к Моше» — Всевышний зовёт Моше из Шатра откровения. Мудрецы называют '
                + 'книгу «Учение коэнов»; привычное «Левит» — книга о служении коэнов из колена Леви.',
            en: 'The first word: “And He called to Moses” — G-d calls Moses from the Tent of Meeting. The Sages '
                + 'call it “the Law of the Priests”; the common name Leviticus: the service of the priests of '
                + 'Levi.'
        },
        story: {
            ru: ['Законы жертвоприношений в Мишкане.',
                'Посвящение Аарона и его сыновей; гибель Надава и Авиу.',
                'Чистота и нечистота, кашрут, Йом Кипур.',
                'Святость в жизни: «люби ближнего, как самого себя»; праздники, шмита и йовель; '
                    + 'благословения и предостережения.'],
            en: ['The laws of the offerings in the Tabernacle.',
                'The consecration of Aaron and his sons; the death of Nadab and Abihu.',
                'Purity and impurity, kosher food, Yom Kippur.',
                'Holiness in daily life: “love your neighbor as yourself”; the festivals, the sabbatical and '
                    + 'jubilee years; blessings and warnings.'],
            he: ['דיני הקרבנות במשכן.',
                'מילואי אהרן ובניו; מות נדב ואביהוא.',
                'טומאה וטהרה, מאכלות אסורים, יום הכיפורים.',
                'קדושה בחיים: «ואהבת לרעך כמוך»; המועדים, שמיטה ויובל; ברכות ותוכחה.']
        }
    },
    {
        ref: '1:1',
        note: {
            he: 'מן הפסוק הראשון: «וידבר ה׳ אל משה במדבר סיני». בפי חז״ל — «חומש הפקודים»; השם היווני Numbers '
                + '— «מספרים»: על מפקדי העם.',
            ru: 'Из первого стиха: «И говорил Всевышний Моше в пустыне Синай». Мудрецы называют книгу «Пятина '
                + 'исчислений»; привычное «Числа» — по переписям народа.',
            en: 'From the first verse: “And G-d spoke to Moses in the wilderness of Sinai”. The Sages call it '
                + '“the Book of Countings”; the common name Numbers comes from the censuses of the people.'
        },
        story: {
            ru: ['Перепись и стан колен вокруг Мишкана; путь от Синая.',
                'Ропот в пустыне; разведчики порочат землю, и поколение остаётся в пустыне сорок лет.',
                'Бунт Кораха; вода из скалы; Билам хочет проклясть Израиль, но благословляет.',
                'Новая перепись у Иордана; раздел земли и границы страны.'],
            en: ['A census and the camp of the tribes around the Tabernacle; the journey from Sinai.',
                'Complaints in the wilderness; the spies slander the land, and the generation stays in the '
                    + 'wilderness forty years.',
                'Korah’s rebellion; water from the rock; Balaam comes to curse Israel but blesses it.',
                'A new census by the Jordan; dividing the land and its borders.'],
            he: ['מפקד ומחנה השבטים סביב המשכן; המסע מסיני.',
                'תלונות במדבר; המרגלים מוציאים דיבה על הארץ, והדור נשאר במדבר ארבעים שנה.',
                'מחלוקת קורח; מים מן הסלע; בלעם בא לקלל את ישראל ומברך.',
                'מפקד חדש על הירדן; חלוקת הארץ וגבולותיה.']
        }
    },
    {
        ref: '1:1',
        note: {
            he: 'מן הפסוק הראשון: «אלה הדברים אשר דבר משה אל כל ישראל». בפי חז״ל — «משנה תורה»; השם היווני '
                + 'Deuteronomy — «התורה השנייה».',
            ru: 'Из первого стиха: «Вот слова, которые говорил Моше всему Израилю». Мудрецы называют книгу '
                + '«Повторение Торы» (Мишне Тора); отсюда привычное «Второзаконие».',
            en: 'From the first verse: “These are the words which Moses spoke to all Israel”. The Sages call it '
                + '“the Repetition of the Torah” (Mishneh Torah); hence the common name Deuteronomy.'
        },
        story: {
            ru: ['В последние недели жизни Моше на равнинах Моава вспоминает с народом путь по пустыне.',
                'Он повторяет Десять речений и «Шма, Израиль».',
                'Законы для жизни в Земле Израиля; союз, благословения и предостережения.',
                'Песнь «Аазину», благословение коленам; Моше видит землю с горы Нево и умирает.'],
            en: ['In the last weeks of his life, on the plains of Moab, Moses recalls the desert journey with '
                    + 'the people.',
                'He repeats the Ten Commandments and “Hear, O Israel”.',
                'Laws for life in the Land of Israel; the covenant, blessings and warnings.',
                'The song “Haazinu”, the blessing of the tribes; Moses sees the land from Mount Nebo and dies.'],
            he: ['בשבועות האחרונים לחייו, בערבות מואב, משה מזכיר לעם את הדרך במדבר.',
                'הוא חוזר על עשרת הדברות ועל «שמע ישראל».',
                'מצוות לחיים בארץ ישראל; הברית, ברכות ותוכחה.',
                'שירת «האזינו», ברכת השבטים; משה רואה את הארץ מהר נבו ומת.']
        }
    }
];
