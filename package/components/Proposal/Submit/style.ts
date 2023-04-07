import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import {
  RedButtonStyle,
  BlackNoBackgroundButtonStyle,
  BlackBorderButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { BlackLinkStyle } from '@make.org/ui/elements/LinkElements';
import {
  SvgPencil,
  SvgExternalLink,
  SvgBlueManOnBench,
} from '@make.org/ui/Svg/elements';
import {
  ColumnElementStyle,
  CenterColumnStyle,
  FlexElementStyle,
} from '@make.org/ui/elements/FlexElements';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { AvatarStyle } from '@make.org/ui/components/Avatar/style';
import { TitleXXS } from '@make.org/designsystem/components/Titles';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const PanelTriggerStyle = styled(RedButtonStyle)`
  position: fixed;
  bottom: 0;
  width: 100%;
  border-radius: 0px;
  left: 0;
  z-index: 5;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    position: sticky;
    width: auto;
    align-self: flex-end;
    border-radius: 20px;
    bottom: 20px;
    margin: 40px 0;
  }
`;

export const TriggerIconStyle = styled(SvgPencil)`
  width: 14px;
  height: 14px;
  margin-right: 7px;
`;

export const ProposalFormWrapperStyle = styled.div<{
  isWidget?: boolean;
}>`
  width: 100%;
  height: 100%;
  max-width: 720px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const ProposalFormStyle = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ProposalFormSuccessWrapperStyle = styled(ProposalFormWrapperStyle)`
  margin: 0px;
`;

export const ProposalStepWrapperColumnStyle = styled.div<{
  isWidget: boolean;
}>`
  height: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
`;

export const ProposalStepTitleStyle = styled(TitleXXS).attrs({ as: 'h2' })`
  text-transform: none;
  &.center {
    text-align: center;
  }
  &.with-margin-bottom {
    margin-bottom: ${spacings.m};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.IleDeFrance};
  }
`;

export const ProposalStepLabelRedStyle = styled.span`
  color: ${colors.Content.Make.Secondary};
`;
export const ProposalAltStepTitleStyle = styled(ProposalStepTitleStyle)<{
  isWidget?: boolean;
}>`
  width: 100%;
  font-size: ${typography.FontSize.Paris};
  letter-spacing: 0.12px;
  margin-bottom: 30px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${props =>
      props.isWidget
        ? typography.FontSize.Paris
        : typography.FontSize.IleDeFrance};
    text-align: ${props => (props.isWidget ? 'start' : 'center')};
  }
`;

/** Form */
export const ProposalFieldWrapperStyle = styled.div`
  position: relative;
  z-index: 0;
  margin-bottom: 20px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 30px;
  }
`;

export const ProposalTextareaStyle = styled(TextareaAutosize)`
  width: 100%;
  font-family: ${typography.FontFamily.Default};
  font-size: ${typography.FontSize.Arrondissement};
  line-height: 1.5;
  padding: 20px 17px 30px;
  border-radius: 8px;
  border: 1px solid ${colors.Border.Interface.DarkMain};
  resize: none;
  max-height: 141px;
  background-color: ${colors.Background.Interface.Lighter};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.PetiteCouronne};
  }
`;

export const ProposalCharCountStyle = styled.span`
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const ProposalExternalLinkStyle = styled.a`
  display: inline-flex;
  align-items: baseline;
  align-self: flex-start;
  font-size: ${typography.FontSize.Arrondissement};
`;

export const ProposalExternalLinkIconStyle = styled(SvgExternalLink)`
  width: 10px;
  height: 10px;
  margin-left: 5px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    width: 12px;
    height: 12px;
  }
`;

/** Authentication */
export const ProposalBackButtonStyle = styled(BlackNoBackgroundButtonStyle)`
  font-family: ${typography.FontFamily.Default};
  width: 100%;
  text-align: left;
  display: inline;
  margin-bottom: 30px;
`;

export const ProposalBackButtonCenterStyle = styled(ProposalBackButtonStyle)<{
  isWidget?: boolean;
}>`
  text-align: center;
  align-self: center;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    text-align: ${props => (props.isWidget ? 'left' : 'center')};
  }
`;

export const ProposalAuthLoginStyle = styled(BlackNoBackgroundButtonStyle)`
  display: inline;
  align-self: center;
  color: ${colors.Content.Make.Secondary};
  font-size: ${typography.FontSize.Arrondissement};
`;

export const ProposalAuthInlineWrapperStyle = styled.div`
  font-family: ${typography.FontFamily.Default};
  justify-content: inline;
  margin-bottom: 20px;
  align-self: flex-start;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-top: 0;
  }
`;

export const ProposalAuthLoginWrapperStyle = styled(
  ProposalAuthInlineWrapperStyle
)`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 15px 0 0 0;
  align-self: center;
  font-size: ${typography.FontSize.Arrondissement};
`;

export const ProposalAuthSocialLoginWrapperStyle = styled(CenterColumnStyle)`
  width: 100%;
`;

export const ProposalButtonsWrapperStyle = styled(FlexElementStyle)`
  justify-content: flex-end;
  margin: auto auto 0px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin: 0 0 20px 0;
  }
`;

export const ProposalSubmitButtonsWidgetStyle = styled(FlexElementStyle)`
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    flex-direction: row-reverse;
    height: fit-content;
  }
`;

export const DataPolicyWrapperStyle = styled.span`
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
  display: flex;
  flex-flow: wrap;
  max-width: 80%;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 0px;
`;

export const NewWindowIconStyle = styled(SvgExternalLink)`
  width: 12px;
  height: 12px;
  padding-left: 2px;
`;

export const DataPolicyNewWindowLinkStyle = styled.a`
  display: inline;
  font-family: ${typography.FontFamily.Default};
  color: ${colors.Content.Interface.DarkSecondary};
  text-transform: none;
  text-decoration: underline;
  align-items: center;
  font-size: ${typography.FontSize.RueDeLappe};
`;

export const BlueManOnBench = styled(SvgBlueManOnBench)`
  padding-bottom: 40px;
  width: 248px;
  min-height: 237px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-bottom: 0px;
    margin-left: 170px;
  }
`;

export const ProposalStepWrapperStyle = styled(FlexElementStyle)<{
  isAuthentication: boolean;
  isWidget: boolean;
}>`
  position: relative;
  align-items: center;
  flex-flow: column;
  width: 100%;
  height: 100%;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    align-items: ${props => (props.isAuthentication ? 'center' : 'start')};
    justify-content: space-between;
    flex-flow: row;
    width: auto;
  }
`;

export const ProposalSuccessWrapperStyle = styled(ColumnElementStyle)`
  font-family: ${typography.FontFamily.Default};
  height: 100%;
  max-width: 505px;
`;

export const ProposalSuccessTitle = styled(TitleXXS).attrs({ as: 'h2' })`
  text-transform: none;
  text-align: left;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    text-align: center;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.IleDeFrance};
    line-height: 39px;
  }
`;

export const ProposalSuccessTitleBlackStyle = styled(
  ProposalSuccessTitle
).attrs({
  as: 'span',
})`
  display: inline;
  color: ${colors.Content.Interface.Dark};
`;

export const ProposalSuccessTitleStyle = styled(ProposalSuccessTitle)`
  color: ${colors.Content.Make.Secondary};
`;

export const ProposalSuccessRedButtonStyle = styled(RedButtonStyle)`
  max-width: 167px;
  width: 100%;
  margin: 30px auto 0px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin: 30px auto;
  }
`;

export const ProposalSuccessTransparentButtonstyle = styled(
  BlackBorderButtonStyle
)`
  max-width: 167px;
  width: 100%;
  margin: 30px auto 0px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin: 30px auto;
  }
`;

export const ProposalSuccessParagraphWrapperStyle = styled.div`
  margin-top: 30px;
`;

const ProposalSuccessParagraphStyle = styled.p`
  font-size: 14px;
  line-height: 21px;
  text-align: left;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    text-align: center;
    font-size: ${typography.FontSize.Arrondissement};
    line-height: 24px;
  }
`;
export const ProposalSuccessSpanStyle = styled.span`
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
`;

export const ProposalSuccessParagraphLinkStyle = styled(
  ProposalSuccessParagraphStyle
)`
  font-family: ${typography.FontFamily.Default};
`;

export const ProposalSuccessContactStyle = styled.p`
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
  margin-top: 20px;
  text-align: center;
`;

export const ProposalSuccessContactLinkStyle = styled.a`
  display: inline;
  text-decoration: underline;
  cursor: pointer;
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const ProposalSuccessCardStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
`;

export const ProposalSuccessProposalStyle = styled.p`
  text-align: center;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 20px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    line-height: 24px;
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const ProposalSuccessAvatarStyle = styled(AvatarStyle)`
  position: absolute;
  top: -17px;
  left: 50%;
  border: 3px solid rgb(255, 255, 255);
  border-radius: 50%;
  transform: translateX(-50%);
`;

export const ProposalSuccessNameStyle = styled.p`
  font-size: 14px;
  color: ${colors.Content.Interface.DarkSecondary};
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const ProposalSuccessButtonWrapperStyle = styled.div`
  margin: 15px 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-direction: row-reverse;
    margin: 0px 0px;
  }
`;

export const ProposalSuccessLinkStyle = styled(BlackLinkStyle)`
  margin: 30px auto;
`;

export const AnonymousButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.s};
  font-size: ${typography.FontSize.Bastille};
`;

export const AnonymousInfoTextStyle = styled.p`
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
  margin: ${spacings.s} 0 ${spacings.m} 0;
`;
