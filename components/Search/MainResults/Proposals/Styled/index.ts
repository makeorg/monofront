import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';

export const MainResultsProposalsItemStyle = styled.li`
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const SearchSliderListStyle = styled(UnstyledListStyle)`
  padding: 0 20px 5px;
  &.with-avatar {
    padding-top: 42px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 0 0 5px;
  }
`;

export const SearchSliderListItemStyle = styled.li`
  margin-right: 15px;
  &:last-child {
    margin-right: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-right: 30px;
    &:last-child {
      margin-right: 0;
    }
  }
`;
