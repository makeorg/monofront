import { ReducerAction } from '@make.org/types';
import { SET_STREAM_STOP, SET_STREAM_SUBMITTED } from './types';

export const setStopStreaming = (stopStreaming: boolean): ReducerAction => ({
  type: SET_STREAM_STOP,
  payload: { stopStreaming },
});

export const setStreamSubmitted = (isSubmitted: boolean): ReducerAction => ({
  type: SET_STREAM_SUBMITTED,
  payload: { isSubmitted },
});
