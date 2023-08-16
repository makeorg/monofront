import styled from 'styled-components';
import { ThirdLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { SvgLegalConsent, SvgExternalLink } from '@make.org/ui/Svg/elements';
import { SmallSeparatorStyle } from '@make.org/ui/elements/SeparatorsElements';
import { FormCenterAlignStyle } from '@make.org/ui/elements/FormElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { typography } from '@make.org/designsystem/tokens/typography';
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
import { TitleXXSStyle } from '@make.org/designsystem/components/Typography/Titles/style';
import {
  TextXSStyle,
  TextSStyle,
} from '@make.org/designsystem/components/Typography/Text/style';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

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
    margin: ${spacings.l} 0 ${spacings.l};
  }
`;

export const LegalIconStyle = styled(SvgLegalConsent)`
  max-width: 100px;
  margin: 25px auto ${spacings.l};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    max-width: 150px;
    margin: 25px auto ${spacings.l};
  }
`;

export const LegalParagraphStyle = styled(ParagraphStyle)`
  margin-top: ${spacings.sm};
  text-align: center;
`;

export const LegalSeparatorStyle = styled(SmallSeparatorStyle)`
  margin: ${spacings.l} auto;
`;

export const LegalCheckboxWrapperStyle = styled.div`
  width: 100%;
  margin-bottom: ${spacings.s};
`;

export const LegalButtonGroupStyle = styled(SpaceBetweenRowStyle)`
  width: 100%;
`;

export const LegalCancelStyle = styled(UnstyledButtonStyle)`
  font-size: ${typography.FontSize.Arrondissement};
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
  font-family: ${typography.FontFamily.Default};
  color: ${colors.Content.Interface.DarkSecondary};
  text-transform: none;
  text-decoration: underline;
  align-items: center;
  font-size: ${typography.FontSize.Arrondissement};
  line-height: 1.31;
`;

export const TermsOfUseLinkGreyStyle = styled(TermsOfUseLinkStyle)`
  color: ${colors.Content.Interface.DarkSecondary};
  font-size: ${typography.FontSize.RueDeLappe};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
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

export const RegisterEmailTitleStyle = styled(TitleXXSStyle).attrs({
  as: 'h2',
})`
  text-transform: none;
  margin-bottom: ${spacings.xs};
`;

export const LoginTitleWrapperStyle = styled(ThirdLevelTitleStyle)`
  margin-bottom: ${spacings.xs};
  text-transform: none;
  font-family: ${typography.FontFamily.Highlight};
  font-weight: bold;
  font-size: ${typography.FontSize.Paris};
  line-height: 1.5;
  letter-spacing: 0.12px;
  align-self: flex-start;
`;

export const LoginTitleWrapperCenterStyle = styled(LoginTitleWrapperStyle)`
  margin: 0px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.IleDeFrance};
    align-self: center;
  }
  &.red {
    color: ${colors.Content.Make.Secondary};
  }
`;

export const PostCodeWrapperStyle = styled(TextXSStyle).attrs({
  as: 'span',
})`
  color: ${colors.Content.Interface.DarkSecondary};
  margin-bottom: ${spacings.l};
  margin-top: -${spacings.s};
`;

export const RegisterParagraphStyle = styled.p`
  font-size: ${typography.FontSize.Arrondissement};
  margin-top: ${spacings.sm};
  display: inline;
  align-self: center;
`;

export const GreyParagraphStyle = styled.p`
  font-size: ${typography.FontSize.RueDeLappe};
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
  font-family: ${typography.FontFamily.Default};
  color: ${colors.Content.Interface.DarkSecondary};
  text-transform: none;
  text-decoration: underline;
  align-items: center;
  font-size: ${typography.FontSize.RueDeLappe};
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
  margin: ${spacings.l} 0;
  gap: ${spacings.l};
`;

export const RegisterPanelSuccessParagraphStyle = styled(TextSStyle)`
  color: ${colors.Content.Interface.Dark};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;
