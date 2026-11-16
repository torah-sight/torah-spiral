import type {Locale} from '#src/i18n/locales.ts';
import {EN} from './en.ts';
import {HE} from './he.ts';
import {RU} from './ru.ts';
import type {IMessages} from './types.ts';

/** Строки интерфейса по языкам. */
export const MESSAGES: Record<Locale, IMessages> = {he: HE, ru: RU, en: EN};
