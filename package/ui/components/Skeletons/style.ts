import styled, { keyframes } from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { color } from 'athena-design-tokens';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import { SpaceBetweenRowStyle } from '../../elements/FlexElements';

export const SkeletonCardStyle = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  flex: 1;
  width: 100%;
  padding: 0 20px;
  background-color: ${color.white};
  border-radius: 8px;
  box-shadow: 0 2px 3px 0 ${ShadowColors.BlackZeroTwoOpacity};
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
  0% { background-color: ${color.greyLighter}; }
  75% { background-color: ${color.grey}; }
  100% { background-color: ${color.greyLighter}; }
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
    border: 3px solid ${color.white};
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
