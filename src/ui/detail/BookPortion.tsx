import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {formatRange} from '#src/domain/ranges/formatRange.ts';
import {countLabel} from '#src/i18n/format/size/countLabel.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';

/** Свойства строки главы в карточке книги. */
export interface IBookPortionProps {
    index: number;
}

/** Недельная глава в карточке книги: номер, иврит, перевод названия, стихи; клик открывает главу. */
export class BookPortion extends ScopedAntiHookComponent<IBookPortionProps> {
    /** Открывает карточку главы вместо карточки книги. */
    @bind
    protected onClick(): void {
        this.resolve(selectionToken).openParsha(this.props.index);
    }

    /** Строка-кнопка в три колонки: номер на две строки, название и подпись, число стихов. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const parsha = PARSHIOT[this.props.index]!;
        return (
            <li className="portion-item">
                <button type="button" onClick={this.onClick} className="portion-row">
                    <span className="portion-badge" data-book={parsha.book}>{parsha.ordinal}</span>
                    <span dir="rtl" className="portion-hebrew" data-book={parsha.book}>{parsha.he}</span>
                    <span className="portion-verses">{countLabel(parsha.verses, 'verses', locale)}</span>
                    <span className="portion-sub">
                        {locale === 'he' ? null : (
                            <>{parsha.translit[locale]} «{parsha.title[locale]}» · </>
                        )}
                        <bdi dir="ltr" className="portion-range">{formatRange(parsha.range)}</bdi>
                    </span>
                </button>
            </li>
        );
    }
}
