// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TARIFFS} from '../../constants/values';

import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../utils/events';

import {
  ProfilePageErrorsData,
  PROFILE_EVENTS,
  PROFILE_PAGE_ERRORS_SECTIONS,
  ProfilePagePasswordChangeFormFieldsData,
  ProfilePageUserData,
  ProfilePageUserFormFieldsData,
} from './types';

export interface ProfilePageState extends EventHandlingState<PROFILE_EVENTS> {
  userData: ProfilePageUserData;
  [PROFILE_PAGE_ERRORS_SECTIONS.USER_FORM]: ProfilePageUserFormFieldsData;
  [PROFILE_PAGE_ERRORS_SECTIONS.PASSWORD_CHANGE_FORM]: ProfilePagePasswordChangeFormFieldsData;
  errors?: ProfilePageErrorsData;
}

const profileInitialState: ProfilePageState = {
  userData: {
    firstName: '',
    lastName: '',
    email: '',
    plan: TARIFFS.INTRO,
  },
  [PROFILE_PAGE_ERRORS_SECTIONS.USER_FORM]: {
    firstName: '',
    lastName: '',
  },
  [PROFILE_PAGE_ERRORS_SECTIONS.PASSWORD_CHANGE_FORM]: {
    oldPassword: '',
    newPassword1: '',
    newPassword2: '',
  },
  errors: {
    [PROFILE_PAGE_ERRORS_SECTIONS.USER_FORM]: {
      nonFieldErrors: [],
      firstName: [],
      lastName: [],
    },
    [PROFILE_PAGE_ERRORS_SECTIONS.PASSWORD_CHANGE_FORM]: {
      nonFieldErrors: [],
      oldPassword: [],
      newPassword1: [],
      newPassword2: [],
    },
  },
  events: eventsInitialState,
};

export const PROFILE_REDUCER_NAME = 'profile';

const profileSlice = createSlice({
  name: PROFILE_REDUCER_NAME,
  initialState: profileInitialState,
  reducers: {
    clearUserData: (state) => {
      state.userData = profileInitialState.userData;
    },
    clearUserFormFieldsData: (state) => {
      state[PROFILE_PAGE_ERRORS_SECTIONS.USER_FORM] =
        profileInitialState[PROFILE_PAGE_ERRORS_SECTIONS.USER_FORM];
    },
    clearPasswordChangeFormFieldsData: (state) => {
      state[PROFILE_PAGE_ERRORS_SECTIONS.PASSWORD_CHANGE_FORM] =
        profileInitialState[PROFILE_PAGE_ERRORS_SECTIONS.PASSWORD_CHANGE_FORM];
    },
    clearErrorsData: (state) => {
      state.errors = profileInitialState.errors;
    },
    clearEventsData: (state) => {
      state.events = eventsInitialState;
    },
    updateUserData: (state, action: PayloadAction<Partial<ProfilePageUserData>>) => {
      Object.assign(state.userData, action.payload);
    },
    updateUserFormFieldsData: (
      state,
      action: PayloadAction<Partial<ProfilePageUserFormFieldsData>>,
    ) => {
      Object.assign(state[PROFILE_PAGE_ERRORS_SECTIONS.USER_FORM], action.payload);
    },
    updatePasswordChangeFormFieldsData: (
      state,
      action: PayloadAction<Partial<ProfilePagePasswordChangeFormFieldsData>>,
    ) => {
      Object.assign(state[PROFILE_PAGE_ERRORS_SECTIONS.PASSWORD_CHANGE_FORM], action.payload);
    },
    updateErrorsData: (state, action: PayloadAction<Partial<ProfilePageErrorsData>>) => {
      Object.assign(state.errors, action.payload);
    },
    ...constructEventHandlingReducers<PROFILE_EVENTS>(),
  },
});

export default profileSlice;
