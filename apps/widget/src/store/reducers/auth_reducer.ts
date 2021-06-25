import { ActionList, SingleActionOptions } from '.';

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

const auth_actions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export const auth_reducer: ActionList = {
  [auth_actions.LOGIN]: ({ state, data = {} }: SingleActionOptions) => {
    const { username, token }: AuthData = data;
    return {
      ...state,
      isAuth: true,
      username,
      token,
    };
  },
  [auth_actions.LOGOUT]: ({ state }: SingleActionOptions) => ({
    ...state,
    isAuth: false,
    username: '',
    token: '',
  }),
};
