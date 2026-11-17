import type {ReactNode} from 'react';
import {PARSHIOT} from '#src/content/parshiot.ts';
import type {IGameStep} from '#src/domain/game/types.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {splitSentences} from '#src/i18n/format/splitSentences.ts';

const HEBREW = 'neon-text font-hebrew text-3xl text-stone-900 dark:text-fuchsia-100';
const REF = 'font-hebrew text-2xl text-stone-900 dark:text-fuchsia-100';
const STORY = 'text-lg font-medium text-stone-900 dark:text-fuchsia-100';
const ROW = 'flex flex-wrap items-baseline gap-x-3';

/** Название главы-ориентира: иврит и транслитерация. */
const parshaName = (index: number, locale: Locale, className: string): ReactNode => {
    const parsha = PARSHIOT[index]!;
    return (
        <span className="inline-flex items-baseline gap-1.5">
            <span dir="rtl" className={className}>{parsha.he}</span>
            {locale === 'he' ? null : <span className="text-ink">{parsha.translit[locale]}</span>}
        </span>
    );
};

/** Вопрос по названию главы. */
const nameClue = (step: Readonly<IGameStep>, locale: Locale): ReactNode => {
    const parsha = PARSHIOT[step.parsha]!;
    return (
        <div className={ROW}>
            <span className="text-sm text-mute">{MESSAGES[locale].gameFind}</span>
            <span dir="rtl" className={HEBREW}>{parsha.he}</span>
            {locale === 'he' ? null : (
                <span className="text-ink">{parsha.translit[locale]} · «{parsha.title[locale]}»</span>
            )}
        </div>
    );
};

/** Вопрос по ключевой фразе: иврит из текста главы и перевод. */
const phraseClue = (step: Readonly<IGameStep>, locale: Locale): ReactNode => {
    const term = PARSHIOT[step.parsha]!.phrases[step.item]!;
    return (
        <div className={ROW}>
            <span className="text-sm text-mute">{MESSAGES[locale].gameFindPhrase}</span>
            <span dir="rtl" className={REF}>{term[0]}</span>
            {locale === 'he' ? null : <span className="text-ink">{locale === 'ru' ? term[1] : term[2]}</span>}
        </div>
    );
};

/** Вопрос по элементу сюжета. */
const storyClue = (step: Readonly<IGameStep>, locale: Locale): ReactNode => {
    const sentences = splitSentences(PARSHIOT[step.parsha]!.story[locale]);
    return (
        <div className={ROW}>
            <span className="text-sm text-mute">{MESSAGES[locale].gameFindStory}</span>
            <span className={STORY}>{sentences[step.item] ?? sentences.at(-1)}</span>
        </div>
    );
};

/** Вопрос о соседстве: между двумя главами, перед или после главы. */
const neighbourClue = (step: Readonly<IGameStep>, locale: Locale): ReactNode => {
    const t = MESSAGES[locale];
    const [first, second] = step.refs;
    const prompt = step.kind === 'between' ? t.gameBetween : step.kind === 'before' ? t.gameBefore : t.gameAfter;
    return (
        <div className={ROW}>
            <span className="text-sm text-mute">{prompt}</span>
            {parshaName(first!, locale, REF)}
            {second === undefined ? null : <span className="text-sm text-mute">{t.gameAnd}</span>}
            {second === undefined ? null : parshaName(second, locale, REF)}
            <span className="text-2xl text-mute">?</span>
        </div>
    );
};

/** Подсказка шага игры любого вида. */
export const clueView = (step: Readonly<IGameStep>, locale: Locale): ReactNode => {
    if (step.kind === 'name') return nameClue(step, locale);
    if (step.kind === 'story') return storyClue(step, locale);
    if (step.kind === 'phrase') return phraseClue(step, locale);
    return neighbourClue(step, locale);
};
