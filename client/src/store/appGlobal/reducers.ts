// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  constructEventHandlingReducers,
  EventHandlingState,
  eventsInitialState,
} from '../../utils/events';

import {APP_GLOBAL_EVENTS, SITE_LANG_OPTIONS} from './types';

export interface AppGlobalState extends EventHandlingState<APP_GLOBAL_EVENTS> {
  language: SITE_LANG_OPTIONS;
}

export const appGlobalInitialState: AppGlobalState = {
  language: SITE_LANG_OPTIONS.EN,
  events: eventsInitialState,
};

export const APP_GLOBAL_REDUCER_NAME = 'appGlobal';

const appGlobalSlice = createSlice({
  name: APP_GLOBAL_REDUCER_NAME,
  initialState: appGlobalInitialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<SITE_LANG_OPTIONS>) => {
      state.language = action.payload;
    },
    ...constructEventHandlingReducers<APP_GLOBAL_EVENTS>(),
  },
});

export default appGlobalSlice;
