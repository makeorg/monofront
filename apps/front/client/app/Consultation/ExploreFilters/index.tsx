import React from 'react';
import i18n from 'i18next';
import { SortComponent } from './Sort';
import { FiltersComponent } from './Filter';
import {
  FilterBlockStyle,
  FiltersWrapperStyle,
  FiltersTitleStyle,
  SvgArrowsGroup,
} from './style';

export const FilterAndSort: React.FC = () => (
  <FiltersWrapperStyle as="form">
    <FilterBlockStyle>
      <FiltersTitleStyle>
        <SvgArrowsGroup aria-hidden focusable="false" />
        {i18n.t('consultation.explore.sort_by')}
      </FiltersTitleStyle>
      <SortComponent />
    </FilterBlockStyle>
    <FiltersComponent />
  </FiltersWrapperStyle>
);
