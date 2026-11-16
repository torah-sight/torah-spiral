import {CarburetorScope, type IStorageLike, persist} from '@react-carburetor/core';
import {prefsToken} from '#src/stores/prefs/prefsToken.ts';

/** Scope приложения и его освобождение. */
export interface IAppScope {
    scope: CarburetorScope;
    dispose: () => void;
}

const ignore = (): void => undefined;

/** Создаёт scope; настройки зеркалятся в `storage`, если он передан. */
export const createAppScope = (storage?: IStorageLike): IAppScope => {
    const scope = new CarburetorScope();
    const stop = storage
        ? persist(scope.get(prefsToken), {key: 'torah-spiral/prefs', storage, prune: true, onError: ignore})
        : ignore;
    return {
        scope,
        dispose: (): void => {
            stop();
            scope.dispose();
        }
    };
};
