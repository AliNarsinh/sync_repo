export interface ILanguageState {
  language: string;
  isCustomSet: boolean;
}

export enum LanguageActionsType {
  CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
}
