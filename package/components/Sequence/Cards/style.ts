import styled, { keyframes } from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import { SvgFastForward } from '@make.org/ui/Svg/elements';
import { shadows } from '@make.org/designsystem/tokens/shadows';
import {
  CenterColumnStyle,
  ColumnElementStyle,
  MiddleColumnStyle,
} from '@make.org/ui/elements/FlexElements';
import {
  BlackBorderButtonStyle,
  RedButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { SeparatorStyle } from '@make.org/ui/elements/SeparatorsElements';
import { SvgPropsType } from '@make.org/types';
import { BodyMDefault } from '@make.org/designsystem/components/Body';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const SequenceCardStyle = styled.section`
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  padding: 25px ${spacings.m} ${spacings.m};
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: 8px;
  box-shadow: ${shadows.s10};
  margin: ${spacings.l} auto;
  min-height: 350px;
  &.widget {
    min-height: 0;
    margin: 17px auto ${spacings.sm};
  }
  &.center {
    justify-content: center;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    padding: 40px ${spacings.m} ${spacings.m};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    min-height: 365px;
    max-height: 365px;
    margin-top: ${spacings.l};
    padding: 40px ${spacings.l} ${spacings.l};
  }
`;

export const SequenceIntroButtonStyle = styled(RedButtonStyle)`
  margin-top: ${spacings.sm};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-top: ${spacings.l};
  }
`;

const SequenceTitleStyle = styled.div`
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  text-align: center;
`;

export const SequenceMainTitleStyle = styled(SequenceTitleStyle)`
  font-size: ${typography.FontSize.Arrondissement};
  letter-spacing: 0.12px;
  margin-bottom: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.PetiteCouronne};
    &.widget {
      font-size: ${typography.FontSize.Paris};
    }
  }
`;

export const FinalCardWrapperStyle = styled(CenterColumnStyle)`
  margin: auto;
`;

export const SequenceAltTitleStyle = styled(SequenceTitleStyle)`
  font-size: ${typography.FontSize.Arrondissement};
  margin-bottom: ${spacings.s};
  line-height: 1.5;
  letter-spacing: 0.12px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Paris};
  }
`;

export const PushProposalWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: auto;
`;

export const SequenceIntroParagraphStyle = styled(BodyMDefault).attrs({
  as: 'div',
})`
  width: 100%;
  letter-spacing: 0.14px;
  text-align: center;
  &.with-margin-bottom {
    margin-bottom: ${spacings.sm};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Paris};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    &.with-margin-bottom {
      margin-bottom: ${spacings.l};
    }
  }
`;

export const SequenceProposalWrapperStyle = styled(ColumnElementStyle)`
  justify-content: space-between;
  align-items: center;
  flex: 1;
  width: 100%;
`;

export const SequenceProposalAndVoteWrapperStyle = styled(MiddleColumnStyle)`
  width: 100%;
`;

export const SequenceProposalStyle = styled.blockquote`
  font-family: ${typography.FontFamily.Default};
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.13px;
  margin-bottom: ${spacings.sm};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
    letter-spacing: 0.14px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.PetiteCouronne};
    letter-spacing: 0.12px;
    max-width: 760px;
  }
`;

export const SequenceNextWrapperStyle = styled(CenterColumnStyle)`
  width: 100%;
  min-height: 35px;
  justify-content: center;
`;

export const SequenceNextCardButtonStyle = styled(RedButtonStyle)`
  white-space: nowrap;
  font-size: 14px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const SequencePushProposalButtonStyle = styled(RedButtonStyle)`
  margin: 0 0 ${spacings.s};
  font-size: 14px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: auto;
    margin: 0 ${spacings.s};
  }
`;

export const SequencePushProposalNextButtonStyle = styled(
  BlackBorderButtonStyle
)`
  margin-top: ${spacings.sm};
  font-size: 14px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const SequenceParagraphStyle = styled(CenterColumnStyle)`
  width: 100%;
  font-size: ${typography.FontSize.Arrondissement};
  line-height: 1.57;
  letter-spacing: 0.12px;
  text-align: center;
  margin-bottom: ${spacings.m};
  color: ${colors.Content.Interface.DarkSecondary};
`;

const SequenceFadeInAnimation = keyframes`
  0% { background-color: ${colors.Background.Interface.DarkSecondary}; }
  75% { background-color: ${colors.Background.Interface.DarkMain}; }
  100% { background-color: ${colors.Background.Interface.DarkSecondary}; }
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
    margin: 60px auto ${spacings.m};
  }
  &.proposal {
    margin-bottom: 7px;
  }
  &.title {
    align-self: flex-start;
    margin-top: ${spacings.l};
  }
  &.button {
    max-width: 50px;
    margin-right: ${spacings.m};
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

export const FinalCardSeparatorStyle = styled(SeparatorStyle)`
  max-width: 80px;
  margin: ${spacings.m} auto;
  border: solid 0.5px ${colors.Border.Interface.DarkMain};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: ${spacings.l} auto;
  }
`;

export const FinalCardRegisterStyle = styled.div`
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const IntroProposalRedButtonStyle = styled(RedButtonStyle)`
  margin-top: ${spacings.l};
`;

export const SkipIconStyle = styled(SvgFastForward)<SvgPropsType>`
  margin-right: ${spacings.xs};
  width: 16px;
  fill: white;
`;

export const ButtonsContainerStyle = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  gap: ${spacings.m};
  align-items: center;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-direction: row;
  }
`;
