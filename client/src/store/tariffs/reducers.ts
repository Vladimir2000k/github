// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../utils/events';

import {TARIFFS_EVENTS, TariffsPricesConfig} from './types';

export interface TariffsPageState extends EventHandlingState<TARIFFS_EVENTS> {
  tariffs: TariffsPricesConfig;
}

const tariffsPageInitialState: TariffsPageState = {
  tariffs: undefined,
  events: eventsInitialState,
};

export const TARIFFS_PAGE_REDUCER_NAME = 'tariffs';

const tariffsSlice = createSlice({
  name: TARIFFS_PAGE_REDUCER_NAME,
  initialState: tariffsPageInitialState,
  reducers: {
    clearTariffsPageData: (state) => {
      state.tariffs = undefined;
      state.events = eventsInitialState;
    },
    updateTariffsData: (state, action: PayloadAction<TariffsPricesConfig>) => {
      state.tariffs = Object.assign(state.tariffs || {}, action.payload);
    },
    ...constructEventHandlingReducers<TARIFFS_EVENTS>(),
  },
});

export default tariffsSlice;
