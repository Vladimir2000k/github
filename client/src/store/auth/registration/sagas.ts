// eslint-disable-next-line import/named
import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, select} from 'typed-redux-saga';

import {SPECIAL_ERROR_HANDLERS_KEYS} from '../../../constants/speсialErrorHandlers';

import {
  confirmEmail as confirmEmailQuery,
  register as registerQuery,
  resendEmail as resendEmailQuery,
} from '../../../services/backend/queries/auth/registration';
import {RegistrationActions} from '../../common/reducerActions';
import {handleSagaErrorGlobalAlertBased, handleSagaErrorStateBased} from '../../common/utils';

import {selectRegistrationFormFieldsData} from './selectors';
import {REGISTRATION_EVENTS, REGISTRATION_PAGE_ERRORS_SECTIONS} from './types';

export function* register(): Generator {
  try {
    yield put(RegistrationActions.clearErrorsData());
    const registrationFormData = yield* select(selectRegistrationFormFieldsData);
    const {key: authToken} = yield* call(registerQuery, registrationFormData);
    localStorage.setItem('authToken', authToken);
    yield put(
      RegistrationActions.postEvent({
        type: REGISTRATION_EVENTS.NAVIGATE_TO_RESEND_EMAIL,
      }),
    );
  } catch (error) {
    yield put(
      handleSagaErrorStateBased(
        error,
        RegistrationActions.updateErrorsData,
        REGISTRATION_PAGE_ERRORS_SECTIONS.REGISTRATION,
      ),
    );
  }
}

export function* resendEmailForRegistration(): Generator {
  try {
    yield put(RegistrationActions.clearErrorsData());
    const {email} = yield* select(selectRegistrationFormFieldsData);
    if (email === '' || email === undefined) {
      throw new Error(SPECIAL_ERROR_HANDLERS_KEYS.NO_EMAIL_DATA);
    }
    yield* call(resendEmailQuery, email);
    yield put(RegistrationActions.postEvent({type: REGISTRATION_EVENTS.MAIL_RESENT}));
  } catch (error) {
    switch (error.message) {
      case SPECIAL_ERROR_HANDLERS_KEYS.NO_EMAIL_DATA:
        yield put(
          RegistrationActions.postEvent({type: REGISTRATION_EVENTS.NAVIGATE_TO_ENTER_EMAIL}),
        );
        break;
      default:
        yield put(handleSagaErrorGlobalAlertBased(error));
        break;
    }
  }
}

export function* resendEmailConfirmationForRegistration(): Generator {
  try {
    yield put(RegistrationActions.clearErrorsData());
    const {email} = yield* select(selectRegistrationFormFieldsData);
    yield* call(resendEmailQuery, email);
    yield put(RegistrationActions.postEvent({type: REGISTRATION_EVENTS.NAVIGATE_TO_RESEND_EMAIL}));
  } catch (error) {
    yield put(
      handleSagaErrorStateBased(
        error,
        RegistrationActions.updateErrorsData,
        REGISTRATION_PAGE_ERRORS_SECTIONS.ENTER_EMAIL,
      ),
    );
  }
}

export function* confirmEmail({payload: key}: PayloadAction<string>): Generator {
  try {
    yield put(RegistrationActions.clearErrorsData());
    yield* call(confirmEmailQuery, key);
    yield put(RegistrationActions.postEvent({type: REGISTRATION_EVENTS.NAVIGATE_TO_HOME}));
  } catch (error) {
    yield put(handleSagaErrorGlobalAlertBased(error));
  }
}
