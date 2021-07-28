import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';

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

export const SearchResultsProposalListStyle = styled(UnstyledListStyle)`
  padding: 0 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0;
  }
`;

export const SearchResultsProposalItemStyle = styled.li`
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SearchMoreProposalsButtonStyle = styled(RedButtonStyle)`
  margin: 20px auto 0;
`;
