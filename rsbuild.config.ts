import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {type RsbuildPlugin, defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {textDir} from '#src/i18n/format/textDir.ts';
import {LOCALES, type Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {LOGO_URI} from '#src/shell/logo.ts';

/** Страница языка: та же, с lang, dir и заголовком этого языка — для ссылок и поисковиков. */
const localize = (html: string, locale: Locale): string => html
    .replace(/<html lang="[^"]*" dir="[^"]*">/, `<html lang="${locale}" dir="${textDir(locale)}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${MESSAGES[locale].appTitle}</title>`);

/** Пишет копии index.html в ru/, en/, he/. */
const writeLocalePages = async (dist: string): Promise<void> => {
    const html = await readFile(join(dist, 'index.html'), 'utf8');
    for (const locale of LOCALES) {
        await mkdir(join(dist, locale), {recursive: true});
        await writeFile(join(dist, locale, 'index.html'), localize(html, locale));
    }
};

/** Копии страницы для языков: ссылки вида /torah-spiral/ru открываются на GitHub Pages. */
const localePages: RsbuildPlugin = {
    name: 'torah-spiral:locale-pages',
    setup: (api) => api.onAfterBuild(() => writeLocalePages(api.context.distPath))
};

// Итог сборки — самодостаточный dist/index.html и его копии для языков.
export default defineConfig({
    plugins: [pluginReact(), localePages],
    source: {
        entry: {index: './src/main.tsx'},
        decorators: {version: '2023-11'}
    },
    html: {
        title: 'Спираль Торы',
        template: './src/shell/index.html',
        templateParameters: {logoUri: LOGO_URI},
        // Inline-скрипт игнорирует defer: вставляем в конец body.
        inject: 'body'
    },
    output: {
        inlineScripts: true,
        inlineStyles: true,
        dataUriLimit: Number.MAX_SAFE_INTEGER,
        legalComments: 'none'
    },
    // dev-сервер отдаёт страницу и по языковым путям.
    server: {historyApiFallback: true},
    splitChunks: false
});
