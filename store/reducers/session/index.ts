import { ReducerAction, StateSession } from '@make.org/types';
import { SET_SESSION_ID } from '../../actionTypes';

export const session_state: StateSession = {
  sessionId: '',
};

export const session_reducer = (
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
