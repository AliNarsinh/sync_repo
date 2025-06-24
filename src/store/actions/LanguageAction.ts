import { LanguageActionsType } from '../type';

export const changeLanguage = (language: string) => {
  return {
    type: LanguageActionsType.CHANGE_LANGUAGE,
    payload: language,
  };
};
