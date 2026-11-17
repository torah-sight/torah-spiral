/**
 * Заповеди по недельным главам — по «Сефер а-Хинух» (613 по счёту Рамбама): [повелевающие, запрещающие].
 *
 * Числа — из заголовков глав самого Хинуха («פרשת כי תצא יש בה עשרים ושבע מצות עשה וארבעים ושבע מצות
 * לא תעשה», Викитека, издание Венеции); content:check сверяет их с разметкой Хинуха по главам в Sefaria.
 * Хинух ставит две последние заповеди (הקהל, כתיבת ספר תורה) в «אתם נצבים», читаемую вместе с «וילך»;
 * их стихи (Дварим 31:12, 31:19) — в Ваелех, туда они и отнесены. Главы без заповедей не перечислены.
 */
export const MITZVOT: Readonly<Record<string, readonly [positive: number, negative: number]>> = {
    'Bereshit': [1, 0], 'Lech Lecha': [1, 0], 'Vayishlach': [0, 1],
    'Bo': [9, 11], 'Beshalach': [0, 1], 'Yitro': [3, 14], 'Mishpatim': [23, 30], 'Terumah': [2, 1],
    'Tetzaveh': [4, 3], 'Ki Tisa': [4, 5], 'Vayakhel': [0, 1],
    'Vayikra': [11, 5], 'Tzav': [9, 9], 'Shmini': [6, 11], 'Tazria': [5, 2], 'Metzora': [11, 0],
    'Achrei Mot': [2, 26], 'Kedoshim': [13, 38], 'Emor': [24, 39], 'Behar': [7, 17], 'Bechukotai': [7, 5],
    'Nasso': [7, 11], 'Beha\'alotcha': [3, 2], 'Sh\'lach': [2, 1], 'Korach': [5, 4], 'Chukat': [3, 0],
    'Pinchas': [6, 0], 'Matot': [1, 1], 'Masei': [2, 4],
    'Devarim': [0, 2], 'Vaetchanan': [8, 4], 'Eikev': [6, 2], 'Re\'eh': [17, 38], 'Shoftim': [14, 27],
    'Ki Teitzei': [27, 47], 'Ki Tavo': [3, 3], 'Vayeilech': [2, 0]
};
