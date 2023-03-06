import {TARIFFS} from '../../constants/values';

export interface UserData {
  pk: number;
  email: string;
  plan: TARIFFS;
}
