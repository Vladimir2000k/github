// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../../utils/events';

import {
  REGISTRATION_EVENTS,
  REGISTRATION_PAGE_ERRORS_SECTIONS,
  RegistrationFormData,
  RegistrationPageErrorsData,
} from './types';

export interface RegistrationPageState extends EventHandlingState<REGISTRATION_EVENTS> {
  formFields: RegistrationFormData;
  errors?: RegistrationPageErrorsData;
}

const registrationInitialState: RegistrationPageState = {
  formFields: {
    email: '',
    password: '',
    passwordConfirmation: '',
  },
  errors: {
    [REGISTRATION_PAGE_ERRORS_SECTIONS.REGISTRATION]: {
      nonFieldErrors: [],
      email: [],
      password1: [],
      password2: [],
    },
    [REGISTRATION_PAGE_ERRORS_SECTIONS.ENTER_EMAIL]: {
      nonFieldErrors: [],
      email: [],
    },
  },
  events: eventsInitialState,
};

export const REGISTRATION_REDUCER_NAME = 'registration';

const registrationSlice = createSlice({
  name: REGISTRATION_REDUCER_NAME,
  initialState: registrationInitialState,
  reducers: {
    clearFormFieldsData: (state) => {
      state.formFields = {
        email: '',
        password: '',
        passwordConfirmation: '',
      };
    },
    clearErrorsData: (state) => {
      state.errors = {
        [REGISTRATION_PAGE_ERRORS_SECTIONS.REGISTRATION]: {
          nonFieldErrors: [],
          email: [],
          password1: [],
          password2: [],
        },
        [REGISTRATION_PAGE_ERRORS_SECTIONS.ENTER_EMAIL]: {
          nonFieldErrors: [],
          email: [],
        },
      };
    },
    clearEventsData: (state) => {
      state.events = eventsInitialState;
    },
    updateFormFieldsData: (state, action: PayloadAction<Partial<RegistrationFormData>>) => {
      Object.assign(state.formFields, action.payload);
    },
    updateErrorsData: (state, action: PayloadAction<Partial<RegistrationPageErrorsData>>) => {
      Object.assign(state.errors, action.payload);
    },
    ...constructEventHandlingReducers<REGISTRATION_EVENTS>(),
  },
});

export default registrationSlice;
