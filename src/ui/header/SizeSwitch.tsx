import {ScopedAntiHookComponent, bind} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {NAME_LABELS} from '#src/content/tallies/nameLabels.ts';
import type {NameKey} from '#src/domain/names/types.ts';
import type {Locale} from '#src/i18n/locales.ts';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import type {SizeBy} from '#src/stores/prefs/PrefsStore.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {ToggleButton} from '#src/ui/common/ToggleButton.tsx';
import {hintOf} from '#src/ui/table/size/sizeHint.ts';

const GROUP = 'flex flex-wrap items-center gap-1';
const CAPTION = 'me-1 text-sm uppercase tracking-widest text-mute';

/** Кнопка Имени: подпись на иврите, подсказка — что считается. */
const nameButton = (key: NameKey, sizeBy: SizeBy, locale: Locale, onPick: (value: SizeBy) => void): ReactNode => (
    <ToggleButton
        value={key}
        active={sizeBy === key}
        label={<span dir="rtl" className="font-hebrew">{NAME_LABELS[key]}</span>}
        title={hintOf(key, locale)}
        onPick={onPick}
    />
);

/**
 * Мера таблицы «Статистика»: святые Имена (первое — четырёхбуквенное), все семь вместе, особая ה,
 * заповеди, затем стихи, слова, буквы.
 */
export class SizeSwitch extends ScopedAntiHookComponent {
    /** Меняет меру. */
    @bind
    protected pick(sizeBy: SizeBy): void {
        this.resolve(prefsToken).setSizeBy(sizeBy);
    }

    /** Три группы кнопок: Имена, заповеди, размер. */
    public render(): ReactNode {
        const {locale, sizeBy} = this.useCarburetor(this.resolve(prefsToken));
        const t = MESSAGES[locale];
        return (
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <div role="group" aria-label={t.namesLabel} className={GROUP}>
                    <span className={CAPTION}>{t.namesLabel}</span>
                    {nameButton('havaya', sizeBy, locale, this.pick)}
                    {nameButton('elokim', sizeBy, locale, this.pick)}
                    {nameButton('el', sizeBy, locale, this.pick)}
                    {nameButton('adnut', sizeBy, locale, this.pick)}
                    {nameButton('shakai', sizeBy, locale, this.pick)}
                    {nameButton('eloah', sizeBy, locale, this.pick)}
                    {nameButton('yah', sizeBy, locale, this.pick)}
                    {nameButton('ehyeh', sizeBy, locale, this.pick)}
                    <ToggleButton
                        value="allNames"
                        active={sizeBy === 'allNames'}
                        label={t.namesAll}
                        title={t.namesAllHint}
                        onPick={this.pick}
                    />
                    {nameButton('he', sizeBy, locale, this.pick)}
                </div>
                <div role="group" aria-label={t.mitzvotLabel} className={GROUP}>
                    <span className={CAPTION}>{t.mitzvotLabel}</span>
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
                <div role="group" aria-label={t.sizeByLabel} className={GROUP}>
                    <span className={CAPTION}>{t.sizeByLabel}</span>
                    <ToggleButton value="verses" active={sizeBy === 'verses'} label={t.layoutSize} onPick={this.pick} />
                    <ToggleButton value="words" active={sizeBy === 'words'} label={t.layoutWords} onPick={this.pick} />
                    <ToggleButton
                        value="letters"
                        active={sizeBy === 'letters'}
                        label={t.layoutLetters}
                        onPick={this.pick}
                    />
                </div>
            </div>
        );
    }
}
