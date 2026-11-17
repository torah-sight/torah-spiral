import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha} from '#src/content/model/types.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {gameToken} from '#src/stores/game/gameToken.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';

/** Свойства стрелок карточки. */
export interface IDetailNavProps {
    index: number;
    /** Заголовок карточки между стрелками. */
    children: ReactNode;
    /** Сведения по сторонам от заголовка: у предыдущей главы и у следующей. */
    before: ReactNode;
    after: ReactNode;
    /** Выбор слоёв — под стрелкой к предыдущей главе. */
    tools: ReactNode;
}

/** Номер главы; название — с sm: на телефоне стрелки короткие, середина остаётся выбору слоёв. */
const nameOf = (parsha: IParsha, locale: Locale): ReactNode => (
    <bdi className="detail-arrow-name">
        {parsha.ordinal}
        <span className="detail-arrow-full"> · {locale === 'he' ? parsha.he : parsha.translit[locale]}</span>
    </bdi>
);

/** Стрелки к соседним главам; порядок справа налево, как в таблице: предыдущая справа, следующая слева. */
export class DetailNav extends ScopedAntiHookComponent<IDetailNavProps> {
    /** Предыдущая глава. */
    @bind
    protected prev(): void {
        this.resolve(selectionToken).step(-1);
    }

    /** Следующая глава. */
    @bind
    protected next(): void {
        this.resolve(selectionToken).step(1);
    }

    /** Стрелка к предыдущей главе; на краю Торы — неактивная, с подписью; в раунде игры её нет. */
    protected renderPrev(playing: boolean, locale: Locale): ReactNode {
        const {index} = this.props;
        const t = MESSAGES[locale];
        const prev = PARSHIOT[index - 1];
        if (playing) return <span className="detail-spacer-prev" />;
        if (prev === undefined) {
            return (
                <button type="button" disabled className="detail-edge-prev">
                    <span aria-hidden className="detail-arrow-glyph">→</span>
                    {t.torahStart}
                </button>
            );
        }
        return (
            <button type="button" onClick={this.prev} aria-label={t.prevParsha} className="detail-arrow-prev">
                <span aria-hidden className="detail-arrow-glyph">→</span>
                {nameOf(prev, locale)}
            </button>
        );
    }

    /** Стрелка к следующей главе: так же, зеркально. */
    protected renderNext(playing: boolean, locale: Locale): ReactNode {
        const {index} = this.props;
        const t = MESSAGES[locale];
        const next = PARSHIOT[index + 1];
        if (playing) return <span className="detail-spacer-next" />;
        if (next === undefined) {
            return (
                <button type="button" disabled className="detail-edge-next">
                    {t.torahEnd}
                    <span aria-hidden className="detail-arrow-glyph">←</span>
                </button>
            );
        }
        return (
            <button type="button" onClick={this.next} aria-label={t.nextParsha} className="detail-arrow-next">
                {nameOf(next, locale)}
                <span aria-hidden className="detail-arrow-glyph">←</span>
            </button>
        );
    }

    /**
     * Стрелки и заголовок; на краях Торы стрелка неактивна и подписана.
     * В идущем раунде игры стрелок нет — листание открыло бы неотгаданные главы.
     */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const {status} = this.useCarburetor(this.resolve(gameToken));
        const {children, before, after, tools} = this.props;
        const playing = status === 'playing';
        return (
            <nav dir="rtl" className="detail-nav">
                {this.renderPrev(playing, locale)}
                <div className="detail-before">{before}</div>
                <div className="detail-title-slot">{children}</div>
                <div className="detail-after">{after}</div>
                <div className="detail-tools">{tools}</div>
                {this.renderNext(playing, locale)}
            </nav>
        );
    }
}
