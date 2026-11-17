// Palette функциональных классов: `npm run palette` пишет src/shell/classes/palette.css,
// `npm run palette:check` сверяет. В файл попадают только цвета, на которые ссылаются Roles (roles.css);
// значения берутся из палитры Tailwind v4, свои цвета перечислены ниже.
import {readFileSync, writeFileSync} from 'node:fs';

const ROLES = 'src/shell/classes/roles.css';
const OUT = 'src/shell/classes/palette.css';
const THEME = 'node_modules/tailwindcss/theme.css';

/** Свои цвета: бумага светлой темы, ночь тёмной, белый, чёрный и полупрозрачные подложки. */
const OWN: Record<string, string> = {
    'paper-50': '#fcfbf8',
    'paper-100': '#f5f3ee',
    'night-800': '#111626',
    'night-950': '#04050d',
    white: '#ffffff',
    black: '#000000',
    'white-85': 'rgb(255 255 255 / 0.85)',
    'white-75': 'rgb(255 255 255 / 0.75)',
    'white-5': 'rgb(255 255 255 / 0.05)',
    'white-3': 'rgb(255 255 255 / 0.03)',
    'scrim-25': 'rgb(15 23 42 / 0.25)',
    'scrim-60': 'rgb(0 0 0 / 0.6)'
};

const HEAD = '/* Palette: сырые цвета; значения — из палитры Tailwind v4. Читают только Roles. Файл собирает\n'
    + '   `npm run palette` из ссылок roles.css: руками не правят. */';

/** Имя токена из ссылки `var(--palette-имя)`. */
const nameOf = (match: RegExpMatchArray): string => match[1]!;

/** Токены, на которые ссылаются Roles, без повторов. */
const tokensOf = (roles: string): string[] => {
    const names = [...roles.matchAll(/var\(--palette-([\w-]+)\)/g)].map(nameOf);
    return [...new Set(names)];
};

/** Значение токена: свой цвет или «оттенок-шаг» Tailwind, при желании с прозрачностью «-aПроцент». */
const valueOf = (token: string, theme: string): string => {
    const own = OWN[token];
    if (own !== undefined) return own;
    const parts = /^([a-z]+)-(\d+)(?:-a(\d+))?$/.exec(token);
    if (parts === null) throw new Error(`палитра: неизвестный токен ${token}`);
    const [, hue, step, alpha] = parts;
    const css = new RegExp(`--color-${hue}-${step}:\\s*([^;]+);`).exec(theme)?.[1]?.trim();
    if (css === undefined) throw new Error(`палитра: в Tailwind нет цвета ${hue}-${step}`);
    return alpha === undefined ? css : css.replace(/\)$/, ` / ${Number(alpha) / 100})`);
};

/** Порядок: сначала Tailwind по оттенку и шагу, затем свои. */
const byName = (a: string, b: string): number => a.localeCompare(b, 'en', {numeric: true});

const build = (): string => {
    const theme = readFileSync(THEME, 'utf8');
    const tokens = tokensOf(readFileSync(ROLES, 'utf8')).toSorted(byName);
    const lines = tokens.map((token: string): string => `  --palette-${token}: ${valueOf(token, theme)};`);
    return `${HEAD}\n:root {\n${lines.join('\n')}\n}\n`;
};

const next = build();
if (process.argv.includes('--check')) {
    if (readFileSync(OUT, 'utf8') !== next) {
        console.error(`${OUT} устарел: npm run palette`);
        process.exit(1);
    }
    console.log('palette ok');
} else {
    writeFileSync(OUT, next);
    console.log('palette written');
}
