import type {IParshaText} from '#src/content/model/types.ts';

/** Бемидбар: 10 глав. */
export const NUMBERS: readonly IParshaText[] = [
    {
        slug: 'Bamidbar', he: 'בְּמִדְבַּר',
        translit: {ru: 'Бемидбар', en: 'Bamidbar'}, title: {ru: 'В пустыне', en: 'In the wilderness'},
        names: [
            ['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['נחשון', 'Нахшон', 'Nahshon'],
            ['גרשון', 'Гершон', 'Gershon'], ['קהת', 'Кеат', 'Kohath']
        ],
        keywords: [
            ['מדבר', 'пустыня', 'wilderness'], ['מספר', 'число', 'number'], ['דגל', 'знамя', 'banner'],
            ['מחנה', 'стан', 'camp'], ['לוים', 'левиты', 'Levites'], ['בכור', 'первенец', 'firstborn'],
            ['משא', 'ноша', 'burden']
        ],
        phrases: [
            ['שאו את ראש כל עדת בני ישראל', 'Исчислите всю общину сынов Исраэля',
                'Take a census of the whole community of Israel'],
            ['איש על דגלו באתת לבית אבתם יחנו בני ישראל', 'каждый при знамени своём, по знакам отчих домов',
                'each by his banner, with the signs of their fathers’ houses'],
            ['ולא יבאו לראות כבלע את הקדש ומתו', 'и пусть не входят смотреть, как укрывают святыню, чтобы не умереть',
                'they shall not come in to see the holy things covered, lest they die']
        ],
        story: {
            ru: ['Перепись в пустыне Синай: колена и их число.',
                'Лагерь вокруг Мишкана под знамёнами.',
                'Левиты заменяют первенцев; семейства Леви несут Мишкан.'],
            en: ['A census in the Sinai wilderness: the tribes and their numbers.',
                'The camp around the Mishkan, under banners.',
                'The Levites replace the firstborn; the Levite clans carry the Mishkan.'],
            he: ['מפקד במדבר סיני: השבטים ומספרם.',
                'סדר המחנה סביב המשכן, איש על דגלו.',
                'הלויים במקום הבכורות; משפחות הלויים נושאות את המשכן.']
        }
    },
    {
        slug: 'Nasso', he: 'נָשֹׂא',
        translit: {ru: 'Насо', en: 'Naso'}, title: {ru: 'Исчисли (вознеси)', en: 'Take a count (lift)'},
        names: [
            ['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['גרשון', 'Гершон', 'Gershon'],
            ['מררי', 'Мерари', 'Merari'],
            ['נחשון', 'Нахшон', 'Nahshon']
        ],
        keywords: [
            ['תשטה', 'изменит (жена)', 'goes astray'], ['מי המרים', 'горькая вода', 'bitter water'],
            ['נזיר', 'назир', 'nazirite'], ['יין', 'вино', 'wine'], ['תער', 'бритва', 'razor'],
            ['תברכו', 'благословляйте', 'you shall bless'],
            ['חנכת המזבח', 'освящение жертвенника', 'dedication of the altar']
        ],
        phrases: [
            ['יברכך ה׳ וישמרך', 'Да благословит тебя Всевышний и охранит тебя', 'May Hashem bless you and guard you'],
            ['ישא ה׳ פניו אליך וישם לך שלום', 'Да обратит Всевышний лик Свой к тебе и даст тебе мир',
                'May Hashem lift His face toward you and grant you peace'],
            ['ושמו את שמי על בני ישראל ואני אברכם', 'И пусть возложат Имя Моё на сынов Исраэля, и Я благословлю их',
                'They shall place My Name on the children of Israel, and I will bless them']
        ],
        story: {
            ru: ['Перепись левитов. Закон о подозреваемой жене и о назире.',
                'Благословение коэнов.',
                'Двенадцать вождей, каждый в свой день, приносят одинаковые дары на освящение жертвенника.'],
            en: ['A census of the Levites. The law of the suspected wife and of the nazirite.',
                'The priestly blessing.',
                'Twelve princes, each on his own day, bring identical gifts for the altar’s dedication.'],
            he: ['מפקד בני גרשון ובני מררי. שילוח הטמאים מן המחנה, פרשת סוטה ופרשת נזיר.',
                'ברכת כהנים.',
                'שנים עשר נשיאי ישראל, נשיא אחד בכל יום, מביאים קרבן זהה לחנוכת המזבח.']
        }
    },
    {
        slug: "Beha'alotcha", he: 'בְּהַעֲלֹתְךָ',
        translit: {ru: 'Беаалотха', en: "Beha'alotcha"}, title: {ru: 'Когда будешь зажигать', en: 'When you light'},
        names: [
            ['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['מרים', 'Мирьям', 'Miriam'],
            ['חבב', 'Ховав', 'Hobab'],
            ['אלדד', 'Эльдад', 'Eldad'], ['מידד', 'Мейдад', 'Medad']
        ],
        keywords: [
            ['מנורה', 'светильник', 'menorah'], ['פסח', 'Песах', 'Passover'], ['ענן', 'облако', 'cloud'],
            ['חצוצרת', 'трубы', 'trumpets'], ['תאוה', 'вожделение', 'craving'], ['מן', 'ман', 'manna'],
            ['שבעים איש', 'семьдесят мужей', 'seventy men'], ['שלוים', 'перепела', 'quail'],
            ['ענו', 'скромный', 'humble']
        ],
        phrases: [
            ['בהעלתך את הנרת', 'когда будешь зажигать светильники', 'when you light the lamps'],
            ['ויהי בנסע הארן ויאמר משה קומה ה׳', 'Когда трогался ковчег, Моше говорил: Восстань, Всевышний!',
                'When the ark set out, Moses said: Arise, Hashem!'],
            ['ומי יתן כל עם ה׳ נביאים', 'О, если бы весь народ Всевышнего были пророками!',
                "Would that all Hashem's people were prophets!"],
            ['והאיש משה ענו מאד', 'А человек Моше был скромнейшим', 'Now the man Moses was very humble']
        ],
        story: {
            ru: ['Зажигание светильника, посвящение левитов, второй Песах.',
                'Облако ведёт стан, трубы созывают народ.',
                'Народ ропщет о мясе — приходят перепела; Моше получает семьдесят старейшин.',
                'Мирьям говорит о Моше и поражена цараат.'],
            en: ['Lighting the menorah, consecrating the Levites, the second Passover.',
                'The cloud leads the camp; trumpets summon the people.',
                'The people crave meat and quail comes; Moses receives seventy elders.',
                "Miriam speaks against Moses and is struck with tzara'at."],
            he: ['הדלקת המנורה, הקדשת הלויים ופסח שני.',
                'הענן מוביל את המחנה, והחצוצרות מקהילות את העם.',
                'העם מתאווה לבשר ובא השלו; משה מקבל שבעים זקנים.',
                'מרים מדברת במשה ונענשת בצרעת.']
        }
    },
    {
        slug: "Sh'lach", he: 'שְׁלַח־לְךָ',
        translit: {ru: 'Шлах', en: "Sh'lach"}, title: {ru: 'Пошли себе', en: 'Send for yourself'},
        names: [
            ['משה', 'Моше', 'Moses'], ['יהושע', 'Йеошуа', 'Joshua'], ['כלב', 'Калев', 'Caleb'],
            ['חברון', 'Хеврон', 'Hebron'],
            ['ענק', 'Анак', 'Anak']
        ],
        keywords: [
            ['תרו', 'разведают', 'scout'], ['אשכול', 'гроздь', 'cluster'], ['זבת חלב ודבש', 'течёт молоком и мёдом',
                'flowing with milk and honey'], ['נפילים', 'исполины', 'giants'], ['חגבים', 'саранча', 'grasshoppers'],
            ['חלה', 'хала', 'challah'], ['ציצת', 'цицит', 'tzitzit']
        ],
        phrases: [
            ['שלח לך אנשים ויתרו את ארץ כנען', 'Пошли от себя людей, и пусть разведают землю Кнаан',
                'Send men to scout the land of Canaan'],
            ['עלה נעלה וירשנו אתה כי יכול נוכל לה', 'Взойдём и овладеем ею, ибо одолеем её!',
                'Let us go up and possess it, for we can surely overcome it'],
            ['ולא תתרו אחרי לבבכם ואחרי עיניכם', 'и не блуждайте вслед сердца вашего и глаз ваших',
                'do not stray after your heart and your eyes']
        ],
        story: {
            ru: ['Двенадцать разведчиков осматривают Кнаан; десять пугают народ, лишь Калев и Йеошуа верят.',
                'Народ плачет и обречён скитаться сорок лет. Заповеди о хале и цицит.'],
            en: ['Twelve spies scout Canaan; ten frighten the people, only Caleb and Joshua trust.',
                'The people weep and must wander forty years. Laws of challah and tzitzit.'],
            he: ['שנים עשר מרגלים תרים את כנען; עשרה מפחידים את העם, ורק כלב ויהושע מאמינים.',
                'העם בוכה ונגזר עליו לנדוד ארבעים שנה. מצות חלה וציצית.']
        }
    },
    {
        slug: 'Korach', he: 'קֹרַח',
        translit: {ru: 'Корах', en: 'Korach'}, title: {ru: 'Корах', en: 'Korah'},
        names: [
            ['קרח', 'Корах', 'Korah'], ['דתן', 'Датан', 'Dathan'], ['אבירם', 'Авирам', 'Abiram'], ['און', 'Он', 'On'],
            ['אהרן', 'Аарон', 'Aaron']
        ],
        keywords: [
            ['מחתות', 'совки', 'fire pans'], ['קטרת', 'воскурение', 'incense'], ['בלע', 'поглотила', 'swallowed'],
            ['מגפה', 'мор', 'plague'], ['מטה', 'посох', 'staff'], ['שקדים', 'миндаль', 'almonds'],
            ['מעשר', 'десятина', 'tithe']
        ],
        phrases: [
            ['כי כל העדה כלם קדשים', 'ведь вся община — все святы', 'for the whole community, all of them, are holy'],
            ['ותפתח הארץ את פיה ותבלע אתם', 'и разверзла земля уста свои и поглотила их',
                'and the earth opened its mouth and swallowed them'],
            ['ויעמד בין המתים ובין החיים ותעצר המגפה', 'и встал он между мёртвыми и живыми, и мор прекратился',
                'he stood between the dead and the living, and the plague stopped']
        ],
        story: {
            ru: ['Корах, Датан и Авирам восстают против Моше и Аарона.',
                'Земля поглощает мятежников, огонь сжигает двести пятьдесят. Мор остановлен воскурением.',
                'Посох Аарона расцветает. Дары коэнам и левитам.'],
            en: ['Korah, Dathan and Abiram rebel against Moses and Aaron.',
                'The earth swallows the rebels; fire consumes two hundred fifty. Incense stops the plague.',
                "Aaron's staff blossoms. Gifts to the priests and Levites."],
            he: ['קרח, דתן ואבירם חולקים על משה ואהרן.',
                'הארץ בולעת את המורדים, ואש אוכלת מאתיים וחמישים. הקטורת עוצרת את המגפה.',
                'מטה אהרן פורח. מתנות כהונה ולויה.']
        }
    },
    {
        slug: 'Chukat', he: 'חֻקַּת',
        translit: {ru: 'Хукат', en: 'Chukat'}, title: {ru: 'Устав', en: 'Statute'},
        names: [
            ['מרים', 'Мирьям', 'Miriam'], ['אהרן', 'Аарон', 'Aaron'], ['אלעזר', 'Эльазар', 'Eleazar'],
            ['סיחן', 'Сихон', 'Sihon'],
            ['עוג', 'Ог', 'Og']
        ],
        keywords: [
            ['פרה אדמה', 'красная корова', 'red heifer'], ['אפר', 'пепел', 'ashes'], ['סלע', 'скала', 'rock'],
            ['מי מריבה', 'воды раздора', 'waters of strife'], ['נחש', 'змей', 'serpent'], ['באר', 'колодец', 'well']
        ],
        phrases: [
            ['זאת חקת התורה', 'Вот устав Торы', 'This is the statute of the Torah'],
            ['ודברתם אל הסלע לעיניהם', 'и говорите со скалой у них на глазах',
                'and speak to the rock before their eyes'],
            ['עלי באר ענו לה', 'Поднимайся, колодец! Пойте ему!', 'Spring up, O well! Sing to it!']
        ],
        story: {
            ru: ['Закон красной коровы. Умирает Мирьям, иссякает вода; Моше ударяет по скале.',
                'Умирает Аарон. Медный змей. Победы над Сихоном и Огом.'],
            en: ['The law of the red heifer. Miriam dies and the water fails; Moses strikes the rock.',
                'Aaron dies. The copper serpent. Victories over Sihon and Og.'],
            he: ['חוקת פרה אדומה. מרים מתה והמים חסרים; משה מכה בסלע.',
                'אהרן מת. נחש הנחשת. ניצחון על סיחון ועל עוג.']
        }
    },
    {
        slug: 'Balak', he: 'בָּלָק',
        translit: {ru: 'Балак', en: 'Balak'}, title: {ru: 'Балак', en: 'Balak'},
        names: [
            ['בלק', 'Балак', 'Balak'], ['בלעם', 'Билам', 'Balaam'], ['מואב', 'Моав', 'Moab'],
            ['פינחס', 'Пинхас', 'Phinehas']
        ],
        keywords: [
            ['אתון', 'ослица', 'donkey'], ['מלאך', 'ангел', 'angel'], ['חרב', 'меч', 'sword'],
            ['ארור', 'проклят', 'cursed'],
            ['אהליך', 'шатры твои', 'your tents'], ['כוכב', 'звезда', 'star'], ['בעל פעור', 'Баал-Пеор', 'Baal Peor'],
            ['רמח', 'копьё', 'spear']
        ],
        phrases: [
            ['ויפתח ה׳ את פי האתון', 'И отверз Всевышний уста ослицы', "And Hashem opened the donkey's mouth"],
            ['הן עם לבדד ישכן', 'вот народ, обитающий отдельно', 'behold, a people that dwells alone'],
            ['מה טבו אהליך יעקב משכנתיך ישראל', 'Как прекрасны шатры твои, Яаков, жилища твои, Исраэль!',
                'How goodly are your tents, O Jacob, your dwellings, O Israel!']
        ],
        story: {
            ru: ['Царь Моава Балак нанимает Билама проклясть Исраэль. Ослица видит ангела.',
                'Трижды Билам вместо проклятия благословляет и говорит о звезде от Яакова.',
                'Народ грешит с моавитянками; Пинхас останавливает мор.'],
            en: ['Balak, king of Moab, hires Balaam to curse Israel. The donkey sees an angel.',
                'Three times Balaam blesses instead of cursing, and speaks of a star from Jacob.',
                'The people sin with Moabite women; Phinehas stops the plague.'],
            he: ['בלק מלך מואב שוכר את בלעם לקלל את ישראל. האתון רואה את המלאך.',
                'שלש פעמים בלעם מברך במקום לקלל, ומנבא על כוכב מיעקב.',
                'העם חוטא בבנות מואב; פינחס עוצר את המגפה.']
        }
    },
    {
        slug: 'Pinchas', he: 'פִּינְחָס',
        translit: {ru: 'Пинхас', en: 'Pinchas'}, title: {ru: 'Пинхас', en: 'Phinehas'},
        names: [['פינחס', 'Пинхас', 'Phinehas'], ['בנות צלפחד', 'дочери Целофхада', 'daughters of Zelophehad'],
            ['אלעזר', 'Эльазар', 'Eleazar'], ['יהושע', 'Йеошуа', 'Joshua']],
        keywords: [
            ['בריתי שלום', 'завет Мой — мир', 'My covenant of peace'], ['נחלה', 'удел', 'inheritance'],
            ['גורל', 'жребий', 'lot'], ['סמכת', 'возложи (руку)', 'lay (your hand)'],
            ['תמיד', 'постоянная жертва', 'daily offering'],
            ['ראשי חדשיכם', 'новомесячья', 'new moons']
        ],
        phrases: [
            ['הנני נתן לו את בריתי שלום', 'Вот Я даю ему Мой завет мира', 'I hereby give him My covenant of peace'],
            ['כן בנות צלפחד דברת', 'Верно говорят дочери Целофхада', 'The daughters of Zelophehad speak right'],
            ['את קרבני לחמי לאשי ריח ניחחי', 'Мою жертву, хлеб Мой для огнепалимых, благоухание Моё',
                'My offering, My bread for My fire offerings, My pleasing fragrance']
        ],
        story: {
            ru: ['Пинхас получает завет мира. Новая перепись перед входом в землю.',
                'Дочери Целофхада получают наследство. Йеошуа назначен преемником.',
                'Жертвы будней и праздников.'],
            en: ['Phinehas receives the covenant of peace. A new census before entering the land.',
                'The daughters of Zelophehad inherit. Joshua is appointed successor.',
                'Offerings for days and festivals.'],
            he: ['פינחס מקבל ברית שלום. מפקד חדש לפני הכניסה לארץ.',
                'בנות צלפחד זוכות בנחלה. יהושע נבחר לרשת את משה.',
                'קרבנות התמיד והמועדים.']
        }
    },
    {
        slug: 'Matot', he: 'מַּטּוֹת',
        translit: {ru: 'Матот', en: 'Matot'}, title: {ru: 'Колена', en: 'Tribes'},
        names: [
            ['משה', 'Моше', 'Moses'], ['פינחס', 'Пинхас', 'Phinehas'], ['בלעם', 'Билам', 'Balaam'],
            ['מדין', 'Мидьян', 'Midian'],
            ['בני גד', 'сыны Гада', 'sons of Gad']
        ],
        keywords: [
            ['נדר', 'обет', 'vow'], ['אסר', 'зарок', 'binding oath'], ['נקמת', 'возмездие', 'vengeance'],
            ['מלקוח', 'добыча', 'spoils'], ['תעבירו', 'проведите (через огонь)', 'pass (through fire)'],
            ['גדרת צאן', 'загоны для скота', 'sheepfolds'], ['חלוץ', 'вооружённый', 'armed']
        ],
        phrases: [
            ['לא יחל דברו', 'не нарушит слова своего', 'he shall not break his word'],
            ['האחיכם יבאו למלחמה ואתם תשבו פה', 'Братья ваши пойдут на войну, а вы останетесь здесь?',
                'Shall your brothers go to war while you sit here?'],
            ['והייתם נקיים מה׳ ומישראל', 'и будете чисты пред Всевышним и пред Исраэлем',
                'and you shall be clear before Hashem and before Israel']
        ],
        story: {
            ru: ['Законы обетов. Война с Мидьяном, раздел добычи, очищение посуды.',
                'Колена Гад и Реувен просят землю за Иорданом и обещают идти в бой впереди братьев.'],
            en: ['Laws of vows. War with Midian, dividing the spoils, purging vessels.',
                'Gad and Reuben ask for land east of the Jordan and promise to fight ahead of their brothers.'],
            he: ['דיני נדרים ושבועות. מלחמת הנקמה במדין, חלוקת המלקוח והכשרת כלי המתכת באש ובמים.',
                'בני גד ובני ראובן מבקשים נחלה בעבר הירדן ומבטיחים ללכת חלוצים לפני אחיהם עד כיבוש הארץ.']
        }
    },
    {
        slug: 'Masei', he: 'מַסְעֵי',
        translit: {ru: 'Масэй', en: 'Masei'}, title: {ru: 'Переходы', en: 'Journeys'},
        names: [
            ['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['ירדן', 'Иордан', 'Jordan'],
            ['כנען', 'Кнаан', 'Canaan'],
            ['בנות צלפחד', 'дочери Целофхада', 'daughters of Zelophehad']
        ],
        keywords: [
            ['מסעי', 'переходы', 'journeys'], ['גבול', 'граница', 'border'],
            ['ערי מקלט', 'города-убежища', 'cities of refuge'],
            ['רצח', 'убийца', 'killer'], ['גאל הדם', 'мститель за кровь', 'blood avenger'],
            ['הכהן הגדל', 'первосвященник', 'High Priest'], ['נחלה', 'удел', 'inheritance']
        ],
        phrases: [
            ['אלה מסעי בני ישראל', 'Вот переходы сынов Исраэля', 'These are the journeys of the children of Israel'],
            ['והורשתם את הארץ וישבתם בה', 'и овладейте землёй, и поселитесь в ней',
                'and take possession of the land and settle in it'],
            ['ולא תחניפו את הארץ', 'и не оскверняйте землю', 'and do not pollute the land']
        ],
        story: {
            ru: ['Перечень сорока двух стоянок от Египта до Иордана. Границы земли Кнаан.',
                'Города левитов и города-убежища. Дочери Целофхада выходят замуж в своём колене.'],
            en: ['A list of forty-two stations from Egypt to the Jordan. The borders of Canaan.',
                "Levite cities and cities of refuge. Zelophehad's daughters marry within their tribe."],
            he: ['רשימת ארבעים ושתיים המסעות של בני ישראל ממצרים ועד ערבות מואב. גבולות ארץ כנען.',
                'ערי הלויים וערי המקלט לרוצח בשגגה. בנות צלפחד נישאות לבני שבטן.']
        }
    }
];
