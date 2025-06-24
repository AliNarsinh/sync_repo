import { ActionParams, AuthActionsType, IAuthState, User } from '@app/store/type';

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null as User | null,
  token: null as string | null,
  expiresAt: 0,
  refreshToken: null as string | null,
};

// REDUCERS
// eslint-disable-next-line
export default (state = initialState, action: ActionParams) => {
  switch (action.type) {
    case AuthActionsType.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload?.user,
        token: action.payload?.token,
        expiresAt: action.payload?.expiresAt,
        refreshToken: action.payload?.refreshToken,
      };

    case AuthActionsType.LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        expiresAt: 0,
        refreshToken: null,
      };

    case AuthActionsType.REFRESH_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload?.user,
        token: action.payload?.token,
        expiresAt: action.payload?.expiresAt,
        refreshToken: action.payload?.refreshToken,
      };
    case AuthActionsType.FETCH_ME_SUCCESS:
      return {
        ...state,
        user: action.payload?.userData,
      };
    case AuthActionsType.LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
