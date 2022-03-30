import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import {
  RedButtonStyle,
  GreyNoBackgroundButtonStyle,
  BlackNoBackgroundButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import {
  SvgPencil,
  SvgExternalLinkPlain,
  SvgArrowLeft,
  SvgBlueManOnBench,
  SvgBlueManWalking,
} from '@make.org/ui/Svg/elements';
import {
  SpaceBetweenColumnStyle,
  ColumnElementStyle,
  CenterColumnStyle,
  FlexElementStyle,
  CenterRowStyle,
} from '@make.org/ui/elements/FlexElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { ExtraParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { Image } from '@make.org/ui/components/Image';
import { AvatarStyle } from '@make.org/ui/components/Avatar/style';

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

export const ProposalFormWrapperStyle = styled(SpaceBetweenColumnStyle)<{
  isWidget?: boolean;
}>`
  width: 100%;
  height: 100%;
  padding: ${props => (props.isWidget ? '0px 15px 25px' : '0px 30px 25px')};
  max-width: 720px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin: ${props => (props.isWidget ? '0px' : '0 50px 50px 0px')};
    padding: ${props => (props.isWidget ? '0px 15px 25px' : '0px 0px 25px')};
  }
`;

export const ProposalFormSuccessWrapperStyle = styled(ProposalFormWrapperStyle)`
  margin: 0px;
`;

export const ProposalStepWrapperColumnStyle = styled.div<{
  isWidget: boolean;
}>`
  width: 100%;
  height: 100%;
  padding: ${props => (props.isWidget ? '0px 15px 25px' : '0px 30px 25px')};
  max-width: 720px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: ${props => (props.isWidget ? '0px 15px 25px' : '0px 0px 50px')};
  }
`;

export const ProposalStepTitleStyle = styled.h2`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  line-height: 1.5;
  text-transform: none;
  &.center {
    text-align: center;
  }
  &.with-margin-bottom {
    margin-bottom: 25px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
  }
`;

export const ProposalStepMandatoryStyle = styled.div`
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: 12px;
  margin-bottom: 15px;
  color: ${color.greyDark};
`;

export const ProposalStepLabelStyle = styled.div`
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  margin-bottom: 5px;
`;

export const ProposalStepLabelRedStyle = styled.span`
  color: ${color.brandSecondary};
`;
export const ProposalAltStepTitleStyle = styled(ProposalStepTitleStyle)<{
  isWidget?: boolean;
}>`
  width: 100%;
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  letter-spacing: 0.12px;
  margin-bottom: 10px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${props =>
      props.isWidget
        ? intToPx(typography.font.fontsize.S.value)
        : intToPx(typography.font.fontsize.XL.value)};
    text-align: ${props => (props.isWidget ? 'start' : 'center')};
  }
`;

/** Form */
export const ProposalFieldWrapperStyle = styled.div`
  position: relative;
  z-index: 0;
  margin-bottom: 30px;
`;

export const ProposalTextareaStyle = styled(TextareaAutosize)`
  width: 100%;
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1.5;
  padding: 20px 17px 30px;
  border-radius: 8px;
  border: 1px solid ${color.grey};
  resize: none;
  max-height: 141px;
  background-color: ${color.white};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.M.value)};
  }
`;

export const ProposalCharCountStyle = styled.span`
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.greyDark};
`;

export const ProposalExternalLinkStyle = styled.a`
  display: inline-flex;
  align-items: baseline;
  align-self: flex-start;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const ProposalExternalLinkIconStyle = styled(SvgExternalLinkPlain)`
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
  font-family: ${MakeFonts.CircularStandardBook};
  text-align: left;
  max-width: 470px;
  display: inline;
  width: 100%;
`;

export const ProposalBackButtonCenterStyle = styled(
  BlackNoBackgroundButtonStyle
)<{
  isWidget?: boolean;
}>`
  align-self: start;
  font-family: ${MakeFonts.CircularStandardBook};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    align-self: ${props => (props.isWidget ? 'start' : 'center')};
  }
`;

export const ProposalBackIconWrapperStyle = styled.span`
  display: inline-flex;
  padding: 3px 15px;
  border-radius: 20px;
  background-color: ${color.white};
  margin-right: 15px;
`;

export const ProposalBackIconStyle = styled(SvgArrowLeft)`
  width: 12px;
  height: 13px;
`;

export const ProposalAuthWrapperStyle = styled(ColumnElementStyle)`
  margin-top: 30px;
`;

export const ProposalAuthDisclaimerStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.greyDark};
  text-align: center;
  &.with-margin-top {
    margin-top: 20px;
  }
`;

export const ProposalAuthSeparatorStyle = styled.hr`
  width: 100%;
  max-width: 80px;
  border: 1px solid ${color.greyLighter};
  margin: 25px auto;
`;

export const ProposalAuthLoginStyle = styled(BlackNoBackgroundButtonStyle)`
  display: inline;
  align-self: center;
`;

export const ProposalAuthCancelStyle = styled(GreyNoBackgroundButtonStyle)`
  align-self: center;
`;

export const ProposalAuthInlineWrapperStyle = styled.div`
  font-family: ${MakeFonts.CircularStandardBook};
  justify-content: inline;
  margin-top: 90px;
  margin-bottom: 20px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-top: 0;
  }
`;

export const ProposalAuthLoginWrapperStyle = styled(
  ProposalAuthInlineWrapperStyle
)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
`;

export const ProposalAuthSocialLoginWrapperStyle = styled(CenterColumnStyle)`
  margin: 0 0 45px;
  width: 100%;
`;

export const ProposalSubmitForgotPasswordWrapperStyle = styled(
  ExtraParagraphStyle
)`
  font-family: ${MakeFonts.CircularStandardBook};
`;

export const ProposalButtonsWrapperStyle = styled(FlexElementStyle)`
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const ProposalCancelButtonStyle = styled(GreyNoBackgroundButtonStyle)`
  text-transform: uppercase;
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  margin-right: 20px;
`;

export const ProposalSubmitButtonsWidgetStyle = styled(FlexElementStyle)`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    flex-direction: row-reverse;
    height: fit-content;
  }
`;

export const DataPolicyWrapperStyle = styled.span`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.greyDark};
  margin-top: 30px;
  display: block;
  text-align: center;
`;

export const NewWindowIconStyle = styled(SvgExternalLinkPlain)`
  width: 12px;
  height: 12px;
  padding-left: 2px;
  .tofill {
    fill: ${color.brandSecondary};
  }
`;

export const DataPolicyNewWindowLinkStyle = styled.a`
  color: ${color.brandSecondary};
`;

export const BlueShapeImageStyle = styled(Image)`
  opacity: 0.4;
  position: absolute;
  z-index: -1;
  bottom: 0;
  left: 0;
`;

export const BlueManOnBench = styled(SvgBlueManOnBench)`
  padding-bottom: 40px;
  width: 248px;
  min-height: 237px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-bottom: 0px;
  }
`;

export const BlueManWalking = styled(SvgBlueManWalking)`
  padding-bottom: 30px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    position: absolute;
    bottom: 20%;
    padding-bottom: 0px;
    right: -15%;
  }
`;

export const ProposalImagesWrapperStyle = styled(CenterRowStyle)`
  position: relative;
  width: 100%;
  display: flex;
  flex: 1;
  align-items: flex-end;
`;

export const ProposalStepWrapperStyle = styled(FlexElementStyle)<{
  isAuthentication: boolean;
  isWidget: boolean;
}>`
  position: relative;
  align-items: center;
  flex-flow: column;
  padding-top: ${props => (props.isWidget ? '15px' : '30px')};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    align-items: ${props => (props.isAuthentication ? 'center' : 'start')};
    justify-content: space-between;
    flex-flow: row;
  }
`;

export const LoginWrapperStyle = styled(CenterColumnStyle)<{
  isWidget: boolean;
}>`
  padding-top: ${props => (props.isWidget ? '15px' : '30px')};
`;

export const ProposalSuccessWrapperStyle = styled(ColumnElementStyle)`
  font-family: ${MakeFonts.CircularStandardBook};
  margin-top: 30px;
  margin-bottom: 30px;
  max-width: 505px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-top: 60px;
  }
`;

export const ProposalSuccessTitle = styled.h2`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  line-height: 1.5;
  text-transform: none;
  text-align: left;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
    line-height: 39px;
    text-align: center;
  }
`;

export const ProposalSuccessTitleBlackStyle = styled(ProposalSuccessTitle)`
  display: inline;
  color: ${color.black};
`;

export const ProposalSuccessTitleGreenStyle = styled(ProposalSuccessTitle)`
  color: #507a1f;
`;

export const ProposalSuccessRedButtonStyle = styled(RedButtonStyle)`
  max-width: 167px;
  width: 100%;
  margin: auto;
  margin-top: 30px;
`;

export const ProposalSuccessTitleBlockStyle = styled.div`
  display: flex;
`;

export const ProposalSuccessParagraphWrapperStyle = styled.div`
  margin-top: 30px;
`;

export const ProposalSuccessParagraphStyle = styled.p`
  font-size: 14px;
  line-height: 21px;
  text-align: left;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    text-align: center;
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
    line-height: 24px;
  }
`;
export const ProposalSuccessParagraphActivateStyle = styled(
  ProposalSuccessParagraphStyle
)`
  font-family: ${MakeFonts.CircularStandardBold};
`;

export const ProposalSuccessParagraphLinkStyle = styled(
  ProposalSuccessParagraphStyle
)`
  font-family: ${MakeFonts.CircularStandardBook};
`;

export const ProposalSuccessContactStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.greyDark};
  margin-top: 20px;
  text-align: center;
`;

export const ProposalSuccessContactLinkStyle = styled.a`
  display: inline;
  text-decoration: underline;
  cursor: pointer;
  color: ${color.greyDark};
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
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
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
  color: ${color.greyDark};
  margin-bottom: 20px;
  margin-top: 10px;
`;
