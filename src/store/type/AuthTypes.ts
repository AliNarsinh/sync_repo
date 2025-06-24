import { User } from '.';

export enum AuthActionsType {
  LOGIN = 'LOGIN',
  LOGIN_FAILED = 'LOGIN_FAILED',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  LOGOUT = 'LOGOUT',
  FETCH_ME_SUCCESS = 'FETCH_ME_SUCCESS',
  FETCH_ME_FAILED = 'FETCH_ME_FAILED',
}

export interface IAuthState {
  isAuthenticated: false;
  user?: User | null;
  token?: string | null;
  expiresAt: number;
  refreshToken?: string | null;
}
