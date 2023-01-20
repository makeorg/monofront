import styled from 'styled-components';
import { ThirdLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { SvgLegalConsent, SvgExternalLink } from '@make.org/ui/Svg/elements';
import { SmallSeparatorStyle } from '@make.org/ui/elements/SeparatorsElements';
import { FormCenterAlignStyle } from '@make.org/ui/elements/FormElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { color, typography } from 'athena-design-tokens';
import {
  RedButtonStyle,
  UnstyledButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import {
  CenterColumnStyle,
  SpaceBetweenRowStyle,
} from '@make.org/ui/elements/FlexElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';

export const AuthenticationWrapperStyle = styled.section`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  max-width: 470px;
  &.hidden {
    visibility: hidden;
    display: none;
  }
`;

export const RegisterFormUtilsAlignementWrapperStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const SocialRegisterButtonsWrapperStyle = styled(CenterColumnStyle)`
  gap: 17px;
  width: 100%;
`;

export const LegalFormStyle = styled(FormCenterAlignStyle)`
  max-width: 475px;
  &.hidden {
    visibility: hidden;
    display: none;
  }
  &.panel {
    margin: 30px 0 30px;
  }
`;

export const LegalIconStyle = styled(SvgLegalConsent)`
  max-width: 100px;
  margin: 25px auto 30px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    max-width: 150px;
    margin: 25px auto 30px;
  }
`;

export const LegalParagraphStyle = styled(ParagraphStyle)`
  margin-top: 15px;
  text-align: center;
`;

export const LegalSeparatorStyle = styled(SmallSeparatorStyle)`
  margin: 30px auto;
`;

export const LegalCheckboxWrapperStyle = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

export const LegalButtonGroupStyle = styled(SpaceBetweenRowStyle)`
  width: 100%;
`;

export const LegalCancelStyle = styled(UnstyledButtonStyle)`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.greyDark};
  text-decoration: underline;
`;

export const LegalSubmitStyle = styled(RedButtonStyle)`
  &:disabled {
    color: ${color.greyDark};
    background-color: ${color.greyLighter};
  }
`;

const TermsOfUseLinkStyle = styled.a`
  display: inline;
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.greyDark};
  text-transform: none;
  text-decoration: underline;
  align-items: center;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1.31;
`;

export const TermsOfUseLinkGreyStyle = styled(TermsOfUseLinkStyle)`
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const NewWindowIconStyle = styled(SvgExternalLink)`
  width: 15px;
  height: 10px;
  padding-left: 2px;
  .tofill {
    fill: ${color.brandSecondary};
  }
  &.grey .tofill {
    fill: ${color.greyDark};
  }
  &.grey {
    fill: ${color.greyDark};
    color: ${color.greyDark};
  }
`;

export const RegisterEmailTitleStyle = styled.h1`
  text-transform: none;
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  line-height: 27px;
  margin-bottom: 5px;
`;

export const LoginTitleWrapperStyle = styled(ThirdLevelTitleStyle)`
  margin-bottom: 5px;
  text-transform: none;
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  line-height: 1.5;
  letter-spacing: 0.12px;
  align-self: flex-start;
`;

export const LoginTitleWrapperCenterStyle = styled(LoginTitleWrapperStyle)`
  margin: 0px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
    align-self: center;
  }
  &.red {
    color: ${color.brandSecondary};
  }
`;

export const PostCodeWrapperStyle = styled.span`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.greyDark};
  margin-bottom: 30px;
  margin-top: -10px;
`;

export const RegisterParagraphStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  margin-top: 15px;
  display: inline;
  align-self: center;
`;

export const GreyParagraphStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.greyDark};
  display: flex;
  flex-flow: wrap;
  max-width: 80%;
  justify-content: center;
  align-items: center;
  margin: 0;
  & svg {
    margin-left: 2px;
  }
`;

export const PersonalDataGreyLinkStyle = styled.a`
  display: inline;
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.greyDark};
  text-transform: none;
  text-decoration: underline;
  align-items: center;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
`;

export const RegisterPanelSuccessWrapperStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  height: 100%;
  max-width: 720px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    text-align: center;
  }
`;

export const RegisterPanelOptInWrapperStyle = styled(
  RegisterPanelSuccessWrapperStyle
)`
  text-align: left;
`;

export const RegisterPanelSubTitleWrapperStyle = styled(
  LoginTitleWrapperCenterStyle
)`
  &.dark {
    color: ${color.black};
  }
  color: ${color.brandSecondary};
  margin-bottom: 35px;
`;

export const RegisterPanelSuccessParagraphContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  gap: 30px;
`;

export const RegisterPanelSuccessParagraphStyle = styled.p`
  font-size: 14px;
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.black};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;
