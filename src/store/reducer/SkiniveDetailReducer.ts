import { ActionParams, SkiniveActionsType, TopnItem } from '@app/store/type';

const initialState: TopnItem = {
  atlas_page_link: '',
  class: '',
  class_raw: '',
  description: '',
  desease: '',
  prob: 0,
  risk: '',
  risk_level: '',
};

// eslint-disable-next-line
export default (state = initialState, action: ActionParams) => {
  switch (action.type) {
    case SkiniveActionsType.SKINIVE_DETAIL:
      return {
        ...state,
        atlas_page_link: action.payload?.atlas_page_link,
        class: action.payload?.class,
        class_raw: action.payload?.class_raw,
        description: action.payload?.description,
        desease: action.payload?.desease,
        prob: action.payload?.prob,
        risk: action.payload?.risk,
        risk_level: action.payload?.risk_level,
        image_url: action.payload?.image_url,
      };
    default:
      return state;
  }
};
