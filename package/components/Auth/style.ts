import styled from 'styled-components';
import { ThirdLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { SvgLegalConsent, SvgExternalLink } from '@make.org/ui/Svg/elements';
import { SmallSeparatorStyle } from '@make.org/ui/elements/SeparatorsElements';
import { FormCenterAlignStyle } from '@make.org/ui/elements/FormElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { typography } from 'athena-design-tokens';
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
import { TitleXXS } from '@make.org/designsystem/components/Titles';
import {
  BodyXSDefault,
  BodySDefault,
} from '@make.org/designsystem/components/Body';
import { colors } from '@make.org/designsystem/tokens/colors';

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
  color: ${colors.Content.Interface.DarkSecondary};
  text-decoration: underline;
`;

export const LegalSubmitStyle = styled(RedButtonStyle)`
  &:disabled {
    color: ${colors.Content.Interface.DarkSecondary};
    background-color: ${colors.Background.Interface.DarkSecondary};
  }
`;

const TermsOfUseLinkStyle = styled.a`
  display: inline;
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${colors.Content.Interface.DarkSecondary};
  text-transform: none;
  text-decoration: underline;
  align-items: center;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1.31;
`;

export const TermsOfUseLinkGreyStyle = styled(TermsOfUseLinkStyle)`
  color: ${colors.Content.Interface.DarkSecondary};
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
    fill: ${colors.Content.Make.Secondary};
  }
  &.grey .tofill {
    fill: ${colors.Content.Interface.DarkSecondary};
  }
  &.grey {
    fill: ${colors.Content.Interface.DarkSecondary};
    color: ${colors.Content.Interface.DarkSecondary};
  }
`;

export const RegisterEmailTitleStyle = styled(TitleXXS).attrs({ as: 'h1' })`
  text-transform: none;
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
    color: ${colors.Content.Make.Secondary};
  }
`;

export const PostCodeWrapperStyle = styled(BodyXSDefault).attrs({ as: 'span' })`
  color: ${colors.Content.Interface.DarkSecondary};
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
  color: ${colors.Content.Interface.DarkSecondary};
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
  color: ${colors.Content.Interface.DarkSecondary};
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
    color: ${colors.Content.Interface.Dark};
  }
  color: ${colors.Content.Make.Secondary};
  margin-bottom: 35px;
`;

export const RegisterPanelSuccessParagraphContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  gap: 30px;
`;

export const RegisterPanelSuccessParagraphStyle = styled(BodySDefault)`
  color: ${colors.Content.Interface.Dark};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;
