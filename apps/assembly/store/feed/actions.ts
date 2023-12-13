import { ReducerAction } from '@make.org/types';
import { FeedItemType } from '../../types';
import { ADD_FEED_ITEM, REMOVE_FEED_LAST_ITEM } from './types';

export const addFeedItem = (item: FeedItemType): ReducerAction => ({
  type: ADD_FEED_ITEM,
  payload: { item },
});

export const removeFeedLastItem = (): ReducerAction => ({
  type: REMOVE_FEED_LAST_ITEM,
});
