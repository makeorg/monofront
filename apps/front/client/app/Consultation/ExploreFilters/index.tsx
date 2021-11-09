import React from 'react';
import { SortComponent } from './Sort';
import { FiltersComponent } from './Filter';
import { FiltersWrapperStyle } from './style';

export const FilterAndSort: React.FC = () => (
  <FiltersWrapperStyle as="form">
    <SortComponent />
    <FiltersComponent />
  </FiltersWrapperStyle>
);
