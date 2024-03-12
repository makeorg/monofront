import { ReducerAction } from '@make.org/types';
import { UPDATE_SESSION_VISITOR } from './types';

export const visitor_reducer = (
  state: string,
  action: ReducerAction
): string => {
  switch (action.type) {
    case UPDATE_SESSION_VISITOR:
      return action.payload.visitorId ?? '';
    default:
      return state;
  }
};

export const session_reducer = (
  state: string,
  action: ReducerAction
): string => {
  switch (action.type) {
    case UPDATE_SESSION_VISITOR:
      return action.payload.sessionId ?? '';
    default:
      return state;
  }
};
