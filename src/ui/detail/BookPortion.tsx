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
    /** Цвет текста книги. */
    text: string;
}

/** Недельная глава в карточке книги: номер, иврит, перевод названия, стихи; клик открывает главу. */
export class BookPortion extends ScopedAntiHookComponent<IBookPortionProps> {
    /** Открывает карточку главы вместо карточки книги. */
    @bind
    protected onClick(): void {
        this.resolve(selectionToken).openParsha(this.props.index);
    }

    /** Строка-кнопка. */
    public render(): ReactNode {
        const {index, text} = this.props;
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const parsha = PARSHIOT[index]!;
        return (
            <li>
                <button
                    type="button"
                    onClick={this.onClick}
                    className="flex w-full cursor-pointer items-baseline gap-2 rounded-lg px-2 py-1 text-start
                        transition hover:bg-veil"
                >
                    <span className={`w-6 shrink-0 text-sm font-semibold ${text}`}>{parsha.ordinal}</span>
                    <span dir="rtl" className={`font-hebrew shrink-0 text-xl ${text}`}>{parsha.he}</span>
                    <span className="min-w-0 flex-1 text-ink">
                        {locale === 'he' ? null : (
                            <>{parsha.translit[locale]} <span className="text-mute">«{parsha.title[locale]}»</span></>
                        )}
                    </span>
                    <span className="shrink-0 text-sm text-faint">
                        <bdi dir="ltr">{formatRange(parsha.range)}</bdi> · {countLabel(parsha.verses, 'verses', locale)}
                    </span>
                </button>
            </li>
        );
    }
}
