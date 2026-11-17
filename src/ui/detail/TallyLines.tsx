import {AntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import type {IParsha} from '#src/content/model/types.ts';
import type {Term} from '#src/content/model/types.ts';
import {NAME_LABELS} from '#src/content/tallies/nameLabels.ts';
import {NAME_KEYS} from '#src/domain/names/nameKeys.ts';
import type {NameKey} from '#src/domain/names/types.ts';
import {countLabel} from '#src/i18n/format/size/countLabel.ts';
import {termLabel} from '#src/i18n/format/termLabel.ts';
import {rankShort} from '#src/i18n/format/size/rankShort.ts';
import type {Measure} from '#src/i18n/format/size/units.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {Chips} from '#src/ui/table/Chips.tsx';
import {measure} from '#src/ui/table/size/measure.ts';
import {hintOf} from '#src/ui/table/size/sizeHint.ts';

/** Свойства строк топов. */
export interface ITallyLinesProps {
    parsha: IParsha;
    locale: Locale;
    /** Классы плашки в цвете книги. */
    chip: string;
    /** Включён слой имён — в таблице есть их строка. */
    names: boolean;
}

const CHIP = 'inline-flex items-baseline gap-1.5 rounded-lg border px-2 py-0.5';
/**
 * Таблица: заголовки — первый столбец по ширине самого длинного, значения начинаются с одного отступа;
 * заголовок — на уровне первой строки плашек. На телефоне — заголовок над своими плашками.
 */
const GRID = 'mt-3 grid grid-cols-1 items-start gap-y-1.5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-x-4 sm:gap-y-2';
const HEADING = 'pt-1 text-sm uppercase tracking-widest whitespace-nowrap text-mute sm:col-start-1';
const VALUES = 'flex flex-wrap gap-1.5 sm:col-start-2';

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

const labelsOf = (terms: readonly Term[], locale: Locale): string[] =>
    terms.map((term: Term): string => termLabel(term, locale));

/** Сколько из семи Имён (без особой ה) стоит в главе. */
const isSeven = (key: NameKey): boolean => key !== 'he';
const sevenOf = (names: readonly NameKey[]): number => names.filter(isSeven).length;

/** Имена, что стоят в главе хотя бы раз. */
const namesOf = (parsha: IParsha): NameKey[] => NAME_KEYS.filter((key: NameKey): boolean => parsha.holy[key] > 0);

/** Таблица карточки: заповеди и святые Имена (только то, что в главе есть) и имена людей. */
export class TallyLines extends AntiHookComponent<ITallyLinesProps> {
    /** Плашка Имени. */
    @bind
    protected nameChip(key: NameKey): ReactNode {
        const label = <span dir="rtl" className="font-hebrew">{NAME_LABELS[key]}</span>;
        return chipOf(label, key, this.props);
    }

    /** Строки таблицы. */
    public render(): ReactNode {
        const {parsha, locale, chip} = this.props;
        const t = MESSAGES[locale];
        const names = namesOf(parsha);
        const {mitzvot, positive, negative} = parsha.mitzvot;
        return (
            <div className={GRID}>
                {mitzvot > 0 ? <h3 className={HEADING}>{t.mitzvotLabel}</h3> : null}
                {mitzvot > 0 ? (
                    <div className={VALUES}>
                        {/* «Все» — только когда есть оба вида: иначе она повторяет единственный вид. */}
                        {positive > 0 && negative > 0 ? chipOf(`${t.mitzvotAll}:`, 'mitzvot', this.props) : null}
                        {positive > 0 ? chipOf(`${t.mitzvotPositive}:`, 'positive', this.props) : null}
                        {negative > 0 ? chipOf(`${t.mitzvotNegative}:`, 'negative', this.props) : null}
                    </div>
                ) : null}
                {names.length > 0 ? <h3 className={HEADING}>{t.namesLabel}</h3> : null}
                {names.length > 0 ? (
                    <div className={VALUES}>
                        {/* «Все Имена» — когда Имён больше одного: иначе плашка повторяет единственное. */}
                        {sevenOf(names) > 1 ? chipOf(`${t.namesAll}:`, 'allNames', this.props) : null}
                        {names.map(this.nameChip)}
                    </div>
                ) : null}
                {this.props.names ? <h3 className={HEADING}>{t.floors.names}</h3> : null}
                {this.props.names ? (
                    <div className={VALUES}>
                        <Chips labels={labelsOf(parsha.names, locale)} className={chip} />
                    </div>
                ) : null}
            </div>
        );
    }
}
