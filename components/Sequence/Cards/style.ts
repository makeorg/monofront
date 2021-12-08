import styled, { keyframes } from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { color, typography } from 'athena-design-tokens';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import { intToPx } from '@make.org/utils/helpers/styled';
import {
  CenterColumnStyle,
  SpaceBetweenRowStyle,
} from '@make.org/ui/elements/FlexElements';
import {
  BlackBorderButtonStyle,
  GreyButtonStyle,
  RedButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { SeparatorStyle } from '@make.org/ui/elements/SeparatorsElements';

export const SequenceCardStyle = styled.section`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  padding: 0 15px;
  background-color: ${color.white};
  border-radius: 8px;
  box-shadow: 0 2px 3px 0 ${ShadowColors.BlackZeroTwoOpacity};
  margin: 20px auto 40px;
  min-height: 315px;
  &.widget {
    margin: 20px;
    padding: 15px;
    max-height: 334px;
    min-height: 334px;
  }
  &.center {
    justify-content: center;
  }
  &.no-proposal {
    justify-content: center;
    padding: 60px 20px;
    margin: 20px auto 0px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    max-height: 365px;
    min-height: 365px;
    padding: 0 30px;
    margin-top: 30px;
    &.widget {
      margin-top: 20px;
    }
    &.no-proposal {
      padding: 70px 30px 40px;
    }
  }
`;

export const SequenceIntroButtonStyle = styled(RedButtonStyle)`
  margin-top: 15px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-top: 30px;
  }
`;

const SequenceTitleStyle = styled.div`
  font-family: ${MakeFonts.CircularStandardBold};
  text-align: center;
`;

export const SequenceMainTitleStyle = styled(SequenceTitleStyle)`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  letter-spacing: 0.12px;
  margin-bottom: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.M.value)};
    &.widget {
      font-size: ${intToPx(typography.font.fontsize.S.value)};
    }
  }
`;

export const FinalCardWrapperStyle = styled(CenterColumnStyle)`
  margin: auto;
`;

export const SequenceAltTitleStyle = styled(SequenceTitleStyle)`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  margin-bottom: 10px;
  line-height: 1.5;
  letter-spacing: 0.12px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
`;

export const SequenceWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 1;
`;

export const PushProposalWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: auto;
`;
export const SequenceIntroParagraphStyle = styled.div<{ isWidget?: boolean }>`
  width: 100%;
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1.5;
  letter-spacing: 0.14px;
  text-align: center;
  &.with-margin-bottom {
    margin-bottom: 15px;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.M.value)};
    &.with-margin-bottom {
      margin-bottom: 30px;
    }
  }
`;

export const SequenceProposalStyle = styled.blockquote`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  font-family: ${MakeFonts.CircularStandardBook};
  text-align: center;
  line-height: 1.64;
  letter-spacing: 0.11px;
  min-height: 82px;
  &.widget {
    font-size: 14px;
    min-height: 0px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.M.value)};
    line-height: 1.5;
    letter-spacing: 0.12px;
    min-height: 60px;
    display: flex;
    align-items: center;
    max-width: 770px;
    &.widget {
      font-size: ${intToPx(typography.font.fontsize.XS.value)};
      align-items: flex-start;
      min-height: 0px;
    }
  }
`;
export const SequenceNextCardButtonStyle = styled(RedButtonStyle)`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  white-space: nowrap;
  &.widget {
    bottom: 4px;
    font-size: 14px;
  }
`;

export const SequencePushProposalButtonStyle = styled(RedButtonStyle)`
  margin: 0 0 10px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: auto;
    margin: 0 10px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    &.widget {
      font-size: ${intToPx(typography.font.fontsize.XS.value)};
    }
  }
`;

export const SequencePushProposalNextButtonStyle = styled(
  BlackBorderButtonStyle
)`
  margin-top: 15px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    &.widget {
      font-size: ${intToPx(typography.font.fontsize.XS.value)};
    }
  }
`;

export const SequenceSignUpNextButtonStyle = styled(GreyButtonStyle)`
  margin-top: 20px;
`;

export const SequenceParagraphStyle = styled(CenterColumnStyle)`
  width: 100%;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1.57;
  letter-spacing: 0.12px;
  text-align: center;
  margin-bottom: 20px;
  color: ${color.greyDark};
`;

const SequenceFadeInAnimation = keyframes`
  0% { background-color: ${color.greyLighter}; }
  75% { background-color: ${color.grey}; }
  100% { background-color: ${color.greyLighter}; }
`;

export const SequencePlaceholderLineStyle = styled.div<{ className?: string }>`
  display: flex;
  height: 20px;
  width: 100%;
  animation: ${SequenceFadeInAnimation} 1.5s infinite;
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

export const SequencePlaceholderRoundStyle = styled.div`
  display: flex;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  animation: ${SequenceFadeInAnimation} 1.5s infinite;
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

export const SequencePlaceholderVoteWrapperStyle = styled(SpaceBetweenRowStyle)`
  margin-top: 30px;
  width: 100%;
  max-width: 175px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    max-width: 190px;
  }
`;

export const SequenceSeparatorStyle = styled(SeparatorStyle)`
  max-width: 80px;
  margin: 10px auto 20px;
`;

export const FinalCardSeparatorStyle = styled(SeparatorStyle)`
  max-width: 80px;
  margin: 20px auto;
  border: solid 0.5px ${color.grey};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 30px auto;
  }
`;

export const FinalCardRegisterStyle = styled.div`
  color: ${color.greyDark};
`;

export const IntroProposalRedButtonStyle = styled(RedButtonStyle)`
  margin-top: 30px;
`;
