import {EventsWithStack} from '../../utils/events';
import {RootState} from '../store';

import {TARIFFS_EVENTS, TariffsPricesConfig} from './types';

export const selectTariffs = (state: RootState): TariffsPricesConfig => state.tariffs.tariffs;

export const selectTariffsPageEvents = (state: RootState): EventsWithStack<TARIFFS_EVENTS> =>
  state.tariffs.events;
