import { IAuthState } from './AuthTypes';
import { IProfile } from '@app/types/ProfileTypes';
import { ILanguageState } from './LanguageTypes';
import { GenderType } from '@app/constants';

export * from './LanguageTypes';
export * from './AuthTypes';
export * from './SkiniveTypes';

export interface ActionParams {
  type: string;
  payload?: Record<string, any>;
}

export interface IStateReducers {
  lang: ILanguageState;
  auth: IAuthState;
  profile: IProfile;
}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  userType: number;
  age: number;
  height: number;
  weight: number;
  createdAt: string;
  updatedAt: string;
  birthYear?: string;
  id: string;
  gender: GenderType;
  company: any;
  smokingStatus?: number;
}
