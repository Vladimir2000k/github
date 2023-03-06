// eslint-disable-next-line import/named
import {call, put} from 'typed-redux-saga';

import {TARIFFS} from '../../constants/values';

import {getTariffs as getTariffsQuery} from '../../services/backend/queries/tariffs';
import {TariffsActions} from '../common/reducerActions';
import {handleSagaErrorGlobalAlertBased} from '../common/utils';

import {TariffsPricesConfig} from './types';

export function* getTariffs(): Generator {
  try {
    const tariffs = yield* call(getTariffsQuery);

    const tariffsPricesConfig = Object.values(TARIFFS).reduce((result, tariffName) => {
      const tariff = tariffs.find((tariff) => tariff.type === tariffName);
      if (tariff === undefined) {
        throw new Error(`Signature for the tariff ${tariffName} is missing from server`);
      }
      return Object.assign(result, {[tariff.type]: tariff});
    }, {});

    yield put(TariffsActions.updateTariffsData(tariffsPricesConfig as TariffsPricesConfig));
  } catch (error) {
    yield put(handleSagaErrorGlobalAlertBased(error));
  }
}
