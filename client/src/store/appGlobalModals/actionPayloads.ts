import {ErrorModalData, InfoModalData} from './types';

export interface ShowErrorModalActionPayload extends Omit<ErrorModalData, 'localizedHeading'> {
  localizedHeading?: string;
}

export type ShowInfoModalActionPayload = InfoModalData;
