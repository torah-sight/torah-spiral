import {CarburetorProvider} from '@react-carburetor/core';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createAppScope} from '#src/stores/scope/createAppScope.ts';
import {App} from '#src/ui/App.tsx';
import './shell/styles.css';

const boot = (): void => {
    const container = document.getElementById('root');
    if (!container) throw new Error('#root not found');
    // Scope живёт всё время страницы (bfcache может вернуть её — не освобождаем).
    const {scope} = createAppScope(window.localStorage);
    createRoot(container).render(
        <StrictMode>
            <CarburetorProvider scope={scope}>
                <App />
            </CarburetorProvider>
        </StrictMode>
    );
};

boot();
