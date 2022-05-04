import styled from 'styled-components';
import {
  SecondLevelTitleStyle,
  ThirdLevelTitleStyle,
} from '@make.org/ui/elements/TitleElements';
import {
  SvgLegalConsent,
  SvgExternalLinkPlain,
} from '@make.org/ui/Svg/elements';
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
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 470px;
  &.hidden {
    visibility: hidden;
    display: none;
  }
`;

export const AuthenticationTitleStyle = styled(SecondLevelTitleStyle)`
  padding: 0 25px;
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

export const TermsOfUseLinkStyle = styled.a`
  display: inline;
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.brandSecondary};
  text-transform: none;
  text-decoration: underline;
  align-items: center;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1.31;
  &:hover,
  &:focus {
    color: ${color.brandSecondary};
  }
`;

export const TermsOfUseLinkGreyStyle = styled(TermsOfUseLinkStyle)`
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const PanelTermsOfUseLinkStyle = styled(TermsOfUseLinkStyle)`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  &:hover,
  &:focus {
    color: ${color.greyDark};
  }
`;

export const NewWindowIconStyle = styled(SvgExternalLinkPlain)`
  width: 9px;
  height: 9px;
  padding-left: 2px;
  .tofill {
    fill: ${color.brandSecondary};
  }
  &.grey .tofill {
    fill: ${color.greyDark};
  }
`;

export const RegisterEmailTitleStyle = styled.h1`
  text-transform: none;
  margin: 30px 0px 5px;
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  font-family: ${MakeFonts.CircularStandardBold};
`;

export const LoginTitleWrapperStyle = styled(ThirdLevelTitleStyle)`
  margin-bottom: 5px;
  text-transform: none;
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  line-height: 1.5;
  letter-spacing: 0.12px;
  align-self: flex-start;
  &.panel {
    margin-top: 32px;
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
`;

export const GreyParagraphStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.greyDark};
  margin-top: 45px;
  display: flex;
  flex-flow: wrap;
  max-width: 80%;
  justify-content: center;
`;

export const PersonalDataGreyLinkStyle = styled.a`
  display: inline;
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.greyDark};
  text-transform: none;
  text-decoration: underline;
  align-items: center;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  &:hover,
  &:focus {
    color: ${color.greyDark};
  }
`;
