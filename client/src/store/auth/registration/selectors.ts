import {Event} from '../../../utils/events';
import {RootState} from '../../store';

import {
  EnterEmailErrors,
  REGISTRATION_EVENTS,
  REGISTRATION_PAGE_ERRORS_SECTIONS,
  RegistrationErrors,
  RegistrationFormData,
} from './types';

export const selectRegistrationFormFieldsData = (state: RootState): RegistrationFormData =>
  state.registration.formFields;

export const selectRegistrationPageErrorsData = (state: RootState): RegistrationErrors =>
  state.registration.errors[REGISTRATION_PAGE_ERRORS_SECTIONS.REGISTRATION];

export const selectEnterEmailPageErrorsData = (state: RootState): EnterEmailErrors =>
  state.registration.errors[REGISTRATION_PAGE_ERRORS_SECTIONS.ENTER_EMAIL];

export const selectRegistrationPagesCurrentEvent = (state: RootState): Event<REGISTRATION_EVENTS> =>
  state.registration.events.currEvent;
