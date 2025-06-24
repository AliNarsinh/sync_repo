import { SkiniveActionsType, TopnItem } from '@app/store/type';

export const predictSkiniveDetail = (payload: TopnItem) => {
  return {
    type: SkiniveActionsType.SKINIVE_DETAIL,
    payload,
  };
};
