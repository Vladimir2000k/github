import {createAction} from '@reduxjs/toolkit';

const SAGA_NAME_PREFIX = 'saga/profile/';

export const initProfilePage = createAction(SAGA_NAME_PREFIX + 'initProfilePage');

export const logout = createAction(SAGA_NAME_PREFIX + 'logout');

export const changePassword = createAction(SAGA_NAME_PREFIX + 'changePassword');
