import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import {
  RedButtonStyle,
  GreyNoBackgroundButtonStyle,
  RedNoBackgroundButtonStyle,
  BlackNoBackgroundButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import {
  SvgPencil,
  SvgExternalLinkPlain,
  SvgArrowLeft,
  SvgCheckedLightBulb,
} from '@make.org/ui/Svg/elements';
import {
  SpaceBetweenColumnStyle,
  ColumnElementStyle,
  CenterColumnStyle,
  FlexElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import { ExtraParagraphStyle } from '@make.org/ui/elements/ParagraphElements';

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

export const ProposalFormWrapperStyle = styled(SpaceBetweenColumnStyle)`
  ${ContainerWithPadding};
  height: 100%;
  padding-top: 20px;
  padding-bottom: 25px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-top: 35px;
    padding-bottom: 50px;
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
    &.with-margin-bottom {
      margin-bottom: 35px;
    }
  }
`;

export const ProposalAltStepTitleStyle = styled(ProposalStepTitleStyle)`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  letter-spacing: 0.12px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
`;

/** Form */
export const ProposalFieldWrapperStyle = styled.div`
  position: relative;
  z-index: 0;
  margin-bottom: 20px;
`;

export const ProposalTextareaStyle = styled(TextareaAutosize)`
  width: 100%;
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1.5;
  padding: 20px 17px 30px;
  border: none;
  resize: none;
  max-height: 141px;
  background-color: ${color.greyLighter};
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
  text-decoration: none;
  align-self: center;
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
  margin-top: 60px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-top: 75px;
  }
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

export const ProposalAuthLoginStyle = styled(RedNoBackgroundButtonStyle)`
  display: inline;
  align-self: center;
`;

export const ProposalAuthCancelStyle = styled(GreyNoBackgroundButtonStyle)`
  align-self: center;
`;

export const ProposalSuccessWrapperStyle = styled(ColumnElementStyle)`
  font-family: ${MakeFonts.CircularStandardBook};
  max-width: 280px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    max-width: 392px;
  }
`;

export const ProposalSuccessRegisterStyle = styled(CenterColumnStyle)`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.greyDark};
  text-align: center;
  margin: 10px 0px 15px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 30px;
  }
`;

export const ProposalSuccessIconStyle = styled(SvgCheckedLightBulb)`
  margin: 10px auto 30px;
`;
export const ProposalSuccessTitleStyle = styled.h2`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  line-height: 1.5;
  text-transform: none;
  text-align: center;
`;

export const ProposalSuccessParagraphStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  text-align: center;
  margin: 10px auto 30px;
`;

export const ProposalSuccessRedButtonStyle = styled(RedButtonStyle)`
  max-width: 167px;
  width: 100%;
  margin: auto;
`;

export const ProposalAuthInlineWrapperStyle = styled.div`
  font-family: ${MakeFonts.CircularStandardBook};
  justify-content: inline;
`;

export const ProposalAuthLoginWrapperStyle = styled(
  ProposalAuthInlineWrapperStyle
)`
  align-items: center;
  margin: auto;
`;

export const ProposalAuthSocialLoginWrapperStyle = styled(CenterColumnStyle)`
  margin: 45px 0px;
  width: 100%;
`;

export const ProposalSubmitForgotPasswordWrapperStyle = styled(
  ExtraParagraphStyle
)`
  font-family: ${MakeFonts.CircularStandardBook};
`;

export const ProposalButtonsWrapperStyle = styled(FlexElementStyle)`
  justify-content: flex-end;
`;

export const ProposalCancelButtonStyle = styled(GreyNoBackgroundButtonStyle)`
  text-transform: uppercase;
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  margin-right: 20px;
`;

export const ProposalSubmitButtonsWidgetStyle = styled(FlexElementStyle)`
  flex-direction: column-reverse;
  height: 70%;
  justify-content: space-between;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    flex-direction: row;
    height: fit-content;
  }
`;
