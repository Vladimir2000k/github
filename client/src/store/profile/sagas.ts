import {t} from 'i18next';
import {call, put, select} from 'typed-redux-saga';

import {logout} from '../../services/backend/queries/auth/login';
import {updatePassword, getUserData} from '../../services/backend/queries/user';
import {AppGlobalModalsActions, ProfileActions} from '../common/reducerActions';
import {handleSagaErrorGlobalAlertBased, handleSagaErrorStateBased} from '../common/utils';

import {selectProfilePagePasswordChangeFormFieldsData} from './selectors';
import {PROFILE_EVENTS, PROFILE_PAGE_ERRORS_SECTIONS} from './types';

export function* initProfilePage(): Generator {
  try {
    yield put(ProfileActions.clearErrorsData());
    const {firstName, lastName, plan, email} = yield* call(getUserData);
    yield put(ProfileActions.updateUserData({firstName, lastName, plan, email}));
  } catch (error) {
    handleSagaErrorGlobalAlertBased(error);
  }
}

export function* logoutSaga(): Generator {
  try {
    yield put(ProfileActions.clearErrorsData());
    yield* call(logout);
    yield put(ProfileActions.postEvent({type: PROFILE_EVENTS.NAVIGATE_TO_LANDING}));
  } catch (error) {
    handleSagaErrorGlobalAlertBased(error);
  }
}

export function* changePassword(): Generator {
  try {
    yield put(ProfileActions.clearErrorsData());
    const {oldPassword, newPassword1, newPassword2} = yield* select(
      selectProfilePagePasswordChangeFormFieldsData,
    );
    yield* call(updatePassword, {oldPassword, newPassword1, newPassword2});
    yield put(
      AppGlobalModalsActions.showInfoModal({
        localizedHeading: '',
        localizedMessage: t('profile.alerts.passwordUpdatedSuccessfully'),
      }),
    );
  } catch (error) {
    yield put(
      handleSagaErrorStateBased(
        error,
        ProfileActions.updateErrorsData,
        PROFILE_PAGE_ERRORS_SECTIONS.PASSWORD_CHANGE_FORM,
      ),
    );
  }
}
