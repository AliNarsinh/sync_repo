import { SkiniveActionsType, SkiniveResponse } from '@app/store/type';

export const predictSkinive = (payload: SkiniveResponse) => {
  return {
    type: SkiniveActionsType.SKINIVE_PREDICT,
    payload,
  };
};
