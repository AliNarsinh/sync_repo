import { LANGS } from '@app/constants';
import { ActionParams, LanguageActionsType, ILanguageState } from '@app/store/type';

const initialState: ILanguageState = {
  language: LANGS.RUSSIAN,
  isCustomSet: false,
};

// REDUCERS
// eslint-disable-next-line
export default (state = initialState, action: ActionParams) => {
  switch (action.type) {
    case LanguageActionsType.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
        isCustomSet: true,
      };
    default:
      return state;
  }
};
