import { ReducerAction } from '@make.org/types';
import { ChunkType, FeedItemType } from '../../types';
import {
  ADD_FEED_ITEM,
  REMOVE_FEED_LAST_ITEM,
  START_STREAM,
  STOP_STREAM,
  UPDATE_ITEM_CHUNKS,
  UPDATE_ITEM_TEXT,
} from './types';

export const addFeedItem = (item: FeedItemType): ReducerAction => ({
  type: ADD_FEED_ITEM,
  payload: { item },
});

export const updateItemChunks = (
  id: string,
  chunks: ChunkType[]
): ReducerAction => ({
  type: UPDATE_ITEM_CHUNKS,
  payload: { id, chunks },
});

export const updateItemText = (id: string, text: string): ReducerAction => ({
  type: UPDATE_ITEM_TEXT,
  payload: { id, text },
});

export const removeFeedLastItem = (): ReducerAction => ({
  type: REMOVE_FEED_LAST_ITEM,
});

export const enableFeedStreaming = (): ReducerAction => ({
  type: START_STREAM,
  payload: {},
});

export const disableFeedStreaming = (): ReducerAction => ({
  type: STOP_STREAM,
  payload: {},
});
