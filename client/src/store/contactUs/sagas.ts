import {t} from 'i18next';
import {call, put, select} from 'typed-redux-saga';

import {sendFeedback as sendFeedbackQuery} from '../../services/backend/queries/contactUs';
import {AppGlobalModalsActions, ContactUsActions} from '../common/reducerActions';
import {handleSagaErrorStateBased} from '../common/utils';

import {selectContactUsFormFieldsData} from './selectors';
import {CONTACT_US_PAGE_ERRORS_SECTIONS} from './types';

export function* sendFeedback(): Generator {
  try {
    const feedbackData = yield* select(selectContactUsFormFieldsData);
    yield* call(sendFeedbackQuery, feedbackData);
    yield put(ContactUsActions.clearFormFieldsData());
    yield put(
      AppGlobalModalsActions.showInfoModal({
        localizedHeading: t('contactUs.alerts.feedbackSentHeading'),
      }),
    );
  } catch (error) {
    yield put(
      handleSagaErrorStateBased(
        error,
        ContactUsActions.updateErrorsData,
        CONTACT_US_PAGE_ERRORS_SECTIONS.GENERAL,
      ),
    );
  }
}
