import {
  ReducerAction,
  TypeFiltersValues,
  TypeSortValues,
} from '@make.org/types';
import { FILTERS_DEFAULT_VALUES } from '@make.org/utils/constants/filterAndSort';
import { FILTERS_UPDATE, SORT_UPDATE, FILTERS_RESET } from '../../actionTypes';

export const updateFilters = (
  newFiltersValues: TypeFiltersValues
): ReducerAction => ({
  type: FILTERS_UPDATE,
  payload: newFiltersValues,
});

export const updateSort = (newSortValues: TypeSortValues): ReducerAction => ({
  type: SORT_UPDATE,
  payload: newSortValues,
});

export const resetFilters = (): ReducerAction => ({
  type: FILTERS_RESET,
  payload: FILTERS_DEFAULT_VALUES,
});
