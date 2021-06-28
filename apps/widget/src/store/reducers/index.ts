import {
  auth_state,
  auth_reducer,
  AuthState,
  AuthData,
  auth_actions,
} from './auth_reducer';

// types
export type GlobalState = AuthState;
export type ReducerData = AuthData;
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
export const reducers: ActionList = {
  ...auth_reducer,
};

export const ACTIONS = {
  ...auth_actions,
};

export const INITIAL_STATE: GlobalState = {
  ...auth_state,
};

export const reducer = ({ state, action }: ReducerOptions): GlobalState => {
  const { type, data } = action;
  const functionAction: SingleAction = reducers[type];
  return functionAction ? functionAction({ state, data }) : state;
};
