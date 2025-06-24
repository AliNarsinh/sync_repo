import { ActionParams } from '@app/store/type';
import { ProfileActionsType } from '../type/ProfileTypes';
import { IProfile } from '@app/types/ProfileTypes';

const initialState: Partial<IProfile> = {};

// REDUCERS
// eslint-disable-next-line
export default (state = initialState, action: ActionParams) => {
  switch (action.type) {
    case ProfileActionsType.SAVE_USER:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
