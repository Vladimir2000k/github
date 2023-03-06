import {createAction} from '@reduxjs/toolkit';

const SAGA_NAME_PREFIX = 'saga/workspace-modify/';

export const initWorkspacesPage = createAction(SAGA_NAME_PREFIX + 'createWorkspace');
