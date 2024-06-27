import { ReducerAction } from '@make.org/types';
import { FeedType } from '../../types';
import {
  ADD_FEED_ITEM,
  REMOVE_FEED_LAST_ITEM,
  START_STREAM,
  STOP_STREAM,
  UPDATE_ITEM_CHUNKS,
  UPDATE_ITEM_TEXT,
} from './types';

export const feed_reducer = (
  // eslint-disable-next-line default-param-last
  state: FeedType = { isStreaming: false, items: [] },
  action: ReducerAction
): FeedType => {
  switch (action.type) {
    case ADD_FEED_ITEM:
      return { ...state, items: [...state.items, { ...action.payload.item }] };
    case UPDATE_ITEM_CHUNKS: {
      const updatedState = state.items.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            chunks: action.payload.chunks,
          };
        }
        return item;
      });
      return { ...state, items: updatedState };
    }
    case UPDATE_ITEM_TEXT: {
      const updatedState = state.items.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            text: action.payload.text,
          };
        }
        return item;
      });
      return { ...state, items: updatedState };
    }
    case REMOVE_FEED_LAST_ITEM: {
      const updatedFeed = [...state.items];
      updatedFeed.shift();
      return { ...state, items: updatedFeed };
    }
    case START_STREAM: {
      return {
        ...state,
        isStreaming: true,
      };
    }
    case STOP_STREAM: {
      return {
        ...state,
        isStreaming: false,
      };
    }
    default:
      return state;
  }
};
