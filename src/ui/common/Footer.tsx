import {ScopedAntiHookComponent} from '@react-carburetor/core';
import type {ReactNode} from 'react';
import {MESSAGES} from '#src/i18n/messages/messages.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';

const REPO = 'https://github.com/torah-sight/torah-spiral';
const LICENSE = `${REPO}/blob/main/LICENSE`;
const LINK = 'text-soft underline decoration-line-strong underline-offset-2 transition hover:text-ink';

/** Подвал: лицензия GPL-3.0, ссылка на исходный код, источник текста Торы. */
export class Footer extends ScopedAntiHookComponent {
    /** Строка подвала. */
    public render(): ReactNode {
        const {locale} = this.useCarburetor(this.resolve(prefsToken));
        const t = MESSAGES[locale];
        return (
            <footer className="mx-auto mt-8 max-w-7xl space-y-1 px-4 text-center text-sm text-faint">
                <p>
                    {t.footerLicense}:{' '}
                    <a href={LICENSE} target="_blank" rel="noopener noreferrer" className={LINK}>
                        <bdi dir="ltr">GPL-3.0</bdi>
                    </a>
                    {' · '}
                    {t.footerSource}:{' '}
                    <a href={REPO} target="_blank" rel="noopener noreferrer" className={LINK}>
                        <bdi dir="ltr">github.com/torah-sight/torah-spiral</bdi>
                    </a>
                </p>
                <p>{t.footerText}</p>
            </footer>
        );
    }
}
