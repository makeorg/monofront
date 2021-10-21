import { Reducer, ReducerAction, StateFilterAndSort } from '@make.org/types';
import { FILTER_AND_SORT_DEFAULT_VALUES } from '@make.org/utils/constants/filterAndSort';
import {
  FILTER_AND_SORT_UPDATE_STATE,
  FILTER_AND_SORT_RESET_STATE,
} from '../../actionTypes';

export const filter_and_sort_state = FILTER_AND_SORT_DEFAULT_VALUES;

export const filter_and_sort_reducer: Reducer = (
  state = filter_and_sort_state,
  action: ReducerAction
): StateFilterAndSort => {
  switch (action.type) {
    case FILTER_AND_SORT_UPDATE_STATE:
    case FILTER_AND_SORT_RESET_STATE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
