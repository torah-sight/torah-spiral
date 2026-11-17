import {CarburetorProvider} from '@react-carburetor/core';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {localeFromPath} from '#src/i18n/route/localeFromPath.ts';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';
import {createAppScope} from '#src/stores/scope/createAppScope.ts';
import {App} from '#src/ui/App.tsx';
import './shell/styles.css';

const boot = (): void => {
    const container = document.getElementById('root');
    if (!container) throw new Error('#root not found');
    // Scope живёт всё время страницы (bfcache может вернуть её — не освобождаем).
    const {scope} = createAppScope(window.localStorage);
    // Языковая ссылка (/ru, /en, /he) важнее сохранённого языка.
    const urlLocale = localeFromPath(window.location.pathname);
    if (urlLocale !== null) scope.get(prefsToken).setLocale(urlLocale);
    createRoot(container).render(
        <StrictMode>
            <CarburetorProvider scope={scope}>
                <App />
            </CarburetorProvider>
        </StrictMode>
    );
};

boot();
