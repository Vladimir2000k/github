import {Event} from '../../utils/events';
import {RootState} from '../store';

import {APP_GLOBAL_EVENTS, SITE_LANG_OPTIONS} from './types';

export const selectAppLanguage = (state: RootState): SITE_LANG_OPTIONS => state.appGlobal.language;
export const selectAppGlobalEvent = (state: RootState): Event<APP_GLOBAL_EVENTS> =>
  state.appGlobal.events.currEvent;
