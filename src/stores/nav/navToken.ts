import {carburetorToken} from '@react-carburetor/core';
import {NavStore} from './NavStore.ts';

const createNav = (): NavStore => new NavStore();

/** Стор навигации в scope приложения. */
export const navToken = carburetorToken(createNav, 'torah-spiral/nav');
