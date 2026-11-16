import type {IParshaText} from '#src/content/model/types.ts';

/** Берешит: 12 глав. */
export const GENESIS: readonly IParshaText[] = [
    {
        slug: 'Bereshit', he: 'בְּרֵאשִׁית',
        translit: {ru: 'Берешит', en: 'Bereshit'}, title: {ru: 'В начале', en: 'In the beginning'},
        names: [
            ['אדם', 'Адам', 'Adam'], ['חוה', 'Хава', 'Chava (Eve)'], ['קין', 'Каин', 'Cain'],
            ['הבל', 'Эвель', 'Hevel (Abel)'], ['שת', 'Шет', 'Seth'], ['חנוך', 'Ханох', 'Enoch'],
            ['נח', 'Ноах', 'Noah']
        ],
        keywords: [
            ['ברא', 'сотворил', 'created'], ['אור', 'свет', 'light'], ['רקיע', 'небосвод', 'firmament'],
            ['שבת', 'покой (шабат)', 'rest (Shabbat)'], ['גן', 'сад', 'garden'], ['עץ', 'дерево', 'tree'],
            ['נחש', 'змей', 'serpent'], ['עפר', 'прах', 'dust'], ['ארור', 'проклят', 'cursed']
        ],
        phrases: [
            ['בראשית ברא אלקים את השמים ואת הארץ', 'В начале сотворил Всесильный небо и землю',
                'In the beginning G-d created the heavens and the earth'],
            ['ויאמר אלקים יהי אור ויהי אור', 'И сказал Всесильный: да будет свет. И стал свет',
                'And G-d said: Let there be light, and there was light'],
            ['ויברא אלקים את האדם בצלמו', 'И сотворил Всесильный человека в образе Своём',
                'And G-d created man in His image'],
            ['כי עפר אתה ואל עפר תשוב', 'ибо прах ты и в прах возвратишься',
                'for dust you are and to dust you shall return']
        ],
        story: {
            ru: ['Всевышний творит мир за шесть дней и освящает седьмой.',
                'Адам и Хава едят от запретного дерева и изгнаны из сада.',
                'Каин убивает Эвеля. Десять поколений до Ноаха; мир портится, но Ноах находит милость.'],
            en: ['G-d creates the world in six days and sanctifies the seventh.',
                'Adam and Eve eat from the forbidden tree and are driven out of the garden.',
                'Cain kills Abel. Ten generations lead to Noah; the world grows corrupt, but Noah finds favor.'],
            he: ['הקב״ה בורא את העולם בששה ימים ומקדש את היום השביעי.',
                'אדם וחוה אוכלים מעץ הדעת ומגורשים מגן עדן.',
                'קין הורג את הבל. עשרה דורות עד נח; העולם מושחת, אבל נח מוצא חן בעיני ה׳.']
        }
    },
    {
        slug: 'Noach', he: 'נֹחַ',
        translit: {ru: 'Ноах', en: 'Noach'}, title: {ru: 'Ной (покой)', en: 'Noah (rest)'},
        names: [
            ['נח', 'Ноах', 'Noah'], ['שם', 'Шем', 'Shem'], ['חם', 'Хам', 'Ham'], ['יפת', 'Йефет', 'Japheth'],
            ['נמרד', 'Нимрод', 'Nimrod'], ['אברם', 'Аврам', 'Abram']
        ],
        keywords: [
            ['תבה', 'ковчег', 'ark'], ['מבול', 'потоп', 'flood'], ['יונה', 'голубка', 'dove'],
            ['זית', 'олива', 'olive'], ['ברית', 'завет', 'covenant'], ['קשת', 'радуга', 'rainbow'],
            ['שפה', 'язык', 'language'], ['מגדל', 'башня', 'tower'], ['בבל', 'Бавель', 'Babel']
        ],
        phrases: [
            ['נח איש צדיק תמים היה בדרתיו', 'Ноах был человек праведный, непорочный в своих поколениях',
                'Noah was a righteous man, perfect in his generations'],
            ['את קשתי נתתי בענן', 'радугу Мою Я поместил в облаке', 'I have set My bow in the cloud'],
            ['ויהי כל הארץ שפה אחת ודברים אחדים', 'Была на всей земле одна речь и одни слова',
                'The whole earth had one language and the same words'],
            ['הבה נבנה לנו עיר ומגדל', 'давайте построим себе город и башню',
                'come, let us build us a city and a tower']
        ],
        story: {
            ru: ['Мир полон насилия, и Всевышний решает навести потоп.',
                'Праведный Ноах строит ковчег и спасает семью и животных.',
                'После потопа — завет и радуга. Люди строят Вавилонскую башню, и языки смешаны.',
                'От Шема ведётся род до Аврама.'],
            en: ['The world is full of violence, and G-d brings a flood.',
                'Righteous Noah builds an ark and saves his family and animals.',
                'After the flood: a covenant and the rainbow. People build the Tower of Babel; languages are mixed.',
                "Shem's line leads to Abram."],
            he: ['הארץ מלאה חמס, וה׳ מחליט להביא מבול.',
                'נח הצדיק בונה תבה ומציל את משפחתו ואת החיות.',
                'אחרי המבול — ברית וקשת בענן. בני האדם בונים את מגדל בבל, והשפות מתבלבלות.',
                'משם נמשכים הדורות עד אברם.']
        }
    },
    {
        slug: 'Lech Lecha', he: 'לֶךְ־לְךָ',
        translit: {ru: 'Лех-Леха', en: 'Lech Lecha'}, title: {ru: 'Иди себе', en: 'Go forth'},
        names: [
            ['אברם', 'Аврам', 'Abram'], ['שרי', 'Сарай', 'Sarai'], ['לוט', 'Лот', 'Lot'], ['פרעה', 'Фараон', 'Pharaoh'],
            ['מלכי צדק', 'Малки-Цедек', 'Melchizedek'], ['הגר', 'Агар', 'Hagar'], ['ישמעאל', 'Ишмаэль', 'Ishmael']
        ],
        keywords: [
            ['ברכה', 'благословение', 'blessing'], ['כנען', 'Кнаан', 'Canaan'], ['רעב', 'голод', 'famine'],
            ['מלחמה', 'война', 'war'], ['מגן', 'щит', 'shield'], ['כוכבים', 'звёзды', 'stars'],
            ['צדקה', 'праведность', 'righteousness'], ['גזרים', 'рассечённые части', 'the parts'],
            ['אות ברית', 'знак завета', 'sign of the covenant']
        ],
        phrases: [
            ['לך לך מארצך וממולדתך ומבית אביך', 'Иди себе из земли твоей, от родни твоей и из дома отца твоего',
                "Go forth from your land, your birthplace and your father's house"],
            ['ונברכו בך כל משפחת האדמה', 'и благословятся тобой все племена земли',
                'and all the families of the earth shall be blessed through you'],
            ['הבט נא השמימה וספר הכוכבים', 'взгляни на небо и сосчитай звёзды',
                'look toward heaven and count the stars'],
            ['והאמן בה׳ ויחשבה לו צדקה', 'И он поверил Всевышнему, и Тот вменил ему это в праведность',
                'He believed in Hashem, and He counted it to him as righteousness']
        ],
        story: {
            ru: ['Всевышний велит Авраму идти в Кнаан и обещает благословение.',
                'Голод уводит Аврама в Египет. Аврам спасает Лота в войне царей.',
                'Завет между рассечёнными частями: потомство как звёзды.',
                'Агар рождает Ишмаэля. Аврам становится Авраамом; заповедь обрезания.'],
            en: ['G-d tells Abram to go to Canaan and promises a blessing.',
                'Famine drives Abram to Egypt. Abram rescues Lot in the war of the kings.',
                'The covenant between the parts: offspring like the stars.',
                'Hagar bears Ishmael. Abram becomes Abraham; the command of circumcision.'],
            he: ['ה׳ מצווה על אברם ללכת לארץ כנען ומבטיח לו ברכה.',
                'הרעב מוריד את אברם למצרים. אברם מציל את לוט במלחמת המלכים.',
                'ברית בין הבתרים: זרע ככוכבי השמים.',
                'הגר יולדת את ישמעאל. אברם נעשה אברהם; מצות המילה.']
        }
    },
    {
        slug: 'Vayera', he: 'וַיֵּרָא',
        translit: {ru: 'Ваера', en: 'Vayera'}, title: {ru: 'И явился', en: 'And He appeared'},
        names: [
            ['אברהם', 'Авраам', 'Abraham'], ['שרה', 'Сара', 'Sarah'], ['יצחק', 'Ицхак', 'Isaac'], ['לוט', 'Лот', 'Lot'],
            ['הגר', 'Агар', 'Hagar'], ['אבימלך', 'Авимелех', 'Abimelech'],
            ['סדם', 'Сдом', 'Sodom']
        ],
        keywords: [
            ['אהל', 'шатёр', 'tent'], ['מלאכים', 'ангелы', 'angels'], ['צחק', 'смеяться', 'laugh'],
            ['צדיק', 'праведник', 'righteous'], ['גפרית', 'сера', 'brimstone'], ['מלח', 'соль', 'salt'],
            ['באר', 'колодец', 'well'], ['אשל', 'тамариск', 'tamarisk'], ['נסה', 'испытал', 'tested'],
            ['עקד', 'связал', 'bound'], ['איל', 'баран', 'ram']
        ],
        phrases: [
            ['וירא אליו ה׳ באלני ממרא', 'И явился ему Всевышний в дубраве Мамре',
                'Hashem appeared to him in the plains of Mamre'],
            ['היפלא מה׳ דבר', 'Разве есть что-то невозможное для Всевышнего?', 'Is anything too wondrous for Hashem?'],
            ['השפט כל הארץ לא יעשה משפט', 'Судья всей земли не совершит ли правосудия?',
                'Shall the Judge of all the earth not do justice?'],
            ['קח נא את בנך את יחידך אשר אהבת את יצחק', 'Возьми же сына твоего, единственного, которого любишь, Ицхака',
                'Take your son, your only one, whom you love, Isaac'],
            ['אלקים יראה לו השה לעלה בני', 'Всесильный усмотрит Себе ягнёнка для жертвы, сын мой',
                'G-d will see to the lamb for the offering, my son']
        ],
        story: {
            ru: ['Авраам гостеприимно принимает трёх ангелов; Саре обещан сын.',
                'Авраам молится за Сдом, но город уничтожен; Лот спасён, его жена становится соляным столпом.',
                'Рождается Ицхак, Агар и Ишмаэль изгнаны.',
                'Всевышний испытывает Авраама: связывание Ицхака на горе Мориа.'],
            en: ['Abraham warmly welcomes three angels; Sarah is promised a son.',
                'Abraham prays for Sodom, but the city is destroyed;',
                'Lot is saved, and his wife becomes a pillar of salt.',
                'Isaac is born, and Hagar and Ishmael are sent away.',
                'G-d tests Abraham: the binding of Isaac on Mount Moriah.'],
            he: ['אברהם מכניס אורחים — שלשה מלאכים; לשרה מבשרים על בן.',
                'אברהם מתפלל על סדם, אך העיר נהפכת; לוט ניצל, ואשתו נעשית נציב מלח.',
                'יצחק נולד, והגר וישמעאל מגורשים.',
                'ה׳ מנסה את אברהם: עקדת יצחק בהר המוריה.']
        }
    },
    {
        slug: 'Chayei Sara', he: 'חַיֵּי שָׂרָה',
        translit: {ru: 'Хаей Сара', en: 'Chayei Sarah'}, title: {ru: 'Жизнь Сары', en: 'The life of Sarah'},
        names: [
            ['שרה', 'Сара', 'Sarah'], ['עפרון', 'Эфрон', 'Ephron'], ['רבקה', 'Ривка', 'Rebecca'],
            ['לבן', 'Лаван', 'Laban'],
            ['יצחק', 'Ицхак', 'Isaac']
        ],
        keywords: [
            ['מערת המכפלה', 'пещера Махпела', 'Cave of Machpelah'], ['שקל', 'шекель', 'shekel'],
            ['עבד', 'раб', 'servant'], ['גמלים', 'верблюды', 'camels'], ['עין', 'источник', 'spring'],
            ['נזם', 'кольцо', 'nose ring'], ['חסד', 'милость', 'kindness']
        ],
        phrases: [
            ['ויהיו חיי שרה מאה שנה ועשרים שנה ושבע שנים', 'И было жизни Сары сто лет, двадцать лет и семь лет',
                'Sarah lived a hundred years, twenty years and seven years'],
            ['ואברהם זקן בא בימים', 'Авраам состарился, вошёл в дни', 'Abraham was old, well on in days'],
            ['ותהי לו לאשה ויאהבה', 'и она стала ему женой, и он полюбил её',
                'and she became his wife, and he loved her']
        ],
        story: {
            ru: ['Сара умирает; Авраам покупает пещеру Махпела.',
                'Раб Авраама идёт на его родину и у колодца находит Ривку, добрую к путнику.',
                'Ицхак женится на Ривке. Авраам умирает.'],
            en: ['Sarah dies; Abraham buys the Cave of Machpelah.',
                "Abraham's servant goes to his homeland and at the well finds Rebecca, kind to a stranger.",
                'Isaac marries Rebecca. Abraham dies.'],
            he: ['שרה מתה; אברהם קונה את מערת המכפלה.',
                'עבד אברהם הולך לארץ מולדתו ומוצא ליד הבאר את רבקה, הגומלת חסד עם זר.',
                'יצחק נושא את רבקה. אברהם מת.']
        }
    },
    {
        slug: 'Toldot', he: 'תּוֹלְדֹת',
        translit: {ru: 'Толдот', en: 'Toldot'}, title: {ru: 'Порождения', en: 'Generations'},
        names: [
            ['יצחק', 'Ицхак', 'Isaac'], ['רבקה', 'Ривка', 'Rebecca'], ['עשו', 'Эсав', 'Esau'],
            ['יעקב', 'Яаков', 'Jacob'],
            ['אבימלך', 'Авимелех', 'Abimelech'], ['גרר', 'Герар', 'Gerar']
        ],
        keywords: [
            ['בכרה', 'первородство', 'birthright'], ['נזיד', 'похлёбка', 'stew'],
            ['ציד', 'дичь, охота', 'game, hunting'],
            ['בארת', 'колодцы', 'wells'], ['מטעמים', 'кушанья', 'tasty food'], ['ברכה', 'благословение', 'blessing'],
            ['קול', 'голос', 'voice'], ['ידים', 'руки', 'hands']
        ],
        phrases: [
            ['שני גיים בבטנך', 'два народа во чреве твоём', 'two nations are in your womb'],
            ['ויעקב איש תם ישב אהלים', 'а Яаков — человек цельный, сидящий в шатрах',
                'and Jacob was a wholesome man, dwelling in tents'],
            ['הקל קול יעקב והידים ידי עשו', 'голос — голос Яакова, а руки — руки Эсава',
                'the voice is the voice of Jacob, but the hands are the hands of Esau']
        ],
        story: {
            ru: ['У Ривки рождаются близнецы Эсав и Яаков. Эсав продаёт первородство за похлёбку.',
                'Ицхак роет колодцы в Гераре.',
                'По совету матери Яаков получает благословение отца и бежит от гнева Эсава к Лавану.'],
            en: ['Rebecca bears twins, Esau and Jacob. Esau sells his birthright for a stew.',
                'Isaac digs wells in Gerar.',
                "On his mother's advice Jacob receives his father's blessing and flees Esau's anger to Laban."],
            he: ['לרבקה נולדים תאומים, עשו ויעקב. עשו מוכר את הבכורה בנזיד עדשים.',
                'יצחק חופר בארות בגרר.',
                'בעצת אמו יעקב מקבל את ברכת אביו ובורח מפני עשו אל לבן.']
        }
    },
    {
        slug: 'Vayetzei', he: 'וַיֵּצֵא',
        translit: {ru: 'Ваеце', en: 'Vayetzei'}, title: {ru: 'И вышел', en: 'And he went out'},
        names: [
            ['יעקב', 'Яаков', 'Jacob'], ['לבן', 'Лаван', 'Laban'], ['רחל', 'Рахель', 'Rachel'], ['לאה', 'Лея', 'Leah'],
            ['ראובן', 'Реувен', 'Reuben'], ['יהודה', 'Йеуда', 'Judah'], ['יוסף', 'Йосеф', 'Joseph'],
            ['בית אל', 'Бейт-Эль', 'Beth El']
        ],
        keywords: [
            ['סלם', 'лестница', 'ladder'], ['אבן', 'камень', 'stone'], ['מצבה', 'памятник', 'pillar'],
            ['נדר', 'обет', 'vow'], ['באר', 'колодец', 'well'], ['צאן', 'мелкий скот', 'flock'],
            ['שבע שנים', 'семь лет', 'seven years'], ['דודאים', 'мандрагоры', 'mandrakes'], ['מקלות', 'прутья', 'rods'],
            ['תרפים', 'терафимы', 'teraphim'], ['גל', 'холм из камней', 'heap of stones']
        ],
        phrases: [
            ['והנה סלם מצב ארצה וראשו מגיע השמימה', 'и вот лестница стоит на земле, а верх её достигает неба',
                'and behold, a ladder set on the earth, its top reaching to heaven'],
            ['אכן יש ה׳ במקום הזה ואנכי לא ידעתי', 'Воистину, Всевышний на этом месте, а я не знал!',
                'Surely Hashem is in this place, and I did not know'],
            ['מה נורא המקום הזה', 'Как трепетно это место!', 'How awesome is this place!'],
            ['ויעבד יעקב ברחל שבע שנים', 'И работал Яаков за Рахель семь лет', 'Jacob worked seven years for Rachel'],
            ['הפעם אודה את ה׳', 'на этот раз возблагодарю Всевышнего', 'this time I will thank Hashem']
        ],
        story: {
            ru: ['Яаков идёт в Харан; во сне видит лестницу и ангелов.',
                'Яаков работает у Лавана семь лет за Рахель, но получает Лею, затем ещё семь.',
                'Рождаются одиннадцать сыновей и дочь.',
                'Яаков богатеет и тайно уходит; Лаван догоняет, и они заключают союз.'],
            en: ['Jacob goes to Haran; in a dream he sees a ladder and angels.',
                'Jacob works seven years for Rachel at Laban’s, but is given Leah, then works seven more.',
                'Eleven sons and a daughter are born.',
                'Jacob grows rich and leaves in secret; Laban overtakes him, and they make a pact.'],
            he: ['יעקב הולך לחרן; בחלום הוא רואה סלם ומלאכים.',
                'יעקב עובד אצל לבן שבע שנים ברחל, אך מקבל את לאה, ועובד עוד שבע.',
                'נולדים לו אחד עשר בנים ובת.',
                'יעקב מתעשר ובורח בסתר; לבן משיג אותו, והם כורתים ברית.']
        }
    },
    {
        slug: 'Vayishlach', he: 'וַיִּשְׁלַח',
        translit: {ru: 'Ваишлах', en: 'Vayishlach'}, title: {ru: 'И послал', en: 'And he sent'},
        names: [
            ['יעקב', 'Яаков', 'Jacob'], ['עשו', 'Эсав', 'Esau'], ['ישראל', 'Исраэль', 'Israel'],
            ['דינה', 'Дина', 'Dinah'],
            ['שכם', 'Шхем', 'Shechem'], ['רחל', 'Рахель', 'Rachel'], ['בנימין', 'Биньямин', 'Benjamin']
        ],
        keywords: [
            ['מלאכים', 'посланцы', 'messengers'], ['מחנות', 'станы', 'camps'], ['מנחה', 'дар', 'gift'],
            ['יבק', 'Ябок', 'Jabbok'], ['אבק', 'боролся', 'wrestled'], ['ירך', 'бедро', 'thigh'],
            ['גיד הנשה', 'седалищный нерв', 'sciatic nerve'], ['נכר', 'чужие (боги)', 'foreign (gods)'],
            ['מצבה', 'памятник', 'pillar'], ['אלוף', 'князь', 'chief']
        ],
        phrases: [
            ['קטנתי מכל החסדים ומכל האמת', 'Мал я перед всеми милостями и всей верностью',
                'I am unworthy of all the kindnesses and all the truth'],
            ['לא יעקב יאמר עוד שמך כי אם ישראל', 'Не Яаков отныне имя твоё, но Исраэль',
                'Your name shall no longer be Jacob, but Israel'],
            ['כי ראיתי אלקים פנים אל פנים ותנצל נפשי', 'ибо видел я ангела лицом к лицу, и уцелела душа моя',
                'for I have seen an angel face to face, and my life was spared'],
            ['ותקבר בדרך אפרתה הוא בית לחם', 'и похоронена на дороге в Эфрат, это Бейт-Лехем',
                'and was buried on the way to Ephrath, which is Bethlehem']
        ],
        story: {
            ru: ['Яаков готовит дары Эсаву и молится.',
                'Ночью он борется с ангелом и получает имя Исраэль. Братья мирятся.',
                'В Шхеме похищена Дина; Шимон и Леви мстят.',
                'Рахель умирает, родив Биньямина. Ицхак умирает. Перечислены потомки Эсава.'],
            en: ['Jacob prepares gifts for Esau and prays.',
                'At night he wrestles with an angel and is named Israel. The brothers make peace.',
                'Dinah is taken in Shechem; Simeon and Levi take revenge.',
                "Rachel dies giving birth to Benjamin. Isaac dies. Esau's descendants are listed."],
            he: ['יעקב שולח מלאכים ומנחה לקראת עשו ומתפלל להצלה.',
                'בלילה הוא נאבק עם מלאך עד עלות השחר ונקרא בשם ישראל. האחים נפגשים ומשלימים.',
                'דינה נלקחת בשכם; שמעון ולוי נוקמים בעיר.',
                'רחל מתה בלדתה את בנימין ונקברת בדרך אפרת. יצחק מת. נמנים צאצאי עשו, הוא אדום.']
        }
    },
    {
        slug: 'Vayeshev', he: 'וַיֵּשֶׁב',
        translit: {ru: 'Ваешев', en: 'Vayeshev'}, title: {ru: 'И поселился', en: 'And he settled'},
        names: [
            ['יעקב', 'Яаков', 'Jacob'], ['יוסף', 'Йосеф', 'Joseph'], ['ראובן', 'Реувен', 'Reuben'],
            ['יהודה', 'Йеуда', 'Judah'], ['תמר', 'Тамар', 'Tamar'], ['פוטיפר', 'Потифар', 'Potiphar']
        ],
        keywords: [
            ['כתנת פסים', 'полосатая рубашка', 'striped coat'], ['חלום', 'сон', 'dream'], ['בור', 'яма', 'pit'],
            ['ישמעאלים', 'ишмаэлиты', 'Ishmaelites'], ['עשרים כסף', 'двадцать сребреников', 'twenty pieces of silver'],
            ['בית הסהר', 'темница', 'prison'], ['שר המשקים', 'главный виночерпий', 'chief cupbearer'],
            ['שר האפים', 'главный пекарь', 'chief baker']
        ],
        phrases: [
            ['וישראל אהב את יוסף מכל בניו', 'Исраэль любил Йосефа больше всех сыновей',
                'Israel loved Joseph more than all his sons'],
            ['את אחי אנכי מבקש', 'братьев моих я ищу', 'I am looking for my brothers'],
            ['הנה בעל החלמות הלזה בא', 'вот идёт этот сновидец', 'here comes that dreamer'],
            ['ויהי ה׳ את יוסף ויהי איש מצליח', 'И был Всевышний с Йосефом, и он преуспевал',
                'Hashem was with Joseph, and he prospered']
        ],
        story: {
            ru: ['Яаков любит Йосефа больше всех; братья завидуют его снам и продают его в Египет.',
                'История Йеуды и Тамар.',
                'Йосеф служит у Потифара, отвергает его жену и попадает в темницу, где толкует сны.'],
            en: ['Jacob loves Joseph most; the brothers envy his dreams and sell him into Egypt.',
                'The story of Judah and Tamar.',
                "Joseph serves Potiphar, refuses his wife, and is thrown into prison, where he interprets dreams."],
            he: ['יעקב אוהב את יוסף מכל בניו; האחים מקנאים בחלומותיו ומוכרים אותו למצרים.',
                'מעשה יהודה ותמר.',
                'יוסף משרת את פוטיפר, מסרב לאשתו ומושלך לבית הסהר, ושם פותר חלומות.']
        }
    },
    {
        slug: 'Miketz', he: 'מִקֵּץ',
        translit: {ru: 'Микец', en: 'Miketz'}, title: {ru: 'По истечении', en: 'At the end'},
        names: [
            ['פרעה', 'Фараон', 'Pharaoh'], ['יוסף', 'Йосеф', 'Joseph'],
            ['צפנת פענח', 'Цафнат-Панеах', 'Zaphenath-paneah'],
            ['אסנת', 'Аснат', 'Asenath'], ['מנשה', 'Менаше', 'Manasseh'], ['אפרים', 'Эфраим', 'Ephraim'],
            ['שמעון', 'Шимон', 'Simeon'], ['בנימין', 'Биньямин', 'Benjamin']
        ],
        keywords: [
            ['פרות', 'коровы', 'cows'], ['שבלים', 'колосья', 'ears of grain'], ['פותר', 'толкователь', 'interpreter'],
            ['רעב', 'голод', 'famine'], ['מרכבת', 'колесница', 'chariot'], ['שליט', 'правитель', 'ruler'],
            ['בר', 'зерно', 'grain'], ['מרגלים', 'лазутчики', 'spies'], ['כסף', 'серебро', 'silver'],
            ['אמתחת', 'мешок', 'sack'], ['גביע', 'чаша', 'goblet']
        ],
        phrases: [
            ['ויהי מקץ שנתים ימים ופרעה חלם', 'По истечении двух лет снилось фараону',
                'At the end of two full years Pharaoh dreamed'],
            ['בלעדי אלקים יענה את שלום פרעה', 'Не я — Всесильный даст ответ во благо фараону',
                "Not I — G-d will answer for Pharaoh's welfare"],
            ['הנמצא כזה איש אשר רוח אלקים בו', 'Найдём ли такого, как он, человека, в котором дух Всесильного?',
                'Can we find such a man, in whom is the spirit of G-d?'],
            ['ויכר יוסף את אחיו והם לא הכרהו', 'Йосеф узнал братьев, а они его не узнали',
                'Joseph recognized his brothers, but they did not recognize him'],
            ['אבל אשמים אנחנו על אחינו', 'воистину, виновны мы перед братом нашим',
                'indeed, we are guilty concerning our brother']
        ],
        story: {
            ru: ['Фараону снятся сны о коровах и колосьях; Йосеф толкует их и становится правителем Египта.',
                'В голод братья приходят за зерном.',
                'Йосеф узнаёт братьев, держит Шимона и требует привести Биньямина.',
                'В мешке Биньямина находят чашу.'],
            en: ['Pharaoh dreams of cows and ears of grain; Joseph interprets them and becomes ruler of Egypt.',
                'In the famine the brothers come for grain.',
                'Joseph recognizes his brothers, holds Simeon and demands that they bring Benjamin.',
                "The goblet is found in Benjamin's sack."],
            he: ['פרעה חולם על פרות ושבלים; יוסף פותר את חלומותיו ונעשה שליט על מצרים.',
                'ברעב באים האחים לשבר בר.',
                'יוסף מכיר את אחיו, אוסר את שמעון ודורש להביא את בנימין.',
                'הגביע נמצא באמתחת בנימין.']
        }
    },
    {
        slug: 'Vayigash', he: 'וַיִּגַּשׁ',
        translit: {ru: 'Ваигаш', en: 'Vayigash'}, title: {ru: 'И подошёл', en: 'And he approached'},
        names: [
            ['יהודה', 'Йеуда', 'Judah'], ['יוסף', 'Йосеф', 'Joseph'], ['בנימין', 'Биньямин', 'Benjamin'],
            ['יעקב', 'Яаков', 'Jacob'], ['פרעה', 'Фараон', 'Pharaoh'], ['גשן', 'Гошен', 'Goshen']
        ],
        keywords: [
            ['בכי', 'плач', 'weeping'], ['מחיה', 'спасение жизни', 'preserving life'],
            ['פליטה', 'уцелевшие', 'survival'],
            ['עגלות', 'повозки', 'wagons'], ['שבעים', 'семьдесят', 'seventy'], ['רעי צאן', 'пастухи', 'shepherds'],
            ['אחזה', 'владение', 'holding'], ['לחם', 'хлеб', 'bread']
        ],
        phrases: [
            ['ויגש אליו יהודה', 'И подошёл к нему Йеуда', 'Then Judah approached him'],
            ['אני יוסף העוד אבי חי', 'Я — Йосеф. Жив ли ещё отец мой?', 'I am Joseph. Is my father still alive?'],
            ['כי למחיה שלחני אלקים לפניכם', 'ибо для сохранения жизни послал меня Всесильный перед вами',
                'for G-d sent me ahead of you to preserve life']
        ],
        story: {
            ru: ['Йеуда заступается за Биньямина.',
                'Йосеф открывается братьям: Всевышний послал его спасти жизнь.',
                'Яаков с семьёй, семьдесят душ, переселяется в Египет, в Гошен.',
                'Йосеф кормит страну в голод.'],
            en: ['Judah pleads for Benjamin.',
                'Joseph reveals himself to his brothers: G-d sent him to save lives.',
                'Jacob and his family, seventy souls, move to Egypt, to Goshen.',
                'Joseph feeds the land through the famine.'],
            he: ['יהודה ניגש ומבקש על בנימין.',
                'יוסף מתוודע לאחיו: ה׳ שלח אותו להחיות.',
                'יעקב ומשפחתו, שבעים נפש, יורדים למצרים, לארץ גשן.',
                'יוסף מכלכל את הארץ בשנות הרעב.']
        }
    },
    {
        slug: 'Vayechi', he: 'וַיְחִי',
        translit: {ru: 'Ваехи', en: 'Vayechi'}, title: {ru: 'И жил', en: 'And he lived'},
        names: [['יעקב', 'Яаков', 'Jacob'], ['יוסף', 'Йосеф', 'Joseph'], ['מנשה', 'Менаше', 'Manasseh'],
            ['אפרים', 'Эфраим', 'Ephraim']],
        keywords: [
            ['ברכת', 'благословения', 'blessings of'], ['שבטי ישראל', 'колена Исраэля', 'tribes of Israel'],
            ['אריה', 'лев', 'lion'], ['שבט', 'скипетр', 'scepter'], ['פקד', 'вспомнит', 'will remember'],
            ['ארון', 'гроб', 'coffin']
        ],
        phrases: [
            ['ויחי יעקב בארץ מצרים', 'И жил Яаков в земле Египетской', 'Jacob lived in the land of Egypt'],
            ['בך יברך ישראל לאמר ישמך אלקים כאפרים וכמנשה',
                'Тобой будет благословлять Исраэль: да сделает тебя Всесильный как Эфраима и Менаше',
                'By you Israel will bless: may G-d make you like Ephraim and Manasseh'],
            ['לא יסור שבט מיהודה', 'Не отойдёт скипетр от Йеуды', 'The scepter shall not depart from Judah']
        ],
        story: {
            ru: ['Яаков благословляет Менаше и Эфраима, затем всех сыновей.',
                'Яаков умирает и похоронен в Махпеле.',
                'Йосеф утешает братьев и перед смертью обещает: Всевышний вспомнит вас.'],
            en: ['Jacob blesses Manasseh and Ephraim, then all his sons.',
                'Jacob dies and is buried in Machpelah.',
                'Joseph comforts his brothers and, before he dies, promises: G-d will remember you.'],
            he: ['יעקב מברך את מנשה ואת אפרים, ואחר כך את כל בניו.',
                'יעקב מת ונקבר במערת המכפלה.',
                'יוסף מנחם את אחיו ולפני מותו מבטיח: פקד יפקד אלקים אתכם.']
        }
    }
];
