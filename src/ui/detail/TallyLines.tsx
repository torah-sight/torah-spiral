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
    /** Включён слой имён — в таблице есть их строка. */
    names: boolean;
}

/** Плашка топа: подпись, сколько и место. */
const chipOf = (label: ReactNode, unit: Measure, props: ITallyLinesProps): ReactNode => {
    const {count, rank} = measure(props.parsha, unit);
    return (
        <span key={unit} title={hintOf(unit, props.locale)} className="tally-chip" data-book={props.parsha.book}>
            {label}
            <span>{countLabel(count, unit, props.locale)}</span>
            <span className="tally-rank">· {rankShort(rank, props.locale)}</span>
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
        const label = <span dir="rtl" className="hebrew-inherit">{NAME_LABELS[key]}</span>;
        return chipOf(label, key, this.props);
    }

    /** Заповеди: «Все» — только когда есть оба вида: иначе она повторяет единственный вид. */
    protected renderMitzvot(): ReactNode {
        const {parsha, locale} = this.props;
        const t = MESSAGES[locale];
        const {mitzvot, positive, negative} = parsha.mitzvot;
        if (mitzvot === 0) return null;
        return (
            <>
                <h3 className="tally-heading">{t.mitzvotLabel}</h3>
                <div className="tally-values">
                    {positive > 0 && negative > 0 ? chipOf(`${t.mitzvotAll}:`, 'mitzvot', this.props) : null}
                    {positive > 0 ? chipOf(`${t.mitzvotPositive}:`, 'positive', this.props) : null}
                    {negative > 0 ? chipOf(`${t.mitzvotNegative}:`, 'negative', this.props) : null}
                </div>
            </>
        );
    }

    /** Святые Имена: «Все Имена» — когда Имён больше одного: иначе плашка повторяет единственное. */
    protected renderHolyNames(): ReactNode {
        const {parsha, locale} = this.props;
        const t = MESSAGES[locale];
        const names = namesOf(parsha);
        if (names.length === 0) return null;
        return (
            <>
                <h3 className="tally-heading">{t.namesLabel}</h3>
                <div className="tally-values">
                    {sevenOf(names) > 1 ? chipOf(`${t.namesAll}:`, 'allNames', this.props) : null}
                    {names.map(this.nameChip)}
                </div>
            </>
        );
    }

    /** Имена людей в главе. */
    protected renderPeople(): ReactNode {
        const {parsha, locale, names} = this.props;
        if (!names) return null;
        return (
            <>
                <h3 className="tally-heading">{MESSAGES[locale].floors.names}</h3>
                <div className="tally-values">
                    <Chips labels={labelsOf(parsha.names, locale)} book={parsha.book} />
                </div>
            </>
        );
    }

    /** Строки таблицы. */
    public render(): ReactNode {
        return (
            <div className="tally-grid">
                {this.renderMitzvot()}
                {this.renderHolyNames()}
                {this.renderPeople()}
            </div>
        );
    }
}
