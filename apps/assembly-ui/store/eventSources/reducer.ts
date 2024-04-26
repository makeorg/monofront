import { ReducerAction } from '@make.org/types';
import { SET_EVENT_SOURCES } from './types';
import { DocumentSourceType } from '../../types';

export const event_sources_reducer = (
  state: DocumentSourceType[],
  action: ReducerAction
): DocumentSourceType[] => {
  switch (action.type) {
    case SET_EVENT_SOURCES:
      return action.payload;
    default:
      return state;
  }
};
