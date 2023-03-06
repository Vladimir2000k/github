import {Event} from '../../../utils/events';
import {RootState} from '../../store';

import {
  ConfirmPasswordResetErrors,
  EnterEmailForPasswordResetErrors,
  PASSWORD_RESET_EVENTS,
  PASSWORD_RESET_PAGE_ERRORS_SECTIONS,
  PasswordResetErrors,
  PasswordResetFormData,
} from './types';

export const selectPasswordResetFormFieldsData = (state: RootState): PasswordResetFormData =>
  state.passwordReset.formFields;

export const selectPasswordResetPageErrorsData = (state: RootState): PasswordResetErrors =>
  state.passwordReset.errors[PASSWORD_RESET_PAGE_ERRORS_SECTIONS.PASSWORD_RESET];

export const selectConfirmPasswordResetPageErrorsData = (
  state: RootState,
): ConfirmPasswordResetErrors =>
  state.passwordReset.errors[PASSWORD_RESET_PAGE_ERRORS_SECTIONS.CONFIRM_PASSWORD_RESET];

export const selectEnterEmailForPasswordResetPageErrorsData = (
  state: RootState,
): EnterEmailForPasswordResetErrors =>
  state.passwordReset.errors[PASSWORD_RESET_PAGE_ERRORS_SECTIONS.ENTER_EMAIL];

export const selectPasswordResetPageCurrentEvent = (
  state: RootState,
): Event<PASSWORD_RESET_EVENTS> => state.passwordReset.events.currEvent;
