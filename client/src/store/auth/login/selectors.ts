import {Event} from '../../../utils/events';
import {RootState} from '../../store';

import {LOGIN_EVENTS, LOGIN_PAGE_ERRORS_SECTIONS, LoginErrors, LoginFormData} from './types';

export const selectLoginFormFieldsData = (state: RootState): LoginFormData =>
  state.login.formFields;

export const selectLoginPageErrorsData = (state: RootState): LoginErrors =>
  state.login.errors[LOGIN_PAGE_ERRORS_SECTIONS.LOGIN];

export const selectLoginPageCurrentEvent = (state: RootState): Event<LOGIN_EVENTS> =>
  state.login.events.currEvent;
