import styled, { keyframes } from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { shadows } from '@make.org/designsystem/tokens/shadows';
import { colors } from '@make.org/designsystem/tokens/colors';
import { SpaceBetweenRowStyle } from '../../elements/FlexElements';

export const SkeletonCardStyle = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  flex: 1;
  width: 100%;
  padding: 0 20px;
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: 8px;
  box-shadow: ${shadows.s10};
  max-height: 365px;
  margin: 20px 0 40px;
  &.widget {
    max-height: 235px;
    margin: 10px 0 10px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0 30px;
  }
`;

const SkeletonAnimation = keyframes`
  0% { background-color: ${colors.Background.Interface.DarkSecondary}; }
  75% { background-color: ${colors.Background.Interface.DarkMain}; }
  100% { background-color: ${colors.Background.Interface.DarkSecondary}; }
`;

export const SkeletonLineStyle = styled.div`
  display: flex;
  height: 20px;
  width: 100%;
  animation: ${SkeletonAnimation} 1.5s infinite;
  &.large {
    max-width: 225px;
  }
  &.medium {
    max-width: 155px;
  }
  &.small {
    max-width: 75px;
  }
  &.name {
    margin: 60px auto 20px;
  }
  &.proposal {
    margin-bottom: 7px;
  }
  &.title {
    align-self: flex-start;
    margin-top: 30px;
  }
  &.button {
    max-width: 50px;
    margin-right: 20px;
    margin-bottom: 40px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    &.large,
    &.title {
      max-width: 790px;
    }
    &.medium {
      max-width: 375px;
    }
  }
`;

export const SkeletonRoundStyle = styled.div`
  display: flex;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  animation: ${SkeletonAnimation} 1.5s infinite;
  &.avatar {
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border: 3px solid ${colors.Border.Interface.Lighter};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    height: 56px;
    width: 56px;
  }
`;

export const SkeletonVoteWrapperStyle = styled(SpaceBetweenRowStyle)`
  margin: 30px auto 50px;
  width: 100%;
  max-width: 175px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    max-width: 190px;
  }
`;
