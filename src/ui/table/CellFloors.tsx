import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha, Term} from '#src/content/model/types.ts';
import type {Floor} from '#src/domain/density/quotas/floors.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {termLabel} from '#src/i18n/format/termLabel.ts';
import {termTranslation} from '#src/i18n/format/termTranslation.ts';
import type {Layers} from '#src/stores/prefs/PrefsStore.ts';
import {Chips} from './Chips.tsx';

/** Свойства этажей главы. */
export interface ICellFloorsProps {
    parsha: IParsha;
    /** Какие слои показать. */
    layers: Layers;
    locale: Locale;
    /** Крупный шрифт для карточки, мелкий для клетки. */
    large: boolean;
}

const labelsOf = (terms: readonly Term[], locale: Locale): string[] =>
    terms.map((term: Term): string => termLabel(term, locale));

/** Слои главы поверх названия: имена, фразы, краткий сюжет — какие включены. */
export class CellFloors extends AntiHookComponent<ICellFloorsProps> {
    /** Фраза: иврит из текста главы и перевод. */
    @bind
    protected renderPhrase(term: Term): ReactNode {
        const translation = termTranslation(term, this.props.locale);
        return (
            <li key={term[0]} className="phrase-item">
                <span dir="rtl" className="phrase-hebrew">{term[0]}</span>
                {translation ? <span className="phrase-translation">{translation}</span> : null}
            </li>
        );
    }

    /** Подпись слоя (только в карточке). */
    protected caption(layer: Floor): ReactNode {
        if (!this.props.large) return null;
        return <h3 className="floors-caption">{MESSAGES[this.props.locale].floors[layer]}</h3>;
    }

    /** Фразы: подпись и список плашек. */
    protected renderPhrases(): ReactNode {
        const {parsha, layers} = this.props;
        if (!layers.phrases) return null;
        return (
            <div>
                {this.caption('phrases')}
                <ul className="phrase-list">{parsha.phrases.map(this.renderPhrase)}</ul>
            </div>
        );
    }

    /** Сюжет: подпись и абзац. */
    protected renderStory(): ReactNode {
        const {parsha, layers, locale, large} = this.props;
        if (!layers.story) return null;
        return (
            <div>
                {this.caption('story')}
                <p className={large ? 'story-card' : 'story-cell'}>{parsha.story[locale].join(' ')}</p>
            </div>
        );
    }

    /** Накопленные этажи до текущего. */
    public render(): ReactNode {
        const {parsha, layers, locale, large} = this.props;
        // В карточке имена — строкой таблицы над слоями (TallyLines).
        const names = layers.names && !large;
        if (!names && !layers.phrases && !layers.story) return null;
        const both = large && layers.phrases && layers.story;
        return (
            <div className={large ? 'floors-card' : 'floors-cell'}>
                {names ? <Chips labels={labelsOf(parsha.names, locale)} book={parsha.book} /> : null}
                <div className={both ? 'floors-columns-two' : 'floors-columns'}>
                    {this.renderPhrases()}
                    {this.renderStory()}
                </div>
            </div>
        );
    }
}
