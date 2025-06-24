import { IProfile } from '@app/types/ProfileTypes';
import { ProfileActionsType } from '../type/ProfileTypes';

export const saveProfile = (profilePayload: IProfile) => {
  return {
    type: ProfileActionsType.SAVE_USER,
    payload: profilePayload,
  };
};
