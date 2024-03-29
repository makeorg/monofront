import TextareaAutosize from 'react-autosize-textarea';
import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { shadows } from '@make.org/designsystem/tokens/shadows';
import { TextXSStyle } from '@make.org/designsystem/components/Typography/Text/style';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { BorderRadius } from './CardsElements';
import { SvgExternalLink, SvgSelectArrow } from '../Svg/elements';
import { FlexElementStyle } from './FlexElements';
import { UnstyledButtonStyle } from './ButtonsElements';

const DataPolicyLinkStyle = `
display: inline-flex;
font-family: ${typography.FontFamily.Default};
color: ${colors.Content.Interface.DarkSecondary};
text-transform: none;
text-decoration: underline;
align-items: center;
font-size: ${typography.FontSize.Arrondissement};
line-height: 1.31;
`;

export const CheckboxWrapper = styled(FlexElementStyle)`
  align-items: center;
  width: 100%;
  margin-bottom: ${spacings.sm};
`;

export const CheckboxLabelStyle = styled.label<{
  isBlack?: boolean;
  noFontSizeChange: boolean;
  isWidget?: boolean;
}>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: ${spacings.xs};
  color: ${props =>
    props.isBlack
      ? colors.Content.Interface.Dark
      : colors.Content.Interface.DarkSecondary};
  font-family: ${typography.FontFamily.Default};
  font-weight: normal;
  font-size: ${props =>
    props.noFontSizeChange
      ? typography.FontSize.Arrondissement
      : typography.FontSize.RueDeLappe};
  a {
    color: ${colors.Content.Interface.DarkSecondary};
  }
  strong {
    font-family: ${typography.FontFamily.Highlight};
    font-weight: bold;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${props =>
      props.isWidget
        ? typography.FontSize.RueDeLappe
        : typography.FontSize.Arrondissement};
  }
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;

  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const FakeCheckboxInputStyle = styled.div`
  display: inline-flex;
  position: relative;
  width: 14px;
  height: 14px;
  min-width: 14px;
  border: 1px solid ${colors.Border.Interface.DarkMain};
  margin: 4px 8px 0 0;
  z-index: 0;
  svg {
    fill: ${colors.Content.Make.Secondary};
    position: absolute;
    bottom: 5%;
    left: 25%;
    z-index: 1;
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const StyledCheckbox = styled(FakeCheckboxInputStyle)<{
  isChecked: boolean | undefined;
}>`
  svg {
    visibility: ${props => (props.isChecked ? 'visible' : 'hidden')};
  }
  ${HiddenCheckbox}:focus + & {
    box-shadow: ${shadows.s10};
  }
`;

export const StyledCheckboxRightMargin = styled(StyledCheckbox)`
  margin: 4px 8px 0 0;
`;

export const NewWindowIconStyle = styled(SvgExternalLink)`
  width: 15px;
  height: 10px;
  padding-left: 2px;
  &.grey {
    fill: ${colors.Content.Interface.DarkSecondary};
    color: ${colors.Content.Interface.DarkSecondary};
  }
`;
export const DataPolicyNewWindowLinkStyle = styled.a<{ isWidget?: boolean }>`
  ${DataPolicyLinkStyle};
  color: ${colors.Content.Interface.DarkSecondary};
  font-size: ${typography.FontSize.RueDeLappe};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${props =>
      props.isWidget
        ? typography.FontSize.RueDeLappe
        : typography.FontSize.Arrondissement};
  }
`;

const FormStyle = `
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
  &.hidden {
    visibility: hidden;
    display: none;
  }
`;

export const FormRightAlignStyle = styled.form`
  ${FormStyle};
  align-items: flex-end;
`;

export const FormLeftAlignStyle = styled.form`
  ${FormStyle};
  align-items: flex-start;
`;

export const FormLeftAlignHeightStyle = styled(FormLeftAlignStyle)`
  height: 100%;
  justify-content: flex-start;
`;

export const FormCenterAlignStyle = styled.form`
  ${FormStyle};
  align-items: center;
`;

export const FormRequirementsStyle = styled(TextXSStyle)`
  margin-bottom: ${spacings.m};
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const FormRequirementsLeftStyle = styled(TextXSStyle)`
  margin-bottom: ${spacings.m};
  color: ${colors.Content.Interface.DarkSecondary};
  align-self: flex-start;
`;

export const FakeFieldStyle = styled.div<{ hasError?: boolean }>`
  display: flex;
  position: relative;
  width: 100%;
  padding: 0 ${spacings.sm};
  border-radius: 30px;
  background-color: ${colors.Background.Interface.Lighter};
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.hasError
      ? colors.Border.Alert.Error
      : colors.Border.Interface.DarkMain};
  margin-bottom: ${spacings.sm};
  &:last-child {
    margin-bottom: 0;
  }
`;

export const MiddleFakeFieldStyle = styled(FakeFieldStyle)`
  align-items: center;
`;

export const FieldWrapperStyle = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  > input:focus,
  > input:invalid,
  > input:required:focus,
  > input:required:not([value='']),
  > input:not([value='']),
  > textarea:not(:empty),
  > textarea:focus {
    padding-top: ${spacings.sm};
    line-height: 20px;
    padding-bottom: 3px;
    & + label {
      font-size: ${typography.FontSize.RueDeLappe};
      line-height: 20px;
    }
  }
  > textarea:not(:empty),
  > textarea:focus {
    padding-bottom: ${spacings.sm};
  }
  > input:required + label {
    font-size: ${typography.FontSize.Arrondissement};
    line-height: 38px;
  }
`;

export const FloatingLabelStyle = styled.label<{ isWidget?: boolean }>`
  font-family: ${typography.FontFamily.Default};
  color: ${colors.Content.Interface.DarkSecondary};
  font-size: ${props =>
    props.isWidget ? '14px' : typography.FontSize.Arrondissement};
  line-height: 38px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: ${spacings.xs};
  top: 0;
  transition: 0.25s ease all;
  white-space: nowrap;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${props => props.isWidget && typography.FontSize.Arrondissement};
  }
`;

export const FormErrorsContainerStyle = styled.div`
  width: 100%;
  padding: ${spacings.sm};
  margin-bottom: ${spacings.s};
  border-radius: ${intToPx(BorderRadius)};
  background-color: ${colors.Content.Make.Secondary};
  color: ${colors.Content.Interface.Light};
  font-size: ${typography.FontSize.RueDeLappe};
`;

export const FormErrorsIntroStyle = styled.p`
  font-family: ${typography.FontFamily.Highlight};
  font-weight: bold;
  margin: 0 0 ${spacings.s};
`;

export const FormErrorsListItemStyle = styled.li`
  margin: 0 0 ${spacings.xs};
  label {
    color: ${colors.Content.Interface.Light};
    font-family: ${typography.FontFamily.Highlight};
    font-weight: bold;
    text-decoration: underline;
  }
  &:last-child {
    margin: 0;
  }
  &:before {
    content: '-  ';
  }
`;

export const CustomErrorTriggerStyle = styled(UnstyledButtonStyle)`
  display: inline-flex;
  font-family: ${typography.FontFamily.Highlight};
  font-weight: bold;
  text-decoration: underline;
  margin-left: ${spacings.xs};
`;

const InputIconStyle = styled.span`
  display: flex;
  color: ${colors.Content.Make.Secondary};
  font-size: ${typography.FontSize.Paris};
  margin-right: ${spacings.xs};
  svg {
    fill: ${colors.Content.Make.Secondary};
  }
`;

export const CenterInputIconStyle = styled(InputIconStyle)`
  align-items: center;
`;

export const TextAreaIconStyle = styled(InputIconStyle)`
  margin-top: ${spacings.s};
`;

export const BasicInputStyle = styled.input`
  border: none;
  background: transparent;
  background-color: transparent;
  width: 100%;
  font-family: ${typography.FontFamily.Default};
  color: ${colors.Content.Interface.Dark};
  font-size: ${typography.FontSize.Arrondissement};
  line-height: 38px;
  padding: 0 ${spacings.xs};
`;

export const BasicSelectStyle = styled.select`
  margin: ${spacings.s} 0px;
  border: none;
  background-color: transparent;
  background: transparent url(${SvgSelectArrow as never}) no-repeat 95% center;
  min-width: 100%;
  font-family: ${typography.FontFamily.Default};
  color: ${colors.Content.Interface.Dark};
  font-size: ${typography.FontSize.Arrondissement};
  line-height: 24px;
  padding: 0 ${spacings.xs};
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
`;

export const FormSuccessMessageStyle = styled.p`
  display: flex;
  align-content: center;
  margin-top: ${spacings.s};
  font-size: ${typography.FontSize.RueDeLappe};
`;

export const FormSuccessSvgStyle = {
  display: 'inline-flex',
  fontSize: '16px',
  marginRight: `${spacings.xs}`,
  fill: colors.Content.Alert.Positive,
};

export const BasicTextAreaStyle = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  background: transparent;
  background-color: transparent;
  font-family: ${typography.FontFamily.Highlight};
  font-weight: bold;
  color: ${colors.Content.Interface.DarkSecondary};
  font-size: ${typography.FontSize.Arrondissement};
  padding: ${spacings.s} ${spacings.xs};
  resize: none;
`;

export const TextAreaCounterStyle = styled(TextXSStyle).attrs({
  as: 'div',
})`
  color: ${colors.Content.Interface.DarkSecondary};
  position: absolute;
  right: ${spacings.xs};
  bottom: ${spacings.xs};
`;

export const PasswordRequirements = styled.div`
  align-self: flex-end;
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
  margin: ${spacings.sm} ${spacings.xs} 0 0;
`;

export const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  width: 100%;
  margin-bottom: ${spacings.sm};
`;
