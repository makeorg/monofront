import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const MainResultsProposalsItemStyle = styled.li`
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-bottom: ${spacings.sm};
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const SearchSliderListStyle = styled(UnstyledListStyle)`
  padding: 0 ${spacings.m} ${spacings.xs};
  &.with-avatar {
    padding-top: 42px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 0 0 ${spacings.xs};
  }
`;

export const SearchSliderListItemStyle = styled.li`
  margin-right: ${spacings.sm};
  &:last-child {
    margin-right: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-right: ${spacings.l};
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const SearchResultsProposalItemStyle = styled.li`
  margin-bottom: ${spacings.sm};
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SearchMoreProposalsButtonStyle = styled(RedButtonStyle)`
  margin: ${spacings.m} auto 0;
`;
