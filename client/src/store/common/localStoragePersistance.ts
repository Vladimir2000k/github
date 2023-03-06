import createTransform from 'redux-persist/es/createTransform';
import storage from 'redux-persist/lib/storage';

import {
  APP_GLOBAL_REDUCER_NAME,
  appGlobalInitialState,
  AppGlobalState,
} from '../appGlobal/reducers';
import {SITE_LANG_OPTIONS} from '../appGlobal/types';

interface PersistedLanguageState {
  language: SITE_LANG_OPTIONS;
}

const LanguageTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState: AppGlobalState, key): PersistedLanguageState => {
    return {language: inboundState.language};
  },
  // transform state being rehydrated
  (outboundState: PersistedLanguageState, key) => {
    return {...appGlobalInitialState, language: outboundState.language};
  },
  // define which reducers this transform gets called for.
  {whitelist: [APP_GLOBAL_REDUCER_NAME]},
);

export const languagePersistConfig = {
  key: 'lang',
  storage,
  whitelist: [APP_GLOBAL_REDUCER_NAME],
  transforms: [LanguageTransform],
};
