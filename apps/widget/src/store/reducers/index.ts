import { auth_state, auth_reducer, AuthState, AuthData } from './auth_reducer';

// types
export type GlobalState = AuthState;
export type ReducerData = AuthData | any;
export type ReducerAction = {
  type: string;
  data?: ReducerData;
};
export type ReducerOptions = {
  state: GlobalState;
  action: ReducerAction;
};
export type SingleActionOptions = {
  state: GlobalState;
  data?: ReducerData;
};
export type Reducer = (opts: ReducerOptions) => SingleAction;
export type SingleAction = (opts: SingleActionOptions) => GlobalState;
export type ActionList = {
  [s: string]: SingleAction;
};

// global reducers, actions and init state
export const ACTIONS: ActionList = {
  ...auth_reducer,
};

export const INITIAL_STATE: GlobalState = {
  ...auth_state,
};

export const reducer = ({ state, action }: ReducerOptions) => {
  const { type, data } = action;
  const functionAction: SingleAction = ACTIONS[type];
  return functionAction ? functionAction({ state, data }) : state;
};
