import {TARIFFS} from '../../constants/values';

import {TariffModel} from '../../services/models';

export enum TARIFFS_EVENTS {
  ERROR = 'ERROR',
}

export interface TariffsPricesConfig {
  [TARIFFS.INTRO]: TariffModel;
  [TARIFFS.LITE]: TariffModel;
  [TARIFFS.STARTER]: TariffModel;
  [TARIFFS.PRO]: TariffModel;
  [TARIFFS.TEAMS]: TariffModel;
}
