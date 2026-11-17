import type {ReactNode} from 'react';
import {PARSHIOT} from '#src/content/parshiot.ts';
import type {IGameStep} from '#src/domain/game/types.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {splitSentences} from '#src/i18n/format/splitSentences.ts';

/** Название главы-ориентира: иврит и транслитерация. */
const parshaName = (index: number, locale: Locale): ReactNode => {
    const parsha = PARSHIOT[index]!;
    return (
        <span className="clue-name">
            <span dir="rtl" className="clue-ref">{parsha.he}</span>
            {locale === 'he' ? null : <span className="clue-text">{parsha.translit[locale]}</span>}
        </span>
    );
};

/** Вопрос по названию главы. */
const nameClue = (step: Readonly<IGameStep>, locale: Locale): ReactNode => {
    const parsha = PARSHIOT[step.parsha]!;
    return (
        <div className="clue-row">
            <span className="clue-label">{MESSAGES[locale].gameFind}</span>
            <span dir="rtl" className="clue-hebrew">{parsha.he}</span>
            {locale === 'he' ? null : (
                <span className="clue-text">{parsha.translit[locale]} · «{parsha.title[locale]}»</span>
            )}
        </div>
    );
};

/** Вопрос по ключевой фразе: иврит из текста главы и перевод. */
const phraseClue = (step: Readonly<IGameStep>, locale: Locale): ReactNode => {
    const term = PARSHIOT[step.parsha]!.phrases[step.item]!;
    return (
        <div className="clue-row">
            <span className="clue-label">{MESSAGES[locale].gameFindPhrase}</span>
            <span dir="rtl" className="clue-ref">{term[0]}</span>
            {locale === 'he' ? null : <span className="clue-text">{locale === 'ru' ? term[1] : term[2]}</span>}
        </div>
    );
};

/** Вопрос по элементу сюжета. */
const storyClue = (step: Readonly<IGameStep>, locale: Locale): ReactNode => {
    const sentences = splitSentences(PARSHIOT[step.parsha]!.story[locale]);
    return (
        <div className="clue-row">
            <span className="clue-label">{MESSAGES[locale].gameFindStory}</span>
            <span className="clue-story">{sentences[step.item] ?? sentences.at(-1)}</span>
        </div>
    );
};

/** Вопрос о соседстве: между двумя главами, перед или после главы. */
const neighbourClue = (step: Readonly<IGameStep>, locale: Locale): ReactNode => {
    const t = MESSAGES[locale];
    const [first, second] = step.refs;
    const prompt = step.kind === 'between' ? t.gameBetween : step.kind === 'before' ? t.gameBefore : t.gameAfter;
    return (
        <div className="clue-row">
            <span className="clue-label">{prompt}</span>
            {parshaName(first!, locale)}
            {second === undefined ? null : <span className="clue-label">{t.gameAnd}</span>}
            {second === undefined ? null : parshaName(second, locale)}
            <span className="clue-question-mark">?</span>
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
