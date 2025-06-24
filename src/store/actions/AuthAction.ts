import { requestMe } from '@app/services';
import { ActionParams, AuthActionsType, User } from '@app/store/type';
import { Dispatch } from 'react';

export const getMe = () => async (dispatch: Dispatch<ActionParams | any>) => {
  try {
    const currentUserData = await requestMe();
    dispatch({
      type: AuthActionsType.FETCH_ME_SUCCESS,
      payload: { userData: currentUserData?.data },
    });
    return;
  } catch (e) {
    dispatch({
      type: AuthActionsType.FETCH_ME_FAILED,
    });
  }
};

export const login = (
  isAuthenticated: boolean,
  user: User | null,
  token: string,
  expiresAt: number,
  refreshToken: string,
) => {
  return {
    type: AuthActionsType.LOGIN,
    payload: { isAuthenticated, user, token, expiresAt, refreshToken },
  };
};

export const loginFailed = (isAuthenticated: boolean, user: User | null, token: string | null) => {
  return {
    type: AuthActionsType.LOGIN_FAILED,
    payload: { isAuthenticated, user, token },
  };
};

export const refreshToken = (
  isAuthenticated: boolean,
  user: User | null,
  token: string,
  expiresAt: number,
  refreshToken: string,
) => {
  return {
    type: AuthActionsType.REFRESH_TOKEN,
    payload: { isAuthenticated, user, token, expiresAt, refreshToken },
  };
};

export const logout = () => {
  return {
    type: AuthActionsType.LOGOUT,
  };
};
