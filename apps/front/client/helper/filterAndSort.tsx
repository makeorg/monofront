import React from 'react';
import { TypeFilterAndSortValues } from '@make.org/types';
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

// handles filter and sort values updates
export const getUpdatedFilterAndSortValues = (
  currentFilterAndSortValues: TypeFilterAndSortValues,
  name: string,
  value?: string
): TypeFilterAndSortValues => {
  switch (name) {
    case SORT_RECENT:
      return {
        ...currentFilterAndSortValues,
        sort: 'RECENT',
        sortAlgorithm: undefined,
      };
    case SORT_POPULAR:
    case SORT_CONTROVERSY:
      return {
        ...currentFilterAndSortValues,
        sort: undefined,
        sortAlgorithm: value,
      };
    case 'isNotVoted':
      return {
        ...currentFilterAndSortValues,
        isNotVoted: !JSON.parse(value || 'false'),
      };
    case 'userType':
      return {
        ...currentFilterAndSortValues,
        userType:
          currentFilterAndSortValues.userType === 'ORGANISATION'
            ? undefined
            : value,
      };
    case 'keywords':
      return {
        ...currentFilterAndSortValues,
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
