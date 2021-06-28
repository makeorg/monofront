import { ReducerAction } from './types';

// types
type isAuthState = {
  isAuth: boolean;
};
export type AuthData = {
  username?: string;
  token?: string;
};
export type AuthState = isAuthState & AuthData;

// state, actions and reducer
export const auth_state: AuthState = {
  isAuth: false,
  username: '',
  token: '',
};

export const auth_actions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export const auth_reducer = (
  state: AuthState,
  action: ReducerAction
): AuthState => {
  const { type, data = {} } = action;
  switch (type) {
    case auth_actions.LOGOUT: {
      const { username, token }: AuthData = data;
      return {
        ...state,
        isAuth: true,
        username,
        token,
      };
    }
    case auth_actions.LOGIN:
      return {
        ...state,
        isAuth: false,
        username: '',
        token: '',
      };
    default:
      return state;
  }
};
