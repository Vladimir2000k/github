import {t} from 'i18next';
import {call, put, select} from 'typed-redux-saga';

import {sendAPIIntegrationRequest as sendAPIIntegrationRequestQuery} from '../../services/backend/queries/apiIntegrationRequest';
import {APIIntegrationRequestActions, AppGlobalModalsActions} from '../common/reducerActions';
import {handleSagaErrorStateBased} from '../common/utils';

import {selectAPIIntegrationRequestFormFieldsData} from './selectors';
import {API_INTEGRATION_REQUEST_PAGE_ERRORS_SECTIONS} from './types';

export function* sendAPIIntegrationRequest(): Generator {
  try {
    const apiIntegrationRequestData = yield* select(selectAPIIntegrationRequestFormFieldsData);
    yield* call(sendAPIIntegrationRequestQuery, apiIntegrationRequestData);
    yield put(APIIntegrationRequestActions.clearFormFieldsData());
    yield put(
      AppGlobalModalsActions.showInfoModal({
        localizedHeading: t('apiIntegrationRequest.alerts.apiIntegrationRequestSentHeading'),
      }),
    );
  } catch (error) {
    yield put(
      handleSagaErrorStateBased(
        error,
        APIIntegrationRequestActions.updateErrorsData,
        API_INTEGRATION_REQUEST_PAGE_ERRORS_SECTIONS.GENERAL,
      ),
    );
  }
}
