import type {IParshaText} from '#src/content/model/types.ts';

/** Шмот: 11 глав. */
export const EXODUS: readonly IParshaText[] = [
    {
        slug: 'Shemot', he: 'שְׁמוֹת',
        translit: {ru: 'Шмот', en: 'Shemot'}, title: {ru: 'Имена', en: 'Names'},
        names: [
            ['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['פרעה', 'Фараон', 'Pharaoh'],
            ['שפרה', 'Шифра', 'Shiphrah'],
            ['פועה', 'Пуа', 'Puah'], ['צפרה', 'Ципора', 'Zipporah'], ['יתרו', 'Итро', 'Jethro']
        ],
        keywords: [
            ['יאר', 'Нил', 'Nile'], ['מילדת', 'повитухи', 'midwives'], ['פרך', 'изнурительный труд', 'harsh labor'],
            ['תבה', 'корзинка', 'basket'], ['סנה', 'терновый куст', 'bush'], ['אש', 'огонь', 'fire'],
            ['מטה', 'посох', 'staff'], ['לבנים', 'кирпичи', 'bricks'], ['תבן', 'солома', 'straw']
        ],
        phrases: [
            ['ויקם מלך חדש על מצרים אשר לא ידע את יוסף', 'И встал новый царь над Египтом, который не знал Йосефа',
                'A new king arose over Egypt who did not know Joseph'],
            ['והסנה איננו אכל', 'а куст не сгорает', 'and the bush was not consumed'],
            ['אהיה אשר אהיה', 'Я буду, Который буду', 'I will be what I will be'],
            ['שלח את עמי', 'Отпусти народ Мой', 'Let My people go']
        ],
        story: {
            ru: ['Новый фараон порабощает Исраэль и велит топить мальчиков.',
                'Моше спасён из реки и вырастает во дворце; он бежит в Мидьян.',
                'Из горящего куста Всевышний посылает Моше к фараону, но гнёт лишь усиливается.'],
            en: ['A new Pharaoh enslaves Israel and orders the boys drowned.',
                "Moses is saved from the river and grows up in the palace; he flees to Midian.",
                'From the burning bush G-d sends Moses to Pharaoh, but the oppression only grows.'],
            he: ['פרעה חדש משעבד את ישראל ומצווה להשליך את הבנים ליאור.',
                'משה ניצל מן היאור וגדל בבית פרעה; הוא בורח למדין.',
                'מתוך הסנה הבוער ה׳ שולח את משה אל פרעה, אך השעבוד רק מתגבר.']
        }
    },
    {
        slug: 'Vaera', he: 'וָאֵרָא',
        translit: {ru: 'Ваэра', en: "Va'era"}, title: {ru: 'И Я явился', en: 'And I appeared'},
        names: [
            ['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['פרעה', 'Фараон', 'Pharaoh'],
            ['עמרם', 'Амрам', 'Amram'],
            ['יוכבד', 'Йохевед', 'Jochebed']
        ],
        keywords: [
            ['הוצאתי', 'выведу', 'I will bring out'], ['גאלתי', 'избавлю', 'I will redeem'],
            ['תנין', 'змей', 'serpent'],
            ['דם', 'кровь', 'blood'], ['צפרדע', 'жабы', 'frogs'], ['כנם', 'вши', 'lice'],
            ['ערב', 'смесь зверей', 'wild beasts'], ['ברד', 'град', 'hail']
        ],
        phrases: [
            ['וארא אל אברהם אל יצחק ואל יעקב באל שדי', 'Я являлся Аврааму, Ицхаку и Яакову как Всемогущий',
                'I appeared to Abraham, Isaac and Jacob as G-d Almighty'],
            ['ולא שמעו אל משה מקצר רוח ומעבדה קשה', 'но не слушали Моше от нетерпения духа и тяжкой работы',
                'but they did not listen to Moses, out of shortness of spirit and hard labor'],
            ['ואני אקשה את לב פרעה', 'а Я ожесточу сердце фараона', "and I will harden Pharaoh's heart"],
            ['אצבע אלקים הוא', 'Это перст Всесильного', 'It is the finger of G-d']
        ],
        story: {
            ru: ['Всевышний обещает вывести народ Исраэля.',
                'Моше и Аарон приходят к фараону; посох становится змеем.',
                'Семь казней: кровь, жабы, вши, дикие звери, мор, нарывы, град.',
                'Сердце фараона ожесточается.'],
            en: ['G-d promises to bring the people of Israel out.',
                "Moses and Aaron come to Pharaoh; the staff becomes a serpent.",
                'Seven plagues: blood, frogs, lice, wild beasts, pestilence, boils, hail.',
                "Pharaoh's heart is hardened."],
            he: ['ה׳ מבטיח להוציא את בני ישראל ממצרים.',
                'משה ואהרן באים אל פרעה; המטה נהפך לתנין.',
                'שבע מכות: דם, צפרדע, כנים, ערוב, דבר, שחין, ברד.',
                'לב פרעה מתקשה.']
        }
    },
    {
        slug: 'Bo', he: 'בֹּא',
        translit: {ru: 'Бо', en: 'Bo'}, title: {ru: 'Войди', en: 'Come'},
        names: [
            ['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['פרעה', 'Фараон', 'Pharaoh'],
            ['רעמסס', 'Раамсес', 'Rameses']
        ],
        keywords: [
            ['ארבה', 'саранча', 'locusts'], ['חשך', 'тьма', 'darkness'], ['בכור', 'первенец', 'firstborn'],
            ['שה', 'ягнёнок', 'lamb'], ['פסח', 'Песах', 'Passover'], ['מצות', 'маца', 'matzot'],
            ['חמץ', 'квасное', 'leaven'], ['טוטפת', 'тфилин', 'tefillin']
        ],
        phrases: [
            ['החדש הזה לכם ראש חדשים', 'Этот месяц для вас — начало месяцев',
                'This month shall be for you the head of months'],
            ['וראיתי את הדם ופסחתי עלכם', 'и увижу кровь, и пройду мимо вас',
                'and I will see the blood and pass over you'],
            ['והגדת לבנך ביום ההוא', 'И расскажи сыну своему в тот день', 'And you shall tell your son on that day'],
            ['ולכל בני ישראל היה אור במושבתם', 'а у всех сынов Исраэля был свет в их жилищах',
                'but all the children of Israel had light in their dwellings']
        ],
        story: {
            ru: ['Последние казни: саранча, тьма и смерть первенцев.',
                'Исраэль получает заповедь нового месяца и пасхальной жертвы.',
                'Фараон отпускает народ, и он выходит из Египта с мацой. Заповеди о первенцах и тфилин.'],
            en: ['The last plagues: locusts, darkness and the death of the firstborn.',
                'Israel receives the commandments of the new month and the Passover offering.',
                'Pharaoh lets the people go, and they leave Egypt with matzah. Laws of the firstborn and tefillin.'],
            he: ['המכות האחרונות: ארבה, חשך ומכת בכורות.',
                'ישראל מקבלים את מצות קידוש החודש וקרבן הפסח.',
                'פרעה משלח את העם, והם יוצאים ממצרים עם מצות. מצות פדיון בכור ותפילין.']
        }
    },
    {
        slug: 'Beshalach', he: 'בְּשַׁלַּח',
        translit: {ru: 'Бешалах', en: 'Beshalach'}, title: {ru: 'Когда отпустил', en: 'When he let go'},
        names: [
            ['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['מרים', 'Мирьям', 'Miriam'],
            ['פרעה', 'Фараон', 'Pharaoh'],
            ['עמלק', 'Амалек', 'Amalek'], ['יהושע', 'Йеошуа', 'Joshua']
        ],
        keywords: [
            ['ים סוף', 'Тростниковое море', 'Sea of Reeds'], ['עמוד ענן', 'облачный столп', 'pillar of cloud'],
            ['שירה', 'песнь', 'song'], ['מרה', 'Мара (горькая)', 'Marah (bitter)'], ['מן', 'ман', 'manna'],
            ['שלו', 'перепела', 'quail'], ['שבת', 'шабат', 'Shabbat'], ['צור', 'скала', 'rock'],
            ['מסה', 'Маса (испытание)', 'Massah (test)']
        ],
        phrases: [
            ['ה׳ ילחם לכם ואתם תחרישון', 'Всевышний будет сражаться за вас, а вы молчите',
                'Hashem will fight for you, and you shall be silent'],
            ['ויאמינו בה׳ ובמשה עבדו', 'и поверили во Всевышнего и в Моше, раба Его',
                'and they believed in Hashem and in Moses His servant'],
            ['זה אלי ואנוהו', 'Он — мой Б-г, и прославлю Его', 'This is my G-d, and I will glorify Him'],
            ['והיה כאשר ירים משה ידו וגבר ישראל', 'и когда Моше поднимал руку, одолевал Исраэль',
                'whenever Moses raised his hand, Israel prevailed']
        ],
        story: {
            ru: ['Исраэль выходит из Египта; море расступается, а войско фараона тонет.',
                'Моше и народ поют Песнь у моря.',
                'В пустыне Всевышний даёт ман, перепелов, шабат и воду из скалы. Победа над Амалеком.'],
            en: ["Israel leaves Egypt; the sea splits, and Pharaoh's army drowns.",
                'Moses and the people sing the Song at the Sea.',
                'In the desert G-d gives manna, quail, Shabbat and water from the rock. Victory over Amalek.'],
            he: ['ישראל יוצאים ממצרים; הים נבקע, וחיל פרעה טובע.',
                'משה ובני ישראל שרים את שירת הים.',
                'במדבר ה׳ נותן מן, שליו, שבת ומים מן הצור. ניצחון על עמלק.']
        }
    },
    {
        slug: 'Yitro', he: 'יִתְרוֹ',
        translit: {ru: 'Итро', en: 'Yitro'}, title: {ru: 'Итро', en: 'Jethro'},
        names: [['יתרו', 'Итро', 'Jethro'], ['משה', 'Моше', 'Moses'], ['צפרה', 'Ципора', 'Zipporah'],
            ['סיני', 'Синай', 'Sinai']],
        keywords: [
            ['שרי אלפים', 'тысяченачальники', 'chiefs of thousands'], ['סגלה', 'избранное достояние', 'treasure'],
            ['ממלכת כהנים', 'царство священников', 'kingdom of priests'], ['ענן', 'облако', 'cloud'],
            ['שופר', 'шофар', 'shofar'], ['מזבח', 'жертвенник', 'altar']
        ],
        phrases: [
            ['אנכי ה׳ אלקיך אשר הוצאתיך מארץ מצרים', 'Я — Всевышний, твой Б-г, Который вывел тебя из земли Египетской',
                'I am Hashem your G-d, who brought you out of the land of Egypt'],
            ['זכור את יום השבת לקדשו', 'Помни день субботний, чтобы освящать его',
                'Remember the Sabbath day to keep it holy']
        ],
        story: {
            ru: ['Итро приходит к Моше и советует назначить судей.',
                'У горы Синай Всевышний даёт народу Десять речений; народ трепещет и стоит вдали.'],
            en: ['Jethro comes to Moses and advises him to appoint judges.',
                'At Mount Sinai G-d gives the Ten Commandments; the people tremble and stand far off.'],
            he: ['יתרו בא אל משה ומייעץ לו למנות שופטים.',
                'בהר סיני ה׳ נותן לעם את עשרת הדברות; העם רועד ועומד מרחוק.']
        }
    },
    {
        slug: 'Mishpatim', he: 'מִשְׁפָּטִים',
        translit: {ru: 'Мишпатим', en: 'Mishpatim'}, title: {ru: 'Законы', en: 'Laws'},
        names: [
            ['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['נדב', 'Надав', 'Nadab'],
            ['אביהוא', 'Авиу', 'Abihu'],
            ['יהושע', 'Йеошуа', 'Joshua']
        ],
        keywords: [
            ['עבד עברי', 'раб-еврей', 'Hebrew servant'], ['עין תחת עין', 'око за око', 'eye for an eye'],
            ['שור', 'бык', 'ox'], ['גר', 'пришелец', 'stranger'], ['שחד', 'взятка', 'bribe'],
            ['שלש רגלים', 'три праздника', 'three festivals'], ['ספר הברית', 'книга завета', 'book of the covenant'],
            ['לחת האבן', 'каменные скрижали', 'tablets of stone']
        ],
        phrases: [
            ['וגר לא תונה ולא תלחצנו', 'Пришельца не обижай и не притесняй', 'Do not wrong a stranger or oppress him'],
            ['מדבר שקר תרחק', 'От лжи отдаляйся', 'Keep far from falsehood'],
            ['נעשה ונשמע', 'Сделаем и услышим', 'We will do and we will hear']
        ],
        story: {
            ru: ['Законы после Синая: о рабе, об ущербе, о защите вдовы и сироты,',
                'о справедливом суде, о шабате и праздниках.',
                'Народ отвечает: «Сделаем и услышим». Моше восходит на гору на сорок дней.'],
            en: ['Laws after Sinai: on servants, damages, protecting widow and orphan,',
                'just courts, Shabbat and festivals.',
                'The people answer: "We will do and we will hear." Moses ascends the mountain for forty days.'],
            he: ['אחרי מעמד הר סיני באים המשפטים: דיני עבד עברי, נזיקין ושומרים,',
                'הגנה על הגר, האלמנה והיתום, משפט צדק, שמיטה, שבת ושלשת הרגלים.',
                'העם עונה: ״נעשה ונשמע״. משה עולה להר לארבעים יום וארבעים לילה.']
        }
    },
    {
        slug: 'Terumah', he: 'תְּרוּמָה',
        translit: {ru: 'Трума', en: 'Terumah'}, title: {ru: 'Приношение', en: 'Offering'},
        names: [['משה', 'Моше', 'Moses'], ['כרבים', 'херувимы', 'cherubim'],
            ['משכן', 'Мишкан', 'Mishkan']],
        keywords: [
            ['תרומה', 'приношение', 'offering'], ['ארון', 'ковчег', 'ark'], ['כפרת', 'крышка ковчега', 'ark cover'],
            ['שלחן', 'стол', 'table'], ['מזבח', 'жертвенник', 'altar']
        ],
        phrases: [
            ['מאת כל איש אשר ידבנו לבו', 'от всякого, кого побудит сердце', 'from every man whose heart moves him'],
            ['ועשו לי מקדש ושכנתי בתוכם', 'и пусть сделают Мне святилище, и Я буду пребывать среди них',
                'and let them make Me a sanctuary, and I will dwell among them']
        ],
        story: {
            ru: ['Всевышний велит собрать приношения и построить Мишкан, чтобы пребывать среди народа:',
                'ковчег с херувимами, стол, светильник, покрывала, стены и жертвенник.'],
            en: ['G-d commands offerings and a Mishkan, to dwell among the people:',
                'ark and cherubim, table, menorah, coverings, walls, altar.'],
            he: ['ה׳ מצווה לאסוף תרומה ולבנות משכן, כדי לשכון בתוך העם:',
                'ארון וכרובים, שלחן, מנורה, יריעות, קרשים ומזבח.']
        }
    },
    {
        slug: 'Tetzaveh', he: 'תְּצַוֶּה',
        translit: {ru: 'Тецаве', en: 'Tetzaveh'}, title: {ru: 'Ты повелишь', en: 'You shall command'},
        names: [
            ['אהרן', 'Аарон', 'Aaron'], ['נדב', 'Надав', 'Nadab'], ['אביהוא', 'Авиу', 'Abihu'],
            ['אלעזר', 'Эльазар', 'Eleazar'],
            ['איתמר', 'Итамар', 'Ithamar']
        ],
        keywords: [
            ['שמן זית', 'оливковое масло', 'olive oil'], ['נר תמיד', 'вечный светильник', 'eternal lamp'],
            ['אפוד', 'эфод', 'ephod'], ['חשן', 'наперсник', 'breastplate'], ['אורים', 'урим', 'Urim'],
            ['ציץ', 'налобная пластина', 'headplate'], ['קטרת', 'воскурение', 'incense']
        ],
        phrases: [
            ['ואתה תצוה את בני ישראל', 'А ты повели сынам Исраэля', 'And you shall command the children of Israel'],
            ['ועשית בגדי קדש לאהרן אחיך לכבוד ולתפארת',
                'Сделай святые одежды Аарону, брату твоему, для славы и великолепия',
                'Make holy garments for Aaron your brother, for honor and for beauty'],
            ['ושכנתי בתוך בני ישראל והייתי להם לאלקים', 'И буду пребывать среди сынов Исраэля, и буду им Б-гом',
                'I will dwell among the children of Israel and be their G-d']
        ],
        story: {
            ru: ['Масло для вечного светильника. Облачения коэнов: эфод, наперсник, мантия, золотая пластина.',
                'Семь дней посвящения Аарона и сыновей. Ежедневная жертва и жертвенник для воскурений.'],
            en: ['Oil for the eternal lamp. Priestly garments: ephod, breastplate, robe, golden headplate.',
                'Seven days of consecrating Aaron and his sons. The daily offering and the incense altar.'],
            he: ['שמן זית זך לנר התמיד. בגדי הכהונה של אהרן: אפוד, חשן, מעיל, כתנת וציץ של זהב טהור.',
                'שבעת ימי המילואים לאהרן ולבניו. קרבן התמיד בכל יום ומזבח הקטורת.']
        }
    },
    {
        slug: 'Ki Tisa', he: 'כִּי תִשָּׂא',
        translit: {ru: 'Ки Тиса', en: 'Ki Tisa'}, title: {ru: 'Когда будешь исчислять', en: 'When you take a count'},
        names: [
            ['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['בצלאל', 'Бецалель', 'Bezalel'],
            ['אהליאב', 'Оолиав', 'Oholiab'], ['יהושע', 'Йеошуа', 'Joshua'],
            ['בני לוי', 'сыны Леви', 'sons of Levi']
        ],
        keywords: [
            ['מחצית השקל', 'полшекеля', 'half shekel'], ['כיור', 'умывальник', 'laver'], ['שבת', 'шабат', 'Shabbat'],
            ['לחת', 'скрижали', 'tablets'], ['עגל', 'телец', 'calf'], ['שבר', 'разбил', 'broke'],
            ['אהל מועד', 'Шатёр встречи', 'Tent of Meeting'],
            ['רחום וחנון', 'милосердный и милостивый', 'merciful and gracious'],
            ['קרן', 'сиял', 'shone'], ['מסוה', 'покрывало', 'veil']
        ],
        phrases: [
            ['ושמרו בני ישראל את השבת', 'И пусть хранят сыны Исраэля субботу',
                'The children of Israel shall keep the Sabbath'],
            ['אלה אלקיך ישראל', 'Вот твой бог, Исраэль', 'This is your god, O Israel'],
            ['מי לה׳ אלי', 'Кто за Всевышнего — ко мне!', "Whoever is for Hashem, come to me!"],
            ['ה׳ ה׳ אל רחום וחנון', 'Всевышний, Всевышний, Б-г милосердный и милостивый',
                'Hashem, Hashem, G-d merciful and gracious']
        ],
        story: {
            ru: ['Перепись половиной шекеля, умывальник, масло помазания; Бецалель назначен строителем.',
                'Пока Моше на горе, народ делает золотого тельца; Моше разбивает скрижали.',
                'Моше молится, Всевышний открывает тринадцать мер милосердия и даёт новые скрижали. Лицо Моше сияет.'],
            en: ['A census by half shekels, the laver, the anointing oil; Bezalel is chosen as builder.',
                'While Moses is on the mountain, the people make a golden calf; Moses breaks the tablets.',
                "Moses prays; G-d reveals the thirteen attributes of mercy and gives new tablets. Moses' face shines."],
            he: ['מחצית השקל, הכיור ושמן המשחה; בצלאל נבחר לבנות את המשכן.',
                'בעוד משה בהר העם עושה עגל זהב; משה שובר את הלוחות.',
                'משה מתפלל, ה׳ מגלה את שלש עשרה המידות ונותן לוחות שניים. פני משה קורנים.']
        }
    },
    {
        slug: 'Vayakhel', he: 'וַיַּקְהֵל',
        translit: {ru: 'Ваякгель', en: 'Vayakhel'}, title: {ru: 'И собрал', en: 'And he assembled'},
        names: [['בצלאל', 'Бецалель', 'Bezalel'], ['אהליאב', 'Оолиав', 'Oholiab']],
        keywords: [['שבת', 'шабат', 'Shabbat'], ['נדבה', 'добровольный дар', 'freewill gift'],
            ['מראת הצבאת', 'зеркала женщин', "the women's mirrors"]],
        phrases: [['כל נדיב לבו יביאה', 'всякий, чьё сердце щедро, пусть принесёт',
            'whoever is of a willing heart shall bring it']],
        story: {
            ru: ['Народ щедро приносит дары; мастера строят Мишкан и его утварь.'],
            en: ['The people bring gifts generously; craftsmen build the Mishkan.'],
            he: ['העם מביא נדבה ברוב; החכמים בונים את המשכן וכליו.']
        }
    },
    {
        slug: 'Pekudei', he: 'פְקוּדֵי',
        translit: {ru: 'Пкудей', en: 'Pekudei'}, title: {ru: 'Исчисления', en: 'Accounts'},
        names: [['בצלאל', 'Бецалель', 'Bezalel'], ['איתמר', 'Итамар', 'Ithamar']],
        keywords: [['פקודי', 'счёт', 'accounts'], ['בגדי שרד', 'служебные одежды', 'service garments'],
            ['ענן', 'облако', 'cloud']],
        phrases: [['וכבוד ה׳ מלא את המשכן', 'и слава Всевышнего наполнила Мишкан',
            'and the glory of Hashem filled the Mishkan']],
        story: {
            ru: ['Отчёт о материалах, шьются облачения; Мишкан воздвигнут, и облако славы наполняет его.'],
            en: ['Accounts, priestly garments; the Mishkan stands, and the cloud of glory fills it.'],
            he: ['חשבון החומרים ועשיית הבגדים; המשכן מוקם, וענן הכבוד ממלא אותו.']
        }
    }
];
