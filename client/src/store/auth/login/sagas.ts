import {call, put, select} from 'typed-redux-saga';

import {SPECIAL_ERROR_HANDLERS_KEYS} from '../../../constants/speсialErrorHandlers';

import {login as loginQuery} from '../../../services/backend/queries/auth/login';
import {resendEmail as resendEmailQuery} from '../../../services/backend/queries/auth/registration';
import {LoginActions, RegistrationActions} from '../../common/reducerActions';
import {handleSagaErrorEventBased, handleSagaErrorStateBased} from '../../common/utils';

import {selectLoginFormFieldsData} from './selectors';
import {LOGIN_EVENTS, LOGIN_PAGE_ERRORS_SECTIONS} from './types';

export function* login(): Generator {
  try {
    yield put(LoginActions.clearErrorsData());
    const loginFormData = yield* select(selectLoginFormFieldsData);
    yield* call(loginQuery, loginFormData);
    yield put(LoginActions.postEvent({type: LOGIN_EVENTS.NAVIGATE_TO_WORKSPACES}));
  } catch (error) {
    if (
      error?.response?.data?.nonFieldErrors[0] === SPECIAL_ERROR_HANDLERS_KEYS.EMAIL_IS_NOT_VERIFIED
    ) {
      const {email} = yield* select(selectLoginFormFieldsData);
      yield* call(resendEmailQuery, email);
      yield put(RegistrationActions.updateFormFieldsData({email}));
      yield put(
        handleSagaErrorEventBased(
          error,
          LoginActions.postEvent,
          LOGIN_EVENTS.NAVIGATE_TO_RESEND_EMAIL,
        ),
      );
      return;
    }

    yield put(
      handleSagaErrorStateBased(
        error,
        LoginActions.updateErrorsData,
        LOGIN_PAGE_ERRORS_SECTIONS.LOGIN,
      ),
    );
  }
}
