import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {BOOKS} from '#src/content/books/bookMeta.ts';
import {PARSHIOT} from '#src/content/parshiot.ts';
import {formatRange} from '#src/domain/ranges/formatRange.ts';
import {countLabel} from '#src/i18n/format/size/countLabel.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {selectionToken} from '#src/stores/selection/selectionToken.ts';
import {TONES} from '#src/ui/common/tones.ts';

/** Свойства строки главы в карточке книги. */
export interface IBookPortionProps {
    index: number;
}

/** Строка в три колонки: номер на две строки, название и подпись, число стихов — колонки не плывут. */
const ROW = 'grid w-full cursor-pointer grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-x-3 rounded-lg '
    + 'px-2 py-1.5 text-start transition hover:bg-veil';
const BADGE = 'row-span-2 flex size-8 items-center justify-center rounded-full border text-sm font-semibold '
    + 'tabular-nums';

const HEBREW = 'font-hebrew justify-self-start truncate text-xl leading-tight';

/** Недельная глава в карточке книги: номер, иврит, перевод названия, стихи; клик открывает главу. */
export class BookPortion extends ScopedAntiHookComponent<IBookPortionProps> {
    /** Открывает карточку главы вместо карточки книги. */
    @bind
    protected onClick(): void {
        this.resolve(selectionToken).openParsha(this.props.index);
    }

    /** Строка-кнопка. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const parsha = PARSHIOT[this.props.index]!;
        const tone = TONES[BOOKS[parsha.book]!.tone];
        return (
            <li className="break-inside-avoid">
                <button type="button" onClick={this.onClick} className={ROW}>
                    <span className={`${BADGE} ${tone.chip}`}>{parsha.ordinal}</span>
                    <span dir="rtl" className={`${HEBREW} ${tone.text}`}>{parsha.he}</span>
                    <span className="text-sm tabular-nums text-mute">
                        {countLabel(parsha.verses, 'verses', locale)}
                    </span>
                    <span className="col-span-2 col-start-2 truncate text-sm text-soft">
                        {locale === 'he' ? null : (
                            <>{parsha.translit[locale]} «{parsha.title[locale]}» · </>
                        )}
                        <bdi dir="ltr" className="text-faint">{formatRange(parsha.range)}</bdi>
                    </span>
                </button>
            </li>
        );
    }
}
