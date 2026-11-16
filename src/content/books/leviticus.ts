import type {IParshaText} from '#src/content/model/types.ts';

/** Ваикра: 10 глав. */
export const LEVITICUS: readonly IParshaText[] = [
    {
        slug: 'Vayikra', he: 'וַיִּקְרָא',
        translit: {ru: 'Ваикра', en: 'Vayikra'}, title: {ru: 'И воззвал', en: 'And He called'},
        names: [
            ['משה', 'Моше', 'Moses'], ['בני אהרן', 'сыны Аарона', 'sons of Aaron'],
            ['אהל מועד', 'Шатёр встречи', 'Tent of Meeting']
        ],
        keywords: [
            ['קרבן', 'жертва', 'offering'], ['עלה', 'всесожжение', 'burnt offering'],
            ['מנחה', 'хлебный дар', 'meal offering'],
            ['שלמים', 'мирная жертва', 'peace offering'], ['חטאת', 'очистительная жертва', 'sin offering'],
            ['אשם', 'повинная жертва', 'guilt offering'], ['מלח', 'соль', 'salt']
        ],
        phrases: [
            ['אדם כי יקריב מכם קרבן לה׳', 'Человек из вас, который принесёт жертву Всевышнему',
                'When any man of you brings an offering to Hashem'],
            ['ריח ניחוח לה׳', 'благоухание, приятное Всевышнему', 'a pleasing fragrance to Hashem'],
            ['על כל קרבנך תקריב מלח', 'при всякой жертве твоей приноси соль',
                'with all your offerings you shall offer salt']
        ],
        story: {
            ru: ['Всевышний призывает Моше из Шатра встречи.',
                'Законы жертв: всесожжение, хлебный дар, мирная жертва, жертвы за грех и за вину —',
                'для человека, коэна, общины и правителя.'],
            en: ['G-d calls to Moses from the Tent of Meeting.',
                'Laws of offerings: burnt, meal and peace offerings, sin and guilt offerings —',
                'for an individual, a priest, the community and a ruler.'],
            he: ['ה׳ קורא אל משה מתוך אהל מועד ומלמד אותו את תורת הקרבנות.',
                'עולה, מנחה, זבח שלמים, חטאת ואשם —',
                'לאדם מישראל, לכהן המשיח, לכל העדה ולנשיא.']
        }
    },
    {
        slug: 'Tzav', he: 'צַו',
        translit: {ru: 'Цав', en: 'Tzav'}, title: {ru: 'Повели', en: 'Command'},
        names: [['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['בני אהרן', 'сыны Аарона', 'sons of Aaron'],
            ['אהל מועד', 'Шатёр встречи', 'Tent of Meeting']],
        keywords: [
            ['אש תמיד', 'вечный огонь', 'continual fire'], ['דשן', 'пепел', 'ashes'],
            ['תודה', 'благодарность', 'thanksgiving'],
            ['פגול', 'негодная жертва', 'rejected offering'], ['חלב', 'жир', 'fat'],
            ['שמן המשחה', 'масло помазания', 'anointing oil']
        ],
        phrases: [
            ['זאת תורת העלה', 'Вот закон всесожжения', 'This is the law of the burnt offering'],
            ['אש תמיד תוקד על המזבח לא תכבה', 'Вечный огонь будет гореть на жертвеннике, не угаснет',
                'A continual fire shall burn on the altar; it shall not go out'],
            ['ופתח אהל מועד תשבו יומם ולילה שבעת ימים', 'и у входа в Шатёр встречи сидите день и ночь семь дней',
                'at the entrance of the Tent of Meeting you shall stay day and night for seven days']
        ],
        story: {
            ru: ['Законы о службе коэнов с жертвами: вечный огонь, благодарственная жертва, запрет крови и жира.',
                'Моше семь дней посвящает Аарона и его сыновей.'],
            en: ['Laws of the priests’ service with offerings: the continual fire, the thanksgiving offering,',
                'the ban on blood and fat. Moses consecrates Aaron and his sons for seven days.'],
            he: ['דיני עבודת הכהנים בקרבנות: אש התמיד, קרבן תודה, איסור דם וחלב.',
                'משה מקדש את אהרן ואת בניו שבעה ימים.']
        }
    },
    {
        slug: 'Shmini', he: 'שְּׁמִינִי',
        translit: {ru: 'Шмини', en: 'Shemini'}, title: {ru: 'Восьмой', en: 'Eighth'},
        names: [['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['נדב', 'Надав', 'Nadab'],
            ['אביהוא', 'Авиу', 'Abihu']],
        keywords: [
            ['יום השמיני', 'восьмой день', 'eighth day'], ['אש זרה', 'чужой огонь', 'strange fire'],
            ['יין ושכר', 'вино и хмельное', 'wine and strong drink'],
            ['מפרסת פרסה', 'с раздвоенным копытом', 'split-hoofed'],
            ['מעלת גרה', 'жвачное', 'chewing the cud'], ['סנפיר וקשקשת', 'плавники и чешуя', 'fins and scales']
        ],
        phrases: [
            ['בקרבי אקדש', 'через близких Мне освящусь', 'through those near to Me I will be sanctified'],
            ['וידם אהרן', 'и Аарон умолк', 'and Aaron was silent'],
            ['והתקדשתם והייתם קדשים כי קדוש אני', 'освящайтесь и будьте святы, ибо свят Я',
                'sanctify yourselves and be holy, for I am holy']
        ],
        story: {
            ru: ['На восьмой день Мишкан освящён, огонь сходит с неба.',
                'Надав и Авиу приносят чужой огонь и гибнут; Аарон молчит.',
                'Законы о кошерных животных, рыбах и птицах.'],
            en: ['On the eighth day the Mishkan is inaugurated; fire descends.',
                'Nadab and Abihu bring strange fire and die; Aaron is silent.',
                'Laws of kosher animals, fish and birds.'],
            he: ['ביום השמיני נחנך המשכן, ואש יוצאת מלפני ה׳.',
                'נדב ואביהוא מקריבים אש זרה ומתים; אהרן דומם.',
                'דיני בהמות, דגים ועופות טהורים.']
        }
    },
    {
        slug: 'Tazria', he: 'תַזְרִיעַ',
        translit: {ru: 'Тазриа', en: 'Tazria'}, title: {ru: 'Зачнёт', en: 'She conceives'},
        names: [['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron']],
        keywords: [
            ['תזריע', 'зачнёт', 'conceives'], ['בשר ערלתו', 'обрезание', 'circumcision'],
            ['צרעת', 'цараат', "tzara'at"],
            ['נגע', 'поражение', 'affliction'], ['טמא', 'нечист', 'impure']
        ],
        phrases: [
            ['אשה כי תזריע וילדה זכר', 'Если женщина зачнёт и родит мальчика',
                'When a woman conceives and bears a male'],
            ['וטמא טמא יקרא', 'и «Нечист, нечист!» — будет он кричать', 'he shall call out: Impure, impure!']
        ],
        story: {
            ru: ['Очищение роженицы и обрезание на восьмой день.',
                'Коэн осматривает поражения цараат на коже, волосах и одежде.'],
            en: ['Purification after childbirth and circumcision on the eighth day.',
                "The priest examines tzara'at on skin, hair and garments."],
            he: ['טהרת היולדת ומילה ביום השמיני.',
                'הכהן רואה את נגעי הצרעת בעור, בשער ובבגד.']
        }
    },
    {
        slug: 'Metzora', he: 'מְּצֹרָע',
        translit: {ru: 'Мецора', en: 'Metzora'}, title: {ru: 'Поражённый цараат', en: "One with tzara'at"},
        names: [['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron']],
        keywords: [
            ['צפרים', 'птицы', 'birds'], ['ארז', 'кедр', 'cedar'], ['אזב', 'иссоп', 'hyssop'], ['בית', 'дом', 'house'],
            ['זב', 'истечение', 'discharge']
        ],
        phrases: [
            ['זאת תהיה תורת המצרע', 'Вот закон о поражённом цараат', "This shall be the law of the one with tzara'at"],
            ['ונתתי נגע צרעת בבית ארץ אחזתכם', 'и наведу поражение цараат на дом в земле вашего владения',
                "and I put an affliction of tzara'at in a house of the land of your possession"]
        ],
        story: {
            ru: ['Обряд очищения от цараат: две птицы, кедр, иссоп и жертвы.',
                'Поражение стен дома. Законы нечистоты при истечениях из тела.'],
            en: ["Purification from tzara'at: two birds, cedar, hyssop and offerings.",
                'Affliction of a house. Laws of impurity from bodily discharges.'],
            he: ['טהרת המצורע: שתי צפרים, עץ ארז, אזוב וקרבנות.',
                'נגע צרעת בבית. דיני טומאת זב וזבה.']
        }
    },
    {
        slug: 'Achrei Mot', he: 'אַחֲרֵי מוֹת',
        translit: {ru: 'Ахарей Мот', en: 'Acharei Mot'}, title: {ru: 'После смерти', en: 'After the death'},
        names: [['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['עזאזל', 'Азазель', 'Azazel']],
        keywords: [
            ['כפרת', 'крышка ковчега', 'ark cover'], ['קטרת', 'воскурение', 'incense'], ['שעירם', 'козлы', 'goats'],
            ['דם', 'кровь', 'blood'], ['ערוה', 'наготa (запретная связь)', 'nakedness (forbidden union)']
        ],
        phrases: [
            ['כי ביום הזה יכפר עליכם לטהר אתכם', 'ибо в этот день искупит вас, чтобы очистить вас',
                'for on this day atonement shall be made for you, to cleanse you'],
            ['וחי בהם', 'и жив будет ими', 'and live by them']
        ],
        story: {
            ru: ['После гибели сыновей Аарона — служба Йом Кипура:',
                'первосвященник входит в Святая святых, козёл отпущения.',
                'Запрет крови и жертв вне Мишкана. Запретные связи.'],
            en: ["After Aaron's sons die: the Yom Kippur service, the Holy of Holies, the scapegoat.",
                'No blood, no offerings outside the Mishkan. Forbidden unions.'],
            he: ['אחרי מות בני אהרן — עבודת יום הכפורים: הכהן הגדול נכנס לקודש הקדשים, השעיר לעזאזל.',
                'איסור דם וקרבן מחוץ למשכן. העריות.']
        }
    },
    {
        slug: 'Kedoshim', he: 'קְדֹשִׁים',
        translit: {ru: 'Кдошим', en: 'Kedoshim'}, title: {ru: 'Святы', en: 'Holy'},
        names: [['משה', 'Моше', 'Moses'], ['מלך', 'Молех', 'Molech']],
        keywords: [
            ['קדשים', 'святы', 'holy'], ['פאת', 'край поля', 'corner of the field'], ['לקט', 'колоски', 'gleanings'],
            ['אהבת', 'возлюби', 'love']
        ],
        phrases: [
            ['קדשים תהיו כי קדוש אני', 'Святы будьте, ибо свят Я', 'You shall be holy, for I am holy'],
            ['ואהבת לרעך כמוך', 'И люби ближнего, как самого себя', 'Love your fellow as yourself']
        ],
        story: {
            ru: ['Призыв к святости: почитание родителей, забота о бедных, честный суд, любовь к ближнему.',
                'Наказания за запретное.'],
            en: ['A call to holiness: honoring parents, care for the poor, honest judgment, love of one’s fellow.',
                'Penalties for forbidden acts.'],
            he: ['קריאה לקדושה: כיבוד הורים, מתנות עניים, משפט צדק, אהבת הרע.',
                'עונשי העבירות.']
        }
    },
    {
        slug: 'Emor', he: 'אֱמֹר',
        translit: {ru: 'Эмор', en: 'Emor'}, title: {ru: 'Скажи', en: 'Say'},
        names: [
            ['משה', 'Моше', 'Moses'], ['אהרן', 'Аарон', 'Aaron'], ['שלמית', 'Шломит', 'Shelomith'],
            ['דברי', 'Диври', 'Dibri'],
            ['דן', 'Дан', 'Dan']
        ],
        keywords: [
            ['כהנים', 'коэны', 'priests'], ['מום', 'изъян', 'blemish'],
            ['מועדי ה׳', 'праздники Всевышнего', "Hashem's festivals"],
            ['עמר', 'омер', 'omer'], ['תרועה', 'трубление', 'shofar blast'], ['סכת', 'шалаши', 'booths'],
            ['פרי עץ הדר', 'плод дерева великолепного', 'fruit of a beautiful tree']
        ],
        phrases: [
            ['אמר אל הכהנים בני אהרן', 'Скажи коэнам, сынам Аарона', 'Speak to the priests, the sons of Aaron'],
            ['ונקדשתי בתוך בני ישראל', 'и буду освящён среди сынов Исраэля',
                'and I shall be sanctified among the children of Israel'],
            ['עין תחת עין', 'око за око', 'an eye for an eye']
        ],
        story: {
            ru: ['Законы о чистоте и непорочности коэнов и жертв.',
                'Праздники года: шабат, Песах, омер, Шавуот, Рош а-Шана, Йом Кипур, Сукот.',
                'Светильник и хлебы. Казнь богохульника.'],
            en: ['Laws of purity and soundness for priests and offerings.',
                "The year's festivals: Shabbat, Passover, the omer, Shavuot, Rosh Hashanah, Yom Kippur, Sukkot.",
                'The menorah and the bread. The blasphemer is punished.'],
            he: ['דיני טהרת הכהנים ואיסור מום בכהנים ובקרבנות.',
                'מועדי ה׳ במשך השנה: שבת, פסח, ספירת העומר, שבועות, ראש השנה, יום הכפורים וסוכות.',
                'שמן למנורה ולחם הפנים. דינו של המקלל.']
        }
    },
    {
        slug: 'Behar', he: 'בְּהַר',
        translit: {ru: 'Беар', en: 'Behar'}, title: {ru: 'На горе', en: 'On the mount'},
        names: [['משה', 'Моше', 'Moses'], ['סיני', 'Синай', 'Sinai']],
        keywords: [['שבת', 'покой земли', 'rest of the land'], ['יובל', 'юбилей', 'jubilee'],
        ['דרור', 'свобода', 'liberty'],
            ['גאלה', 'выкуп', 'redemption']],
        phrases: [
            ['וקראתם דרור בארץ לכל ישביה', 'и объявите свободу на земле всем её жителям',
                'and proclaim liberty throughout the land to all its inhabitants'],
            ['כי לי הארץ', 'ибо Моя земля', 'for the land is Mine']
        ],
        story: {
            ru: ['Земля отдыхает каждый седьмой год; на пятидесятый — юбилей: свобода и возврат земли.',
                'Выкуп и помощь бедному.'],
            en: ['The land rests every seventh year; the fiftieth is the jubilee of liberty.',
                'Redeeming land; helping the poor.'],
            he: ['הארץ שובתת בכל שנה שביעית; בשנת החמשים — יובל: דרור ושיבת הקרקע.',
                'גאולה ועזרה לעני.']
        }
    },
    {
        slug: 'Bechukotai', he: 'בְּחֻקֹּתַי',
        translit: {ru: 'Бехукотай', en: 'Bechukotai'}, title: {ru: 'По установлениям Моим', en: 'In My statutes'},
        names: [['משה', 'Моше', 'Moses'], ['אברהם', 'Авраам', 'Abraham'], ['יצחק', 'Ицхак', 'Isaac'],
            ['סיני', 'Синай', 'Sinai']],
        keywords: [
            ['שלום', 'мир', 'peace'], ['קרי', 'наперекор', 'contrariness'], ['ערכך', 'оценка', 'valuation'],
            ['חרם', 'посвящённое', 'devoted thing'], ['מעשר', 'десятина', 'tithe']
        ],
        phrases: [
            ['אם בחקתי תלכו', 'Если по установлениям Моим будете ходить', 'If you walk in My statutes'],
            ['ונתתי משכני בתוככם', 'и помещу Мой Мишкан среди вас', 'and I will set My dwelling among you']
        ],
        story: {
            ru: ['Благословения за исполнение заповедей и тяжкие наказания за пренебрежение —',
                'но Всевышний не расторгнет завет. Законы об оценках, посвящениях и десятине.'],
            en: ['Blessings for keeping the commandments and harsh punishments for neglect —',
                'yet G-d will not break the covenant. Laws of valuations, devoted things and tithes.'],
            he: ['ברכות על שמירת המצוות ותוכחה קשה על הזנחתן —',
                'אך ה׳ לא יפר את בריתו. דיני ערכין, חרמים ומעשרות.']
        }
    }
];
