import { Reducer, ReducerAction } from './types';
import { auth_actions } from '../actions/auth_actions';

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

export const auth_reducer: Reducer = (
  state: isAuthState,
  action: ReducerAction
): AuthState => {
  const { type, data = {} } = action;
  const newState = { ...state };
  switch (type) {
    case auth_actions.LOGOUT: {
      const { username, token }: AuthData = data;
      return Object.assign(newState, {
        isAuth: true,
        username,
        token,
      });
    }
    case auth_actions.LOGIN:
      return Object.assign(newState, {
        isAuth: false,
        username: '',
        token: '',
      });
    default:
      return newState;
  }
};
