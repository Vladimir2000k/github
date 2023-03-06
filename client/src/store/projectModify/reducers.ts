// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../utils/events';
import {GENERATION_LANG_OPTIONS} from '../appGlobal/types';

import {
  PROJECT_MODIFY_EVENTS,
  PROJECT_MODIFY_PAGE_ERRORS_SECTIONS,
  ProjectModifyCreationErrors,
  ProjectModifyFormData,
  ProjectModifyGenerationLanguages,
  ProjectModifyPageErrorsData,
} from './types';

export interface ProjectModifyPageState extends EventHandlingState<PROJECT_MODIFY_EVENTS> {
  formFields: ProjectModifyFormData;
  generationLanguages: ProjectModifyGenerationLanguages;
  errors: ProjectModifyPageErrorsData;
}

const projectModifyPageInitialState: ProjectModifyPageState = {
  formFields: {
    name: '',
    description: '',
  },
  generationLanguages: {
    sourceLang: GENERATION_LANG_OPTIONS.EN,
    targetLang: GENERATION_LANG_OPTIONS.EN,
  },
  errors: {
    [PROJECT_MODIFY_PAGE_ERRORS_SECTIONS.CREATE]: {
      nonFieldErrors: [],
      name: [],
      description: [],
    },
    [PROJECT_MODIFY_PAGE_ERRORS_SECTIONS.UPDATE]: {
      nonFieldErrors: [],
      name: [],
      description: [],
    },
  },
  events: eventsInitialState,
};

export const PROJECT_MODIFY_PAGE_REDUCER_NAME = 'projectModify';

const projectModifySlice = createSlice({
  name: PROJECT_MODIFY_PAGE_REDUCER_NAME,
  initialState: projectModifyPageInitialState,
  reducers: {
    clearFormFieldsData: (state) => {
      state.formFields = projectModifyPageInitialState.formFields;
    },
    clearGenerationLanguages: (state) => {
      state.generationLanguages = projectModifyPageInitialState.generationLanguages;
    },
    clearErrors: (state) => {
      state.errors = projectModifyPageInitialState.errors;
    },
    updateFormFieldsData: (state, action: PayloadAction<Partial<ProjectModifyFormData>>) => {
      Object.assign(state.formFields, action.payload);
    },
    updateGenerationLanguagesData: (
      state,
      action: PayloadAction<Partial<ProjectModifyGenerationLanguages>>,
    ) => {
      Object.assign(state.generationLanguages, action.payload);
    },
    updateErrorsData: (state, action: PayloadAction<Partial<ProjectModifyCreationErrors>>) => {
      Object.assign(state.errors, action.payload);
    },
    ...constructEventHandlingReducers<PROJECT_MODIFY_EVENTS>(),
  },
});

export default projectModifySlice;
