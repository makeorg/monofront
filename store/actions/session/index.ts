import { Dispatch } from '@make.org/types';
import { SET_SESSION_ID } from '../../actionTypes';

export const updateSessionId =
  (sessionId: string) =>
  (dispatch: Dispatch): void => {
    dispatch({ type: SET_SESSION_ID, payload: { sessionId } });
  };

export const clearSessionId =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({ type: SET_SESSION_ID, payload: { sessionId: '' } });
  };
