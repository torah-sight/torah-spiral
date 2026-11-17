import type {ReactNode} from 'react';
import type {Locale} from '#src/i18n/locales.ts';

/** Флаг высотой в строку, с тонкой рамкой — белые поля не сливаются со светлым фоном. */
const FLAG = 'inline-block h-[0.85em] w-auto shrink-0 rounded-[2px] ring-1 ring-black/15';

/** Звёзды кантона: 5 рядов по 6 — у флага в строку их не сосчитать, нужна только фактура. */
const STARS = 'M1.27 1.1h0M3.8 1.1h0M6.33 1.1h0M8.86 1.1h0M11.39 1.1h0M13.92 1.1h0'
    + 'M1.27 3.2h0M3.8 3.2h0M6.33 3.2h0M8.86 3.2h0M11.39 3.2h0M13.92 3.2h0'
    + 'M1.27 5.3h0M3.8 5.3h0M6.33 5.3h0M8.86 5.3h0M11.39 5.3h0M13.92 5.3h0'
    + 'M1.27 7.4h0M3.8 7.4h0M6.33 7.4h0M8.86 7.4h0M11.39 7.4h0M13.92 7.4h0'
    + 'M1.27 9.5h0M3.8 9.5h0M6.33 9.5h0M8.86 9.5h0M11.39 9.5h0M13.92 9.5h0';

/** Белые полосы: 6 из 13, высота полосы 20/13. */
const STRIPES = 'M0 1.538h38v1.538H0zM0 4.615h38v1.538H0zM0 7.692h38v1.538H0zM0 10.769h38v1.538H0z'
    + 'M0 13.846h38v1.538H0zM0 16.923h38v1.538H0z';

/** Флаги языков интерфейса: Израиль, Россия, США. SVG, а не эмодзи — Windows эмодзи-флаги не рисует. */
export const FLAGS: Record<Locale, ReactNode> = {
    he: (
        <svg viewBox="0 0 220 160" className={FLAG} aria-hidden>
            <rect width="220" height="160" fill="#fff" />
            <rect y="15" width="220" height="25" fill="#0038b8" />
            <rect y="120" width="220" height="25" fill="#0038b8" />
            <path d="M110 47l28.6 49.5H81.4zM110 113L81.4 63.5h57.2z" fill="none" stroke="#0038b8" strokeWidth="5.5" />
        </svg>
    ),
    ru: (
        <svg viewBox="0 0 9 6" className={FLAG} aria-hidden>
            <rect width="9" height="2" fill="#fff" />
            <rect y="2" width="9" height="2" fill="#0039a6" />
            <rect y="4" width="9" height="2" fill="#d52b1e" />
        </svg>
    ),
    en: (
        <svg viewBox="0 0 38 20" className={FLAG} aria-hidden>
            <rect width="38" height="20" fill="#b22234" />
            <path d={STRIPES} fill="#fff" />
            <rect width="15.2" height="10.77" fill="#3c3b6e" />
            <path d={STARS} stroke="#fff" strokeWidth="0.9" strokeLinecap="round" />
        </svg>
    )
};
