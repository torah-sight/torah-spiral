import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {NAME_LABELS} from '#src/content/tallies/nameLabels.ts';
import type {NameKey} from '#src/domain/names/types.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import type {IMessages} from '#src/i18n/messages/types.ts';
import type {SizeBy} from '#src/stores/prefs/PrefsStore.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {ToggleButton} from '#src/ui/common/ToggleButton.tsx';
import {hintOf} from '#src/ui/table/size/sizeHint.ts';

/** Святые Имена по порядку: первое — четырёхбуквенное. */
const HOLY_NAMES: readonly NameKey[] = ['havaya', 'elokim', 'el', 'adnut', 'shakai', 'eloah', 'yah', 'ehyeh'];

/** Мера таблицы «Статистика»: святые Имена, все семь вместе, особая ה, заповеди, затем стихи, слова, буквы. */
export class SizeSwitch extends ScopedAntiHookComponent {
    /** Меняет меру. */
    @bind
    protected pick(sizeBy: SizeBy): void {
        this.resolve(prefsToken).setSizeBy(sizeBy);
    }

    /** Кнопка Имени: подпись на иврите, подсказка — что считается. */
    protected nameButton(key: NameKey, sizeBy: SizeBy, locale: Locale): ReactNode {
        return (
            <ToggleButton
                key={key}
                value={key}
                active={sizeBy === key}
                label={<span dir="rtl" className="hebrew-label">{NAME_LABELS[key]}</span>}
                title={hintOf(key, locale)}
                onPick={this.pick}
            />
        );
    }

    /** Группа Имён: каждое по отдельности, все вместе и особая ה. */
    protected renderNames(sizeBy: SizeBy, locale: Locale, t: IMessages): ReactNode {
        return (
            <div role="group" aria-label={t.namesLabel} className="size-group">
                <span className="size-caption">{t.namesLabel}</span>
                {HOLY_NAMES.map((key: NameKey): ReactNode => this.nameButton(key, sizeBy, locale))}
                <ToggleButton
                    value="allNames"
                    active={sizeBy === 'allNames'}
                    label={t.namesAll}
                    title={t.namesAllHint}
                    onPick={this.pick}
                />
                {this.nameButton('he', sizeBy, locale)}
            </div>
        );
    }

    /** Группа заповедей: все, повелевающие, запрещающие. */
    protected renderMitzvot(sizeBy: SizeBy, t: IMessages): ReactNode {
        return (
            <div role="group" aria-label={t.mitzvotLabel} className="size-group">
                <span className="size-caption">{t.mitzvotLabel}</span>
                <ToggleButton
                    value="mitzvot"
                    active={sizeBy === 'mitzvot'}
                    label={t.mitzvotAll}
                    title={t.mitzvotHint}
                    onPick={this.pick}
                />
                <ToggleButton
                    value="positive"
                    active={sizeBy === 'positive'}
                    label={t.mitzvotPositive}
                    title={t.positiveHint}
                    onPick={this.pick}
                />
                <ToggleButton
                    value="negative"
                    active={sizeBy === 'negative'}
                    label={t.mitzvotNegative}
                    title={t.negativeHint}
                    onPick={this.pick}
                />
            </div>
        );
    }

    /** Группа размера: стихи, слова, буквы. */
    protected renderSizes(sizeBy: SizeBy, t: IMessages): ReactNode {
        return (
            <div role="group" aria-label={t.sizeByLabel} className="size-group">
                <span className="size-caption">{t.sizeByLabel}</span>
                <ToggleButton value="verses" active={sizeBy === 'verses'} label={t.layoutSize} onPick={this.pick} />
                <ToggleButton value="words" active={sizeBy === 'words'} label={t.layoutWords} onPick={this.pick} />
                <ToggleButton
                    value="letters"
                    active={sizeBy === 'letters'}
                    label={t.layoutLetters}
                    onPick={this.pick}
                />
            </div>
        );
    }

    /** Три группы кнопок: Имена, заповеди, размер. */
    public render(): ReactNode {
        const {locale, sizeBy} = this.useCarburetor(this.resolve(prefsToken));
        const t = MESSAGES[locale];
        return (
            <div className="size-panel">
                {this.renderNames(sizeBy, locale, t)}
                {this.renderMitzvot(sizeBy, t)}
                {this.renderSizes(sizeBy, t)}
            </div>
        );
    }
}
