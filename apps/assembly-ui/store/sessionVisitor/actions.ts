import { ReducerAction } from '@make.org/types';
import { UPDATE_SESSION_VISITOR } from './types';

export const updateSessionVisitor = (data: {
  sessionId: string;
  visitorId: string;
}): ReducerAction => ({
  type: UPDATE_SESSION_VISITOR,
  payload: data,
});
