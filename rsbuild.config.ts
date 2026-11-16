import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';

// Итог сборки — один самодостаточный dist/index.html.
export default defineConfig({
    plugins: [pluginReact()],
    source: {
        entry: {index: './src/main.tsx'},
        decorators: {version: '2023-11'}
    },
    html: {
        title: 'Спираль Торы',
        template: './src/shell/index.html',
        // Inline-скрипт игнорирует defer: вставляем в конец body.
        inject: 'body'
    },
    output: {
        inlineScripts: true,
        inlineStyles: true,
        dataUriLimit: Number.MAX_SAFE_INTEGER,
        legalComments: 'none'
    },
    splitChunks: false
});
