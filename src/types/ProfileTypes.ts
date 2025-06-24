import { GenderType, HeightUnit, SkinTypes, UserTypes, WeightUnit } from '@app/constants';

export interface IProfile {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  userType: UserTypes;
  company: string;
  age: number;
  gender: GenderType | string;
  height: number | null;
  heightUnit: HeightUnit | null | string;
  weight: number | null;
  weightUnit: WeightUnit | null | string;
  skinType: SkinTypes | null | string;
  birthYear: number | null;
  skinTone: string | null;
  createdAt: string;
  updatedAt: string;
  smokingStatus: number | null;
}
