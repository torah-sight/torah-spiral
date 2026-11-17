/** Типы той части @ktav-lang/polydoc, что нужна сборке документов (пакет без своих типов). */
declare module '@ktav-lang/polydoc' {
    /** Документ → язык → содержимое файла. */
    export type RootDocs = Map<string, Map<string, Buffer>>;

    export function configure(config: {langs: string[]; rootDocuments: string[]}): void;
    export function buildRootDocs(repoRoot: string): RootDocs;
    export function writeRootDocs(repoRoot: string, docs: RootDocs): void;
    export function checkRootDocs(repoRoot: string, docs: RootDocs): string[];
}
