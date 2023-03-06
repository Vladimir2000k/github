// @ts-ignore
import {Action} from '@reduxjs/toolkit';

export interface ErrorModalData {
  localizedHeading: string;
  localizedMessage: string;
}

export interface InfoModalData {
  localizedHeading: string;
  localizedMessage?: string;
  acceptButtonAction?: Action;
}
