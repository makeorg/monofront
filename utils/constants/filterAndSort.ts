import {
  TypeFilterAndSortValues,
  TypeFiltersValues,
  TypeSortValues,
} from '@make.org/types';

export const FILTER_AND_SORT_DEFAULT_VALUES: TypeFilterAndSortValues = {
  keywords: undefined,
  sortAlgorithm: undefined,
  sort: 'RECENT',
  isNotVoted: false,
  userType: undefined,
};

export const FILTERS_DEFAULT_VALUES: TypeFiltersValues = {
  keywords: undefined,
  isNotVoted: false,
  userType: undefined,
};

export const SORT_DEFAULT_VALUES: TypeSortValues = {
  sortAlgorithm: undefined,
  sort: 'RECENT',
};
