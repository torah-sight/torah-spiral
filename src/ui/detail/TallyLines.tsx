import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha} from '#src/content/model/types.ts';
import {NAME_LABELS} from '#src/content/tallies/nameLabels.ts';
import {NAME_KEYS} from '#src/domain/names/nameKeys.ts';
import type {NameKey} from '#src/domain/names/types.ts';
import {countLabel} from '#src/i18n/format/size/countLabel.ts';
import {rankShort} from '#src/i18n/format/size/rankShort.ts';
import type {Measure} from '#src/i18n/format/size/units.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {measure} from '#src/ui/table/size/measure.ts';
import {hintOf} from '#src/ui/table/size/sizeHint.ts';

/** Свойства строк топов. */
export interface ITallyLinesProps {
    parsha: IParsha;
    locale: Locale;
    /** Классы плашки в цвете книги. */
    chip: string;
}

const CHIP = 'inline-flex items-baseline gap-1.5 rounded-lg border px-2 py-0.5';
const HEADING = 'mb-1 mt-3 text-sm uppercase tracking-widest text-mute';

/** Плашка топа: подпись, сколько и место. */
const chipOf = (label: ReactNode, unit: Measure, props: ITallyLinesProps): ReactNode => {
    const {count, rank} = measure(props.parsha, unit);
    return (
        <span key={unit} title={hintOf(unit, props.locale)} className={`${CHIP} ${props.chip}`}>
            {label}
            <span>{countLabel(count, unit, props.locale)}</span>
            <span className="text-mute">· {rankShort(rank, props.locale)}</span>
        </span>
    );
};

/** Имена, что стоят в главе хотя бы раз. */
const namesOf = (parsha: IParsha): NameKey[] => NAME_KEYS.filter((key: NameKey): boolean => parsha.holy[key] > 0);

/** Топы главы в карточке: заповеди и святые Имена — только то, что в главе есть. */
export class TallyLines extends AntiHookComponent<ITallyLinesProps> {
    /** Плашка Имени. */
    @bind
    protected nameChip(key: NameKey): ReactNode {
        const label = <span dir="rtl" className="font-hebrew">{NAME_LABELS[key]}</span>;
        return chipOf(label, key, this.props);
    }

    /** Две группы плашек или ничего. */
    public render(): ReactNode {
        const {parsha, locale} = this.props;
        const t = MESSAGES[locale];
        const names = namesOf(parsha);
        const {mitzvot, positive, negative} = parsha.mitzvot;
        return (
            <>
                {mitzvot > 0 ? (
                    <section>
                        <h3 className={HEADING}>{t.mitzvotLabel}</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {chipOf(`${t.mitzvotAll}:`, 'mitzvot', this.props)}
                            {positive > 0 ? chipOf(`${t.mitzvotPositive}:`, 'positive', this.props) : null}
                            {negative > 0 ? chipOf(`${t.mitzvotNegative}:`, 'negative', this.props) : null}
                        </div>
                    </section>
                ) : null}
                {names.length > 0 ? (
                    <section>
                        <h3 className={HEADING}>{t.namesLabel}</h3>
                        <div className="flex flex-wrap gap-1.5">{names.map(this.nameChip)}</div>
                    </section>
                ) : null}
            </>
        );
    }
}
