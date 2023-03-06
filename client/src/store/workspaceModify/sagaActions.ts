import {createAction} from '@reduxjs/toolkit';

const SAGA_NAME_PREFIX = 'saga/workspaceModify/';

export const createWorkspace = createAction(SAGA_NAME_PREFIX + 'createWorkspace');

export const updateWorkspace = createAction<{id: number}>(SAGA_NAME_PREFIX + 'updateWorkspace');

export const deleteWorkspace = createAction<{id: number}>(SAGA_NAME_PREFIX + 'deleteWorkspace');

export const getWorkspace = createAction<{id: number}>(SAGA_NAME_PREFIX + 'getWorkspace');
