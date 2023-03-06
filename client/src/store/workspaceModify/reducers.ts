// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../utils/events';

import {
  WORKSPACE_MODIFY_EVENTS,
  WorkspaceModifyFormData,
  WorkspaceModifyCreationErrors,
  WorkspaceModifyPageErrorsData,
  WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS,
  WorkspaceOwner,
} from './types';

export interface WorkspaceModifyPageState extends EventHandlingState<WORKSPACE_MODIFY_EVENTS> {
  formFields: WorkspaceModifyFormData;
  creationDate: string;
  owner: WorkspaceOwner;
  errors: WorkspaceModifyPageErrorsData;
}

const workspaceModifyPageInitialState: WorkspaceModifyPageState = {
  formFields: {
    workspaceName: '',
  },
  creationDate: '',
  owner: {
    pk: undefined,
    email: '',
    firstName: '',
    lastName: '',
  },
  errors: {
    [WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS.CREATE]: {
      nonFieldErrors: [],
      name: [],
    },
    [WORKSPACE_MODIFY_PAGE_ERRORS_SECTIONS.UPDATE]: {
      nonFieldErrors: [],
      name: [],
    },
  },
  events: eventsInitialState,
};

export const WORKSPACE_MODIFY_PAGE_REDUCER_NAME = 'workspaceModify';

const workspaceModifySlice = createSlice({
  name: WORKSPACE_MODIFY_PAGE_REDUCER_NAME,
  initialState: workspaceModifyPageInitialState,
  reducers: {
    clearFormFieldsData: (state) => {
      state.formFields = workspaceModifyPageInitialState.formFields;
    },
    clearCreationDate: (state) => {
      state.creationDate = workspaceModifyPageInitialState.creationDate;
    },
    clearOwnerData: (state) => {
      state.owner = workspaceModifyPageInitialState.owner;
    },
    clearErrors: (state) => {
      state.errors = workspaceModifyPageInitialState.errors;
    },
    updateFormFieldsData: (state, action: PayloadAction<Partial<WorkspaceModifyFormData>>) => {
      Object.assign(state.formFields, action.payload);
    },
    updateCreationDate: (state, action: PayloadAction<string>) => {
      state.creationDate = action.payload;
    },
    updateOwnerData: (state, action: PayloadAction<Partial<WorkspaceOwner>>) => {
      Object.assign(state.owner, action.payload);
    },
    updateErrorsData: (state, action: PayloadAction<Partial<WorkspaceModifyCreationErrors>>) => {
      Object.assign(state.errors, action.payload);
    },
    ...constructEventHandlingReducers<WORKSPACE_MODIFY_EVENTS>(),
  },
});

export default workspaceModifySlice;
