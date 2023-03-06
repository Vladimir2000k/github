import {RootState} from '../store';

import {ErrorModalData, InfoModalData} from './types';

export const selectIsErrorModalVisible = (state: RootState): boolean =>
  state.appGlobalModals.isErrorModalVisible;

export const selectErrorModalData = (state: RootState): ErrorModalData =>
  state.appGlobalModals.errorModalData;

export const selectIsInfoModalVisible = (state: RootState): boolean =>
  state.appGlobalModals.isInfoModalVisible;

export const selectInfoModalData = (state: RootState): InfoModalData =>
  state.appGlobalModals.infoModalData;
