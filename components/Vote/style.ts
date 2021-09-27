import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';

export const VoteContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 35px 0 50px;
  &.sequence {
    margin: 22px 0;
  }
  &.opinions {
    margin: 30px 0 10px;
  }
  &.placeholder {
    margin: 20px 0 10px;
  }
  &.widgetFirstVote {
    margin: 10px 0px 5px;
  }
  &.widget {
    margin-bottom: 5px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    min-width: 250px;
    margin: 30px 0 60px;
    &.opinions {
      margin: 30px 0 10px;
    }
    &.placeholder {
      margin: 20px 0 10px;
    }
  }
`;

export const VoteWrapperStyle = styled(UnstyledListStyle)<{
  isWidget?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: ${props => (props.isWidget ? '150px' : '175px')};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    max-width: ${props => (props.isWidget ? '150px' : '200px')};
  }
`;

export const VoteButtonWrapperStyle = styled.div`
  position: relative;
  z-index: 1;
`;
