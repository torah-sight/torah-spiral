import {carburetorToken} from '@react-carburetor/core';
import {PrefsStore} from './PrefsStore.ts';

const createPrefs = (): PrefsStore => new PrefsStore();

/** Стор настроек в scope приложения. */
export const prefsToken = carburetorToken(createPrefs, 'torah-spiral/prefs');
