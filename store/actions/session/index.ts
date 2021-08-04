import { ReducerAction } from '@make.org/types';
import { SET_SESSION_ID } from '../../actionTypes';

export const updateSessionId = (sessionId: string): ReducerAction => ({
  type: SET_SESSION_ID,
  payload: { sessionId },
});

export const clearSessionId = (): ReducerAction => ({
  type: SET_SESSION_ID,
  payload: { sessionId: '' },
});
