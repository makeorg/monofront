import { ReducerAction, TypeFilterAndSortValues } from '@make.org/types';
import { FILTER_AND_SORT_DEFAULT_VALUES } from '@make.org/utils/constants/filterAndSort';
import {
  FILTER_AND_SORT_UPDATE_STATE,
  FILTER_AND_SORT_RESET_STATE,
} from '../../actionTypes';

export const updateFilterAndSortState = (
  newFilterAndSortValues: TypeFilterAndSortValues
): ReducerAction => ({
  type: FILTER_AND_SORT_UPDATE_STATE,
  payload: newFilterAndSortValues,
});

export const resetFilterAndSortState = (): ReducerAction => ({
  type: FILTER_AND_SORT_RESET_STATE,
  payload: FILTER_AND_SORT_DEFAULT_VALUES,
});
