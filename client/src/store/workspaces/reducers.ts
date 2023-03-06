// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {WorkspaceModel} from '../../services/models';
import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../utils/events';

import {WORKSPACES_EVENTS, WorkspacesPageErrorsData} from './types';

export interface WorkspacesState extends EventHandlingState<WORKSPACES_EVENTS> {
  workspaces: Array<WorkspaceModel>;
  errors?: WorkspacesPageErrorsData;
}

export const workspacesInitialState: WorkspacesState = {
  events: eventsInitialState,
  workspaces: [],
  errors: {
    nonFieldErrors: [],
  },
};

export const WORKSPACES_REDUCER_NAME = 'workspaces';

const workspacesSlice = createSlice({
  name: WORKSPACES_REDUCER_NAME,
  initialState: workspacesInitialState,
  reducers: {
    clearWorkspacesData: (state) => {
      state.workspaces = workspacesInitialState.workspaces;
    },
    clearErrorsData: (state) => {
      state.errors = workspacesInitialState.errors;
    },
    updateWorkspacesData: (state, action: PayloadAction<Array<WorkspaceModel>>) => {
      state.workspaces = Object.assign([], action.payload);
    },
    updateErrorsData: (state, action: PayloadAction<Partial<WorkspacesPageErrorsData>>) => {
      state.errors = Object.assign(state.errors, action.payload);
    },
    ...constructEventHandlingReducers<WORKSPACES_EVENTS>(),
  },
});

export default workspacesSlice;
