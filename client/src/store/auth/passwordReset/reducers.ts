// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../../utils/events';

import {
  PASSWORD_RESET_PAGE_ERRORS_SECTIONS,
  PASSWORD_RESET_EVENTS,
  PasswordResetFormData,
  PasswordResetPageErrorsData,
} from './types';

export interface PasswordResetPageState extends EventHandlingState<PASSWORD_RESET_EVENTS> {
  formFields: PasswordResetFormData;
  errors?: PasswordResetPageErrorsData;
}

const passwordResetInitialState: PasswordResetPageState = {
  formFields: {
    email: '',
    password1: '',
    password2: '',
  },
  errors: {
    [PASSWORD_RESET_PAGE_ERRORS_SECTIONS.PASSWORD_RESET]: {
      nonFieldErrors: [],
      email: [],
    },
    [PASSWORD_RESET_PAGE_ERRORS_SECTIONS.CONFIRM_PASSWORD_RESET]: {
      nonFieldErrors: [],
      password1: [],
      password2: [],
    },
    [PASSWORD_RESET_PAGE_ERRORS_SECTIONS.ENTER_EMAIL]: {
      nonFieldErrors: [],
      email: [],
    },
  },
  events: eventsInitialState,
};

export const PASSWORD_RESET_REDUCER_NAME = 'passwordReset';

const passwordResetSlice = createSlice({
  name: PASSWORD_RESET_REDUCER_NAME,
  initialState: passwordResetInitialState,
  reducers: {
    clearFormFieldsData: (state) => {
      state.formFields = {
        email: passwordResetInitialState.formFields.email,
        password1: passwordResetInitialState.formFields.password1,
        password2: passwordResetInitialState.formFields.password2,
      };
    },
    clearErrorsData: (state) => {
      state.errors = {
        [PASSWORD_RESET_PAGE_ERRORS_SECTIONS.PASSWORD_RESET]: {
          nonFieldErrors:
            passwordResetInitialState.errors[PASSWORD_RESET_PAGE_ERRORS_SECTIONS.PASSWORD_RESET]
              .nonFieldErrors,
          email:
            passwordResetInitialState.errors[PASSWORD_RESET_PAGE_ERRORS_SECTIONS.PASSWORD_RESET]
              .email,
        },
        [PASSWORD_RESET_PAGE_ERRORS_SECTIONS.CONFIRM_PASSWORD_RESET]: {
          nonFieldErrors:
            passwordResetInitialState.errors[
              PASSWORD_RESET_PAGE_ERRORS_SECTIONS.CONFIRM_PASSWORD_RESET
            ].nonFieldErrors,
          password1:
            passwordResetInitialState.errors[
              PASSWORD_RESET_PAGE_ERRORS_SECTIONS.CONFIRM_PASSWORD_RESET
            ].password1,
          password2:
            passwordResetInitialState.errors[
              PASSWORD_RESET_PAGE_ERRORS_SECTIONS.CONFIRM_PASSWORD_RESET
            ].password2,
        },
        [PASSWORD_RESET_PAGE_ERRORS_SECTIONS.ENTER_EMAIL]: {
          nonFieldErrors:
            passwordResetInitialState.errors[PASSWORD_RESET_PAGE_ERRORS_SECTIONS.ENTER_EMAIL]
              .nonFieldErrors,
          email:
            passwordResetInitialState.errors[PASSWORD_RESET_PAGE_ERRORS_SECTIONS.ENTER_EMAIL].email,
        },
      };
    },
    clearEventsData: (state) => {
      state.events = eventsInitialState;
    },
    updateFormFieldsData: (state, action: PayloadAction<Partial<PasswordResetFormData>>) => {
      Object.assign(state.formFields, action.payload);
    },
    updateErrorsData: (state, action: PayloadAction<Partial<PasswordResetPageErrorsData>>) => {
      Object.assign(state.errors, action.payload);
    },
    ...constructEventHandlingReducers<PASSWORD_RESET_EVENTS>(),
  },
});

export default passwordResetSlice;
