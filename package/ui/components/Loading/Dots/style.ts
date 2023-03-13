import styled, { keyframes } from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { typography } from '@make.org/designsystem/tokens/typography';

const PendingAnimation = keyframes`
0%, 50% {
  transform: initial;
}
20% {
  transform: translateY(-5px);
}
`;

export const LoadingWrapperStyle = styled.div`
  display: flex;
  justify-content: space-between;
  justify-self: center;
  align-self: center;
  max-width: 100px;
  margin: 0 auto;
`;

export const DotStyle = styled.span<{ delay: number; duration: number }>`
  animation-delay: ${props => props.delay}s;
  animation-duration: ${props => props.duration}s;
  animation-name: ${PendingAnimation};
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  padding: 0 2px;
  font-size: ${typography.FontSize.Arrondissement};
  &.widget {
    font-size: ${typography.FontSize.RueDeLappe};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.GrandeCouronne};
    &.widget {
      font-size: ${typography.FontSize.RueDeLappe};
    }
  }
`;
