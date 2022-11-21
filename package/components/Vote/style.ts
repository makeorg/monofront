import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';

export const VoteContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  &.opinions {
    margin-bottom: 10px;
  }
  &.placeholder {
    margin: 20px 0 10px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    min-width: 250px;
  }
`;

export const VoteWrapperStyle = styled(UnstyledListStyle)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 160px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    min-width: 184px;
  }
`;

export const VoteButtonWrapperStyle = styled.div`
  position: relative;
  z-index: 1;
`;
