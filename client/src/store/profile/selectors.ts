import {Event} from '../../utils/events';
import {RootState} from '../store';

import {
  PROFILE_EVENTS,
  PROFILE_PAGE_ERRORS_SECTIONS,
  ProfilePageErrorsData,
  ProfilePagePasswordChangeFormFieldsData,
  ProfilePageUserData,
  ProfilePageUserFormFieldsData,
} from './types';

export const selectProfilePageUserData = (state: RootState): ProfilePageUserData =>
  state.profile.userData;

export const selectProfilePageUserFormFieldsData = (
  state: RootState,
): ProfilePageUserFormFieldsData => state.profile[PROFILE_PAGE_ERRORS_SECTIONS.USER_FORM];

export const selectProfilePagePasswordChangeFormFieldsData = (
  state: RootState,
): ProfilePagePasswordChangeFormFieldsData =>
  state.profile[PROFILE_PAGE_ERRORS_SECTIONS.PASSWORD_CHANGE_FORM];

export const selectProfilePageUserFormErrorsData = (
  state: RootState,
): ProfilePageErrorsData[PROFILE_PAGE_ERRORS_SECTIONS.USER_FORM] =>
  state.profile.errors[PROFILE_PAGE_ERRORS_SECTIONS.USER_FORM];

export const selectProfilePagePasswordChangeFormErrorsData = (
  state: RootState,
): ProfilePageErrorsData[PROFILE_PAGE_ERRORS_SECTIONS.PASSWORD_CHANGE_FORM] =>
  state.profile.errors[PROFILE_PAGE_ERRORS_SECTIONS.PASSWORD_CHANGE_FORM];

export const selectProfilePageCurrentEvent = (state: RootState): Event<PROFILE_EVENTS> =>
  state.profile.events.currEvent;
