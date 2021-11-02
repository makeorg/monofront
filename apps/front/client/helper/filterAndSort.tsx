import React from 'react';
import { TypeSortValues, TypeFiltersValues } from '@make.org/types';
import i18n from 'i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  SvgRecent,
  SvgControversial,
  SvgPopular,
} from '@make.org/front/client/app/Consultation/ExploreFilters/style';
import {
  SORT_POPULAR,
  SORT_RECENT,
  SORT_CONTROVERSY,
} from '@make.org/utils/constants/explore';

// handles check on current sort
export const checkCurrentSort = (
  itemName: string,
  currentSort: string
): boolean => {
  if (itemName === currentSort) {
    return true;
  }
  return false;
};

// handles sort values update
export const getUpdatedSortValues = (
  currentSortValues: TypeSortValues,
  name: string,
  value?: string
): TypeSortValues => {
  switch (name) {
    case SORT_RECENT:
      return {
        ...currentSortValues,
        sort: 'RECENT',
        sortAlgorithm: undefined,
      };
    case SORT_POPULAR:
    case SORT_CONTROVERSY:
      return {
        ...currentSortValues,
        sort: undefined,
        sortAlgorithm: value,
      };
    default:
      throw new Error(`Unexpected value : "${name}"`);
  }
};

// handles filters values update
export const getUpdatedFiltersValues = (
  currentFiltersValues: TypeFiltersValues,
  name: string,
  value?: string
): TypeFiltersValues => {
  switch (name) {
    case 'isNotVoted':
      return {
        ...currentFiltersValues,
        isNotVoted: !JSON.parse(value || 'false'),
      };
    case 'userType':
      return {
        ...currentFiltersValues,
        userType:
          currentFiltersValues.userType === 'ORGANISATION' ? undefined : value,
      };
    case 'keywords':
      return {
        ...currentFiltersValues,
        keywords: value,
      };
    default:
      throw new Error(`Unexpected value : "${name}"`);
  }
};

// gets translations for sort label
export const getSortLabel = (name: string): string | null => {
  switch (name) {
    case SORT_RECENT:
      return i18n.t('consultation.explore.recent');
    case SORT_POPULAR:
      return i18n.t('consultation.explore.popular');
    case SORT_CONTROVERSY:
      return i18n.t('consultation.explore.controversial');
    default:
      return null;
  }
};

// handles sort items for sortAlgorithm
export const SORT_ITEMS: Array<{
  name: string;
  icon: JSX.Element;
  value?: string;
}> = [
  {
    name: SORT_RECENT,
    icon: <SvgRecent />,
    value: undefined,
  },
  {
    name: SORT_POPULAR,
    icon: <SvgPopular />,
    value: SORT_POPULAR,
  },
  {
    name: SORT_CONTROVERSY,
    icon: <SvgControversial />,
    value: SORT_CONTROVERSY,
  },
];
