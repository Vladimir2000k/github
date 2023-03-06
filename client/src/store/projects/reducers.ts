// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {BalanceModel, ProjectModel} from '../../services/models';
import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../utils/events';

import {PROJECTS_EVENTS, ProjectsPageErrorsData} from './types';

export interface ProjectsState extends EventHandlingState<PROJECTS_EVENTS> {
  balance: BalanceModel;
  projects: Array<ProjectModel>;
  errors?: ProjectsPageErrorsData;
}

export const projectsInitialState: ProjectsState = {
  events: eventsInitialState,
  balance: {
    pk: undefined,
    user: undefined,
    workspacesAdditional: undefined,
    projectsAdditional: undefined,
    credits: undefined,
    antiplagiarismChecks: undefined,
    plan: undefined,
    daysBeforeSubscriptionExpires: undefined,
    nextPlanProlongationDate: '',
    usedWorkspaces: undefined,
    usedProjects: undefined,
  },
  projects: [],
  errors: {
    nonFieldErrors: [],
  },
};

export const PROJECTS_REDUCER_NAME = 'projects';

const projectsSlice = createSlice({
  name: PROJECTS_REDUCER_NAME,
  initialState: projectsInitialState,
  reducers: {
    clearBalanceData: (state) => {
      state.balance = projectsInitialState.balance;
    },
    clearWorkspaceData: (state) => {
      state.projects = projectsInitialState.projects;
    },
    clearErrorsData: (state) => {
      state.errors = projectsInitialState.errors;
    },
    updateBalanceData: (state, action: PayloadAction<BalanceModel>) => {
      state.balance = Object.assign({}, action.payload);
    },
    updateProjectsData: (state, action: PayloadAction<Array<ProjectModel>>) => {
      state.projects = Object.assign([], action.payload);
    },
    updateErrorsData: (state, action: PayloadAction<Partial<ProjectsPageErrorsData>>) => {
      state.errors = Object.assign(state.errors, action.payload);
    },
    ...constructEventHandlingReducers<PROJECTS_EVENTS>(),
  },
});

export default projectsSlice;
