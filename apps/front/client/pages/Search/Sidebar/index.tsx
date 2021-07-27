import React from 'react';
import { SearchRegister } from '@make.org/components/Search/Register';
import { SearchPageSidebarStyle } from '../Styled';

export const SearchSidebar: React.FC = () => (
  <SearchPageSidebarStyle>
    <SearchRegister />
  </SearchPageSidebarStyle>
);
