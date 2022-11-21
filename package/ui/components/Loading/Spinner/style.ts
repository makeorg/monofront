import styled, { keyframes } from 'styled-components';
import { color } from 'athena-design-tokens';
import { MiddleColumnStyle } from '../../../elements/FlexElements';

export const SpinnerContainerStyle = styled(MiddleColumnStyle)`
  width: 100%;
  height: 100%;
`;

export const SpinnerWrapperStyle = styled.div`
  display: block;
  position: relative;
  width: 64px;
  height: 64px;
  overflow: hidden;
`;

const Spinning = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerFirstRingStyle = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid ${color.grey};
  border-radius: 50%;
  animation: ${Spinning} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${color.grey} transparent transparent transparent;
`;

export const SpinnerSecondRingStyle = styled(SpinnerFirstRingStyle)`
  animation-delay: -0.45s;
`;

export const SpinnerThirdRingStyle = styled(SpinnerFirstRingStyle)`
  animation-delay: -0.3s;
`;

export const SpinnerFourthRingStyle = styled(SpinnerFirstRingStyle)`
  animation-delay: -0.15s;
`;
