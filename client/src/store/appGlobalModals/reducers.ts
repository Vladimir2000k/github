// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {t} from 'i18next';

import {ShowErrorModalActionPayload, ShowInfoModalActionPayload} from './actionPayloads';
import {ErrorModalData, InfoModalData} from './types';

export interface AppGlobalModalsState {
  isErrorModalVisible: boolean;
  isInfoModalVisible: boolean;
  errorModalData?: ErrorModalData;
  infoModalData?: InfoModalData;
}

export const appGlobalModalsInitialState: AppGlobalModalsState = {
  isErrorModalVisible: false,
  isInfoModalVisible: false,
};

export const APP_GLOBAL_MODALS_REDUCER_NAME = 'appGlobalModals';

const appGlobalSlice = createSlice({
  name: APP_GLOBAL_MODALS_REDUCER_NAME,
  initialState: appGlobalModalsInitialState,
  reducers: {
    showErrorModal: (
      state: AppGlobalModalsState,
      action: PayloadAction<ShowErrorModalActionPayload>,
    ) => {
      state.errorModalData = {
        localizedHeading: t('globalModals.errorModalDefaultHeading'), // Fallback default heading if none is specified
        ...action.payload,
      };
      state.isErrorModalVisible = true;
    },
    showInfoModal: (
      state: AppGlobalModalsState,
      action: PayloadAction<ShowInfoModalActionPayload>,
    ) => {
      state.infoModalData = action.payload;
      state.isInfoModalVisible = true;
    },
    closeModal: (state: AppGlobalModalsState) => {
      state.errorModalData = undefined;
      state.infoModalData = undefined;

      state.isErrorModalVisible = false;
      state.isInfoModalVisible = false;
    },
  },
});

export default appGlobalSlice;
