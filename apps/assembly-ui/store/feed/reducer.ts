import { ReducerAction } from '@make.org/types';
import { FeedItemType } from '../../types';
import {
  ADD_FEED_ITEM,
  REMOVE_FEED_LAST_ITEM,
  UPDATE_ITEM_CHUNKS,
  UPDATE_ITEM_TEXT,
} from './types';

export const feed_reducer = (
  // eslint-disable-next-line default-param-last
  state: FeedItemType[] = [],
  action: ReducerAction
): FeedItemType[] => {
  switch (action.type) {
    case ADD_FEED_ITEM:
      return [...state, { ...action.payload.item }];
    case UPDATE_ITEM_CHUNKS: {
      const updatedState = state.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            chunks: action.payload.chunks,
          };
        }
        return item;
      });
      return updatedState;
    }
    case UPDATE_ITEM_TEXT: {
      const updatedState = state.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            text: action.payload.text,
          };
        }
        return item;
      });
      return updatedState;
    }
    case REMOVE_FEED_LAST_ITEM: {
      const feed = [...state];
      feed.shift();
      return feed;
    }
    default:
      return state;
  }
};
