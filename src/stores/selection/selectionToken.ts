import {carburetorToken} from '@react-carburetor/core';
import {SelectionStore} from './SelectionStore.ts';

const createSelection = (): SelectionStore => new SelectionStore();

/** Стор открытой карточки в scope приложения. */
export const selectionToken = carburetorToken(createSelection, 'torah-spiral/selection');
