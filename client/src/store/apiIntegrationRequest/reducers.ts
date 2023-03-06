// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../utils/events';

import {
  API_INTEGRATION_REQUEST_EVENTS,
  APIIntegrationRequestFormFieldsData,
  ApiIntegrationRequestPageErrorsData,
  APIIntegrationRequestPageErrorsData,
} from './types';

export interface APIIntegrationRequestState
  extends EventHandlingState<API_INTEGRATION_REQUEST_EVENTS> {
  formFields: APIIntegrationRequestFormFieldsData;
  errors: ApiIntegrationRequestPageErrorsData;
}

export const apiIntegrationRequestInitialState: APIIntegrationRequestState = {
  events: eventsInitialState,
  formFields: {
    name: '',
    email: '',
    message: '',
  },
  errors: {
    general: {
      nonFieldErrors: [],
      name: [],
      email: [],
      message: [],
    },
  },
};

export const API_INTEGRATION_REQUEST_REDUCER_NAME = 'apiIntegrationRequest';

const apiIntegrationRequestSlice = createSlice({
  name: API_INTEGRATION_REQUEST_REDUCER_NAME,
  initialState: apiIntegrationRequestInitialState,
  reducers: {
    clearFormFieldsData: (state) => {
      state.formFields = {
        name: '',
        email: '',
        message: '',
      };
    },
    clearErrorsData: (state) => {
      state.errors = apiIntegrationRequestInitialState.errors;
    },
    updateFormFieldsData: (
      state,
      action: PayloadAction<Partial<APIIntegrationRequestFormFieldsData>>,
    ) => {
      state.formFields = Object.assign(state.formFields, action.payload);
    },
    updateErrorsData: (
      state,
      action: PayloadAction<Partial<APIIntegrationRequestPageErrorsData>>,
    ) => {
      state.errors = Object.assign(state.errors, action.payload);
    },
    ...constructEventHandlingReducers<API_INTEGRATION_REQUEST_EVENTS>(),
  },
});

export default apiIntegrationRequestSlice;
