import { Reducer, ReducerAction, StateFilterAndSort } from '@make.org/types';
import { FILTER_AND_SORT_DEFAULT_VALUES } from '@make.org/utils/constants/filterAndSort';
import { FILTERS_UPDATE, SORT_UPDATE, FILTERS_RESET } from '../../actionTypes';

export const filter_and_sort_state = FILTER_AND_SORT_DEFAULT_VALUES;

export const filter_and_sort_reducer: Reducer = (
  state = filter_and_sort_state,
  action: ReducerAction
): StateFilterAndSort => {
  switch (action.type) {
    case FILTERS_UPDATE:
    case SORT_UPDATE:
    case FILTERS_RESET:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
