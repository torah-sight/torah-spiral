import type {IParshaText} from '#src/content/model/types.ts';

/** Дварим: 11 глав. */
export const DEUTERONOMY: readonly IParshaText[] = [
    {
        slug: 'Devarim', he: 'דְּבָרִים',
        translit: {ru: 'Дварим', en: 'Devarim'}, title: {ru: 'Слова', en: 'Words'},
        names: [
            ['משה', 'Моше', 'Moses'], ['כלב', 'Калев', 'Caleb'], ['יהושע', 'Йеошуа', 'Joshua'],
            ['סיחן', 'Сихон', 'Sihon'],
            ['עוג', 'Ог', 'Og']
        ],
        keywords: [
            ['דברים', 'слова', 'words'], ['ירדן', 'Иордан', 'Jordan'],
            ['כוכבי השמים', 'звёзды небесные', 'stars of heaven'],
            ['משאכם', 'бремя ваше', 'your burden'], ['צדק', 'справедливость', 'justice'], ['אמרי', 'эморей', 'Amorite'],
            ['שעיר', 'Сеир', 'Seir']
        ],
        phrases: [
            ['אלה הדברים אשר דבר משה אל כל ישראל', 'Вот слова, которые говорил Моше всему Исраэлю',
                'These are the words that Moses spoke to all Israel'],
            ['איכה אשא לבדי טרחכם ומשאכם וריבכם', 'Как мне одному нести ваши тяготы, бремя и тяжбы?',
                'How can I alone bear your trouble, your burden and your strife?'],
            ['לא תכירו פנים במשפט', 'Не будьте лицеприятны на суде', 'Do not show favor in judgment']
        ],
        story: {
            ru: ['В конце сорока лет Моше начинает прощальную речь:',
                'вспоминает назначение судей, грех разведчиков, обход Эдома и Моава,',
                'победы над Сихоном и Огом и раздел земли за Иорданом.'],
            en: ['At the end of forty years Moses begins his farewell speech:',
                'he recalls appointing judges, the sin of the spies, passing Edom and Moab,',
                'the victories over Sihon and Og, and the land east of the Jordan.'],
            he: ['בסוף ארבעים השנה משה פותח בנאום הפרידה:',
                'הוא מזכיר את מינוי השופטים, את חטא המרגלים, את המעבר ליד אדום ומואב,',
                'את הניצחון על סיחון ועוג ואת חלוקת עבר הירדן.']
        }
    },
    {
        slug: 'Vaetchanan', he: 'וָאֶתְחַנַּן',
        translit: {ru: 'Ваэтханан', en: "Va'etchanan"}, title: {ru: 'И я умолял', en: 'And I pleaded'},
        names: [
            ['משה', 'Моше', 'Moses'], ['יהושע', 'Йеошуа', 'Joshua'], ['חרב', 'Хорев', 'Horeb'],
            ['פסגה', 'Писга', 'Pisgah']
        ],
        keywords: [
            ['ואתחנן', 'умолял', 'I pleaded'], ['לא תספו', 'не добавляйте', 'do not add'],
            ['עשרת הדברים', 'Десять речений', 'Ten Commandments'], ['ערים', 'города-убежища', 'cities of refuge'],
            ['שמע', 'слушай', 'hear'], ['אחד', 'Один', 'One'], ['אהבת', 'люби', 'love'], ['טטפת', 'тфилин', 'tefillin'],
            ['מזוזת', 'мезузы', 'doorposts']
        ],
        phrases: [
            ['לא תספו על הדבר', 'не прибавляйте к слову', 'do not add to the word'],
            ['ואתם הדבקים בה׳ אלקיכם חיים כלכם היום', 'а вы, прилепившиеся к Всевышнему, вашему Б-гу, живы все сегодня',
                'but you who cling to Hashem your G-d are all alive today'],
            ['שמע ישראל ה׳ אלקינו ה׳ אחד', 'Слушай, Исраэль: Всевышний — наш Б-г, Всевышний один',
                'Hear, O Israel: Hashem is our G-d, Hashem is One'],
            ['ואהבת את ה׳ אלקיך בכל לבבך ובכל נפשך ובכל מאדך',
                'Люби Всевышнего, Б-га твоего, всем сердцем, всей душой и всем достоянием',
                'Love Hashem your G-d with all your heart, all your soul and all your might']
        ],
        story: {
            ru: ['Моше молит войти в землю, но получает отказ.',
                'Моше призывает хранить Тору, не добавлять и не убавлять, вспоминает Синай и Десять речений.',
                'Города-убежища. Шма Исраэль: любовь к Всевышнему, тфилин, мезуза.'],
            en: ['Moses pleads to enter the land but is refused.',
                'Moses urges keeping the Torah, adding and subtracting nothing,',
                'and recalls Sinai and the Ten Commandments.',
                'Cities of refuge. Shema Yisrael: love of G-d, tefillin, mezuzah.'],
            he: ['משה מתחנן להיכנס לארץ, אך בקשתו נדחית.',
                'משה מזהיר לשמור את התורה, לא להוסיף ולא לגרוע, ומזכיר את מעמד חורב ועשרת הדברות.',
                'ערי מקלט. שמע ישראל: אהבת ה׳, תפילין ומזוזה.']
        }
    },
    {
        slug: 'Eikev', he: 'עֵקֶב',
        translit: {ru: 'Экев', en: 'Eikev'}, title: {ru: 'Вследствие', en: 'Because'},
        names: [
            ['אהרן', 'Аарон', 'Aaron'], ['חרב', 'Хорев', 'Horeb']
        ],
        keywords: [
            ['עקב', 'вследствие', 'because'], ['מן', 'ман', 'manna'], ['לחם', 'хлеб', 'bread'],
            ['ברכת', 'благослови', 'bless'],
            ['עגל', 'телец', 'calf'], ['ארון', 'ковчег', 'ark'], ['יראה', 'трепет', 'awe'],
            ['ערלת לבבכם', 'крайняя плоть сердца', 'foreskin of your heart']
        ],
        phrases: [
            ['כי לא על הלחם לבדו יחיה האדם', 'не хлебом одним жив человек', 'man does not live by bread alone'],
            ['ואכלת ושבעת וברכת את ה׳ אלקיך', 'И будешь есть, и насытишься, и благословишь Всевышнего',
                'You shall eat and be satisfied, and bless Hashem your G-d'],
            ['מה ה׳ אלקיך שאל מעמך כי אם ליראה', 'Чего требует от тебя Всевышний? Только трепета',
                'What does Hashem your G-d ask of you, but to fear']
        ],
        story: {
            ru: ['За исполнение заповедей — благословение.',
                'Моше напоминает о мане, учит не гордиться богатством, вспоминает тельца и разбитые скрижали.',
                'Всевышний требует любви и трепета. Земля пьёт дождь небесный.'],
            en: ['Keeping the commandments brings blessing.',
                'Moses recalls the manna, warns against pride in wealth, recalls the calf and the broken tablets.',
                'G-d asks for love and awe. The land drinks the rain of heaven.'],
            he: ['בשכר שמירת המצוות — ברכה.',
                'משה מזכיר את המן, מזהיר מגאוות העושר, ומזכיר את העגל ושבירת הלוחות.',
                'ה׳ מבקש אהבה ויראה. ארץ למטר השמים תשתה מים.']
        }
    },
    {
        slug: "Re'eh", he: 'רְאֵה',
        translit: {ru: 'Реэ', en: "Re'eh"}, title: {ru: 'Смотри', en: 'See'},
        names: [
            ['גרזים', 'Гризим', 'Gerizim'], ['עיבל', 'Эйваль', 'Ebal']
        ],
        keywords: [
            ['ברכה', 'благословение', 'blessing'], ['קללה', 'проклятие', 'curse'],
            ['המקום אשר יבחר', 'место, которое изберёт', 'the place He will choose'], ['נביא', 'пророк', 'prophet'],
            ['תעשר', 'отделяй десятину', 'you shall tithe'], ['שמטה', 'шмита', 'release'], ['אביון', 'нищий', 'needy'],
            ['שלוש פעמים', 'три раза', 'three times']
        ],
        phrases: [
            ['ראה אנכי נתן לפניכם היום ברכה וקללה', 'Смотри: Я даю вам сегодня благословение и проклятие',
                'See, I set before you today a blessing and a curse'],
            ['בנים אתם לה׳ אלקיכם', 'Сыны вы Всевышнему, вашему Б-гу', 'You are children of Hashem your G-d'],
            ['פתח תפתח את ידך לו', 'открой ему руку свою', 'you shall surely open your hand to him'],
            ['ושמחת בחגך', 'и радуйся в праздник твой', 'and you shall rejoice in your festival']
        ],
        story: {
            ru: ['Выбор между благословением и проклятием на горах Гризим и Эйваль.',
                'Служение только в месте, избранном Всевышним, и запрет идолов. Лжепророк и город-отступник.',
                'Кашрут, десятины, шмита, помощь бедному, три праздника паломничества.'],
            en: ['The choice between blessing and curse, on Mounts Gerizim and Ebal.',
                'Worship only in the place G-d chooses; idols forbidden. The false prophet and the wayward city.',
                'Kashrut, tithes, the release year, help for the poor, three pilgrim festivals.'],
            he: ['הבחירה בין ברכה לקללה על הר גרזים ועל הר עיבל.',
                'עבודה רק במקום אשר יבחר ה׳, ואיסור עבודה זרה. נביא השקר ועיר הנידחת.',
                'כשרות, מעשרות, שמיטה, צדקה לאביון ושלשה רגלים.']
        }
    },
    {
        slug: 'Shoftim', he: 'שֹׁפְטִים',
        translit: {ru: 'Шофтим', en: 'Shoftim'}, title: {ru: 'Судьи', en: 'Judges'},
        names: [
            ['מצרים', 'Египет', 'Egypt'], ['שבט לוי', 'колено Леви', 'tribe of Levi']
        ],
        keywords: [
            ['שפטים', 'судьи', 'judges'], ['שחד', 'взятка', 'bribe'], ['צדק', 'справедливость', 'justice'],
            ['מלך', 'царь', 'king'],
            ['נביא', 'пророк', 'prophet'], ['גבול', 'межа', 'boundary'], ['מלחמה', 'война', 'war'],
            ['עגלה', 'телица', 'heifer']
        ],
        phrases: [
            ['צדק צדק תרדף', 'Справедливости, справедливости добивайся', 'Justice, justice shall you pursue'],
            ['תמים תהיה עם ה׳ אלקיך', 'Будь непорочен со Всевышним, твоим Б-гом',
                'Be wholehearted with Hashem your G-d'],
            ['כי האדם עץ השדה', 'разве дерево полевое — человек?', 'for is the tree of the field a man?']
        ],
        story: {
            ru: ['Судьи и честный суд, царь и его Тора, коэны, левиты и пророк.',
                'Города-убежища, свидетели. Законы войны и бережное отношение к деревьям.',
                'Обряд телицы за неизвестного убитого.'],
            en: ['Judges and honest courts, the king and his Torah scroll, priests, Levites and the prophet.',
                'Cities of refuge, witnesses. Laws of war and sparing fruit trees.',
                'The heifer rite for an unsolved killing.'],
            he: ['שופטים ומשפט צדק, המלך וספר התורה שלו, הכהנים, הלויים והנביא.',
                'ערי מקלט ועדים. דיני מלחמה ושמירה על עצי הפרי.',
                'עגלה ערופה על חלל שלא נודע מי הכהו.']
        }
    },
    {
        slug: 'Ki Teitzei', he: 'כִּי תֵצֵא',
        translit: {ru: 'Ки Теце', en: 'Ki Teitzei'}, title: {ru: 'Когда выйдешь', en: 'When you go out'},
        names: [
            ['עמלק', 'Амалек', 'Amalek'], ['מואבי', 'моавитянин', 'Moabite'], ['עמוני', 'аммонитянин', 'Ammonite'],
            ['מצרי', 'египтянин', 'Egyptian'], ['אדמי', 'эдомитянин', 'Edomite'], ['מרים', 'Мирьям', 'Miriam']
        ],
        keywords: [
            ['יפת תאר', 'красивая пленница', 'beautiful captive'], ['בן סורר ומורה', 'непокорный сын', 'wayward son'],
            ['אבדת', 'потерянное', 'lost item'], ['תשלח', 'отпусти', 'send away'], ['מעקה', 'ограда', 'parapet'],
            ['כלאים', 'смешение', 'mixtures'], ['יבמה', 'левиратный брак', 'levirate marriage'],
            ['זכור', 'помни', 'remember']
        ],
        phrases: [
            ['שלח תשלח את האם ואת הבנים תקח לך', 'отпусти мать, а птенцов возьми себе',
                'send away the mother, and take the young for yourself'],
            ['לא תחסם שור בדישו', 'не надевай намордник быку, когда он молотит',
                'do not muzzle an ox while it threshes'],
            ['זכור את אשר עשה לך עמלק', 'Помни, что сделал тебе Амалек', 'Remember what Amalek did to you']
        ],
        story: {
            ru: ['Множество заповедей о быте и справедливости: пленница, наследство первенца, непокорный сын,',
                'потерянная вещь, птица с гнездом, ограда на крыше, честные весы.',
                'Помни, что сделал тебе Амалек.'],
            en: ['Many laws of daily life and justice: the captive, the firstborn’s inheritance, the wayward son,',
                'lost property, the mother bird, the roof parapet, honest weights.',
                'Remember what Amalek did to you.'],
            he: ['מצוות רבות של חיי יום יום וצדק: יפת תואר, משפט הבכורה, בן סורר ומורה,',
                'השבת אבדה, שילוח הקן, מעקה לגג, מאזני צדק.',
                'זכור את אשר עשה לך עמלק.']
        }
    },
    {
        slug: 'Ki Tavo', he: 'כִּי תָבוֹא',
        translit: {ru: 'Ки Таво', en: 'Ki Tavo'}, title: {ru: 'Когда придёшь', en: 'When you come'},
        names: [
            ['משה', 'Моше', 'Moses'], ['ארמי', 'арамеец', 'Aramean'], ['עיבל', 'Эйваль', 'Ebal'],
            ['גרזים', 'Гризим', 'Gerizim'],
            ['לוי', 'Леви', 'Levi']
        ],
        keywords: [
            ['ראשית', 'первые плоды', 'first fruits'], ['טנא', 'корзина', 'basket'], ['מעשר', 'десятина', 'tithe'],
            ['אבנים גדלות', 'большие камни', 'great stones'], ['שיד', 'известь', 'plaster'],
            ['ארור', 'проклят', 'cursed'],
            ['ברכות', 'благословения', 'blessings'], ['קללות', 'проклятия', 'curses']
        ],
        phrases: [
            ['ארמי אבד אבי', 'Арамеец губил отца моего', 'An Aramean sought to destroy my father'],
            ['היום הזה נהיית לעם', 'в этот день ты стал народом', 'this day you have become a people'],
            ['ברוך אתה בעיר וברוך אתה בשדה', 'Благословен ты в городе и благословен ты в поле',
                'Blessed shall you be in the city and blessed in the field']
        ],
        story: {
            ru: ['Приношение первых плодов с рассказом об Исходе. Десятина.',
                'Камни с Торой на горе Эйваль, благословения и проклятия на Гризим и Эйваль.',
                'Подробные благословения и страшные проклятия.'],
            en: ['Bringing the first fruits with the story of the Exodus. The tithe.',
                'Stones inscribed with the Torah on Mount Ebal; blessings and curses at Gerizim and Ebal.',
                'Detailed blessings and terrible curses.'],
            he: ['הבאת הביכורים ומקרא ביכורים על יציאת מצרים. וידוי מעשר.',
                'אבנים שעליהן כתובה התורה בהר עיבל; ברכות וקללות בהר גרזים ובהר עיבל.',
                'ברכות מפורטות ותוכחה קשה.']
        }
    },
    {
        slug: 'Nitzavim', he: 'נִצָּבִים',
        translit: {ru: 'Ницавим', en: 'Nitzavim'}, title: {ru: 'Стоящие', en: 'Standing'},
        names: [['אברהם', 'Авраам', 'Abraham'], ['יעקב', 'Яаков', 'Jacob']],
        keywords: [['ברית', 'завет', 'covenant'], ['נסתרת', 'сокрытое', 'hidden things'], ['חיים', 'жизнь', 'life']],
        phrases: [['ובחרת בחיים', 'и избери жизнь', 'and choose life']],
        story: {
            ru: ['Все стоят перед Всевышним для завета. Возвращение к Всевышнему. Выбери жизнь.'],
            en: ['All stand before G-d to enter the covenant. Return to G-d. Choose life.'],
            he: ['כולם ניצבים לפני ה׳ לבוא בברית. התשובה אל ה׳. ובחרת בחיים.']
        }
    },
    {
        slug: 'Vayeilech', he: 'וַיֵּלֶךְ',
        translit: {ru: 'Ваелех', en: 'Vayelech'}, title: {ru: 'И пошёл', en: 'And he went'},
        names: [['משה', 'Моше', 'Moses'], ['יהושע', 'Йеошуа', 'Joshua']],
        keywords: [['חזק ואמץ', 'будь крепок и мужествен', 'be strong and courageous'], ['הקהל', 'собери', 'assemble'],
            ['שירה', 'песнь', 'song']],
        phrases: [['כתבו לכם את השירה הזאת', 'запишите себе эту песнь', 'write down this song for yourselves']],
        story: {
            ru: ['Моше передаёт власть Йеошуа, пишет Тору и велит собирать народ.'],
            en: ['Moses hands leadership to Joshua, writes the Torah, commands assembly.'],
            he: ['משה מעביר את ההנהגה ליהושע, כותב את התורה ומצווה על הקהל.']
        }
    },
    {
        slug: "Ha'Azinu", he: 'הַאֲזִינוּ',
        translit: {ru: 'Аазину', en: "Ha'azinu"}, title: {ru: 'Внемлите', en: 'Listen'},
        names: [['יעקב', 'Яаков', 'Jacob'], ['ישרון', 'Йешурун', 'Jeshurun']],
        keywords: [['שמים', 'небеса', 'heavens'], ['צור', 'Твердыня', 'Rock'], ['נשר', 'орёл', 'eagle']],
        phrases: [['האזינו השמים ואדברה', 'Внемлите, небеса, и я буду говорить',
            'Listen, O heavens, and I will speak']],
        story: {
            ru: ['Песнь Моше: небо и земля свидетели; забота Всевышнего и верность Его.'],
            en: ["Moses' song: heaven and earth bear witness; G-d's care and faithfulness."],
            he: ['שירת משה: השמים והארץ עדים; השגחת ה׳ ונאמנותו לעמו.']
        }
    },
    {
        slug: "V'Zot HaBerachah", he: 'וְזֹאת הַבְּרָכָה',
        translit: {ru: 'Везот а-Браха', en: "V'Zot HaBerachah"},
        title: {ru: 'И вот благословение', en: 'And this is the blessing'},
        names: [['משה', 'Моше', 'Moses'], ['יהושע', 'Йеошуа', 'Joshua']],
        keywords: [['ברכה', 'благословение', 'blessing'], ['מורשה', 'наследие', 'heritage'], ['נבו', 'Нево', 'Nebo']],
        phrases: [['תורה צוה לנו משה מורשה קהלת יעקב', 'Тору заповедал нам Моше — наследие общины Яакова',
            'Moses commanded us the Torah, the heritage of the congregation of Jacob']],
        story: {
            ru: ['Моше благословляет колена, видит землю с горы Нево и умирает.'],
            en: ['Moses blesses the tribes, sees the land from Mount Nebo, and dies.'],
            he: ['משה מברך את השבטים, רואה את הארץ מהר נבו ומת.']
        }
    }
];
