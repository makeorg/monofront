import { ReducerAction, StateSession } from '@make.org/types';
import { SET_SESSION_ID } from '../../actionTypes';

export const session_state: StateSession = {};

export const session_reducer = (
  // eslint-disable-next-line default-param-last
  state: StateSession = session_state,
  action: ReducerAction
): StateSession => {
  switch (action.type) {
    case SET_SESSION_ID:
      return {
        ...state,
        sessionId: action.payload.sessionId,
      };
    default:
      return state;
  }
};
