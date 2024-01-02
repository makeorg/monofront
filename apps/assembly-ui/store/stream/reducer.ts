import { ReducerAction } from '@make.org/types';
import { StreamType } from '../../types';
import { SET_STREAM_STOP, SET_STREAM_SUBMITTED } from './types';

export const stream_reducer = (
  // eslint-disable-next-line default-param-last
  state: StreamType,
  action: ReducerAction
): StreamType => {
  switch (action.type) {
    case SET_STREAM_SUBMITTED: {
      return {
        ...state,
        isSubmitted: action.payload.isSubmitted,
      };
    }
    case SET_STREAM_STOP: {
      return {
        ...state,
        stopStreaming: action.payload.stopStreaming,
      };
    }

    default:
      return state;
  }
};
