import { ReducerAction } from '@make.org/types';
import { FeedItemType } from '../../types';
import { ADD_FEED_ITEM, REMOVE_FEED_LAST_ITEM } from './types';

export const feed_reducer = (
  // eslint-disable-next-line default-param-last
  state: FeedItemType[] = [],
  action: ReducerAction
): FeedItemType[] => {
  switch (action.type) {
    case ADD_FEED_ITEM:
      return [...state, { ...action.payload.item }];
    case REMOVE_FEED_LAST_ITEM: {
      const feed = [...state];
      feed.shift();
      return feed;
    }
    default:
      return state;
  }
};
