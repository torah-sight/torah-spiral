// Документы на трёх языках из root-docs/ (polydoc): `npm run docs` собирает, `npm run docs:check` сверяет.
// Править нужно юниты root-docs/<DOC>/<unit>/body-N.md, а не сгенерированные *.md.
import {buildRootDocs, checkRootDocs, configure, writeRootDocs} from '@ktav-lang/polydoc';

/** en — основной: README.md; остальные — README.ru.md, README.he.md. */
const LANGS = ['en', 'ru', 'he'];

/** Каталог → документы из его root-docs/. Шаблон PR лежит в docs/: GitHub ищет его и там. */
const ROOTS: [string, string[]][] = [
    ['.', ['README', 'CONTRIBUTING', 'CODE_OF_CONDUCT', 'SECURITY']],
    ['docs', ['PULL_REQUEST_TEMPLATE']]
];

const check = process.argv.includes('--check');
const problems: string[] = [];
for (const [root, rootDocuments] of ROOTS) {
    configure({langs: LANGS, rootDocuments});
    const docs = buildRootDocs(root);
    if (check) problems.push(...checkRootDocs(root, docs));
    else writeRootDocs(root, docs);
}

if (problems.length > 0) {
    console.error(problems.join('\n'));
    process.exit(1);
}
console.log(check ? 'docs ok' : 'docs written');
