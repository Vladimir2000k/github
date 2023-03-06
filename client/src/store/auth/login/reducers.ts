// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../../utils/events';

import {LOGIN_EVENTS, LoginFormData, LoginPageErrorsData} from './types';

export interface LoginPageState extends EventHandlingState<LOGIN_EVENTS> {
  formFields: LoginFormData;
  errors?: LoginPageErrorsData;
}

const loginInitialState: LoginPageState = {
  formFields: {
    email: '',
    password: '',
  },
  errors: {
    login: {
      nonFieldErrors: [],
      email: [],
      password: [],
    },
    logout: {
      nonFieldErrors: [],
    },
  },
  events: eventsInitialState,
};

export const LOGIN_REDUCER_NAME = 'login';

const loginSlice = createSlice({
  name: LOGIN_REDUCER_NAME,
  initialState: loginInitialState,
  reducers: {
    clearFormFieldsData: (state) => {
      state.formFields = {
        email: '',
        password: '',
      };
    },
    clearErrorsData: (state) => {
      state.errors = {
        login: {
          nonFieldErrors: [],
          email: [],
          password: [],
        },
        logout: {
          nonFieldErrors: [],
        },
      };
    },
    clearEventsData: (state) => {
      state.events = eventsInitialState;
    },
    updateFormFieldsData: (state, action: PayloadAction<Partial<LoginFormData>>) => {
      Object.assign(state.formFields, action.payload);
    },
    updateErrorsData: (state, action: PayloadAction<Partial<LoginPageErrorsData>>) => {
      Object.assign(state.errors, action.payload);
    },
    ...constructEventHandlingReducers<LOGIN_EVENTS>(),
  },
});

export default loginSlice;
