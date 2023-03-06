// eslint-disable-next-line import/named
import {PayloadAction} from '@reduxjs/toolkit';
import {t} from 'i18next';
import {call, put, select} from 'typed-redux-saga';

import {SPECIAL_ERROR_HANDLERS_KEYS} from '../../../constants/speсialErrorHandlers';

import {
  sendPasswordResetEmailLink as sendPasswordResetEmailLinkQuery,
  confirmPasswordReset as confirmPasswordResetQuery,
} from '../../../services/backend/queries/auth/passwordReset';
import {AppGlobalModalsActions, PasswordResetActions} from '../../common/reducerActions';
import {handleSagaErrorGlobalAlertBased, handleSagaErrorStateBased} from '../../common/utils';
import {selectRegistrationFormFieldsData} from '../registration/selectors';

import {ConfirmPasswordResetActionPayload} from './actionPayloads';
import {selectPasswordResetFormFieldsData} from './selectors';
import {PASSWORD_RESET_EVENTS, PASSWORD_RESET_PAGE_ERRORS_SECTIONS} from './types';

export function* sendPasswordResetEmailLink(): Generator {
  try {
    yield put(PasswordResetActions.clearErrorsData());
    const {email} = yield* select(selectPasswordResetFormFieldsData);
    yield* call(sendPasswordResetEmailLinkQuery, email);
    yield put(
      PasswordResetActions.postEvent({type: PASSWORD_RESET_EVENTS.NAVIGATE_TO_RESEND_EMAIL}),
    );
  } catch (error) {
    yield put(
      handleSagaErrorStateBased(
        error,
        PasswordResetActions.updateErrorsData,
        PASSWORD_RESET_PAGE_ERRORS_SECTIONS.PASSWORD_RESET,
      ),
    );
  }
}

export function* resendEmailForPasswordReset(): Generator {
  try {
    yield put(PasswordResetActions.clearErrorsData());
    const {email} = yield* select(selectPasswordResetFormFieldsData);
    if (email === '' || email === undefined) {
      throw new Error(SPECIAL_ERROR_HANDLERS_KEYS.NO_EMAIL_DATA);
    }
    yield* call(sendPasswordResetEmailLinkQuery, email);
    yield put(PasswordResetActions.postEvent({type: PASSWORD_RESET_EVENTS.MAIL_RESENT}));
  } catch (error) {
    switch (error.message) {
      case SPECIAL_ERROR_HANDLERS_KEYS.NO_EMAIL_DATA:
        yield put(
          PasswordResetActions.postEvent({type: PASSWORD_RESET_EVENTS.NAVIGATE_TO_ENTER_EMAIL}),
        );
        break;
      default:
        yield put(handleSagaErrorGlobalAlertBased(error));
        break;
    }
  }
}

export function* resendEmailConfirmationForPasswordReset(): Generator {
  try {
    yield put(PasswordResetActions.clearErrorsData());
    const {email} = yield* select(selectRegistrationFormFieldsData);
    yield* call(sendPasswordResetEmailLinkQuery, email);
    yield put(
      PasswordResetActions.postEvent({type: PASSWORD_RESET_EVENTS.NAVIGATE_TO_RESEND_EMAIL}),
    );
  } catch (error) {
    yield put(
      handleSagaErrorStateBased(
        error,
        PasswordResetActions.updateErrorsData,
        PASSWORD_RESET_PAGE_ERRORS_SECTIONS.ENTER_EMAIL,
      ),
    );
  }
}

export function* confirmPasswordReset({
  payload: {uid, token},
}: PayloadAction<ConfirmPasswordResetActionPayload>): Generator {
  try {
    yield put(PasswordResetActions.clearErrorsData());
    const {password1, password2} = yield* select(selectPasswordResetFormFieldsData);
    yield* call(confirmPasswordResetQuery, {uid, token, password1, password2});
    yield put(PasswordResetActions.postEvent({type: PASSWORD_RESET_EVENTS.NAVIGATE_TO_LOGIN}));
    yield put(
      AppGlobalModalsActions.showInfoModal({
        localizedHeading: t(
          'confirmPasswordReset.alerts.' + ['Password has been reset successfully!'],
        ),
      }),
    );
  } catch (error) {
    yield put(
      handleSagaErrorStateBased(
        error,
        PasswordResetActions.updateErrorsData,
        PASSWORD_RESET_PAGE_ERRORS_SECTIONS.CONFIRM_PASSWORD_RESET,
      ),
    );
  }
}
