import { ReducerAction } from '@make.org/types';
import { SET_EVENT_SOURCES } from './types';
import { DocumentSourceType } from '../../types';

export const setEventSources = (data: DocumentSourceType[]): ReducerAction => ({
  type: SET_EVENT_SOURCES,
  payload: data,
});
