import {normalizeVerse} from '#src/domain/density/text/normalizeVerse.ts';

/** Контентное написание (ה׳, אלקים) → слова как в тексте Торы. */
export const torahWords = (he: string): string[] =>
    normalizeVerse(
        he
            .replace(/ה[׳']/g, 'יהוה')
            .replace(/אלק(?=ים|י|יך|יכם|ינו|יו|יה|יהם|ות|$|\s)/g, 'אלה')
    );
