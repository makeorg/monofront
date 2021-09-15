import TextareaAutosize from 'react-autosize-textarea';
import { Elements } from '@make.org/assets/vars/Elements';
import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { SvgExternalLinkPlain } from '../Svg/elements';
import { FlexElementStyle } from './FlexElements';
import { UnstyledButtonStyle } from './ButtonsElements';

const DataPolicyLinkStyle = `
display: inline-flex;
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

export const CheckboxWrapper = styled(FlexElementStyle)`
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

export const CheckboxLabelStyle = styled.label<{
  isBlack?: boolean;
  noFontSizeChange: boolean;
  isWidget?: boolean;
}>`
  display: inline-flex;
  color: ${props => (props.isBlack ? color.black : color.greyDark)};
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${props =>
    props.noFontSizeChange
      ? intToPx(typography.font.fontsize.XS.value)
      : intToPx(typography.font.fontsize.X2S.value)};
  a {
    color: ${props => (props.isWidget ? color.greyDark : color.brandSecondary)};
  }
  strong {
    font-family: ${MakeFonts.CircularStandardBold};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${props =>
      props.isWidget
        ? intToPx(typography.font.fontsize.X2S.value)
        : intToPx(typography.font.fontsize.XS.value)};
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
  border: 1px solid ${color.grey};
  margin: 4px 8px 0 0;
  z-index: 0;
  svg {
    fill: ${color.brandSecondary};
    position: absolute;
    bottom: 5%;
    left: 25%;
    z-index: 1;
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const StyledCheckbox = styled(FakeCheckboxInputStyle)<{
  checked: boolean | undefined;
}>`
  svg {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2px ${color.grey};
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
    fill: ${color.grey};
  }
`;

export const DataPolicyNewWindowLinkStyle = styled.a<{ isWidget?: boolean }>`
  ${DataPolicyLinkStyle};
  color: ${props => (props.isWidget ? color.greyDark : color.brandSecondary)};
  font-size: ${props =>
    props.isWidget
      ? intToPx(typography.font.fontsize.X2S.value)
      : intToPx(typography.font.fontsize.XS.value)};
  &:hover,
  &:focus {
    color: ${props => (props.isWidget ? color.greyDark : color.brandSecondary)};
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

export const FormLeftAlignStyle = styled.form`
  ${FormStyle};
  align-items: flex-start;
`;

export const FormCenterAlignStyle = styled.form`
  ${FormStyle};
  align-items: center;
`;

export const FormRequirementsStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  margin: 2.5px 0 15px;
  color: ${color.greyDark};
`;

export const FakeFieldStyle = styled.div<{ hasError: boolean }>`
  display: flex;
  position: relative;
  width: 100%;
  padding: 0 15px;
  border-radius: 30px;
  background-color: ${color.white};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => (props.hasError ? color.error : color.grey)};
  margin-bottom: 15px;
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
    padding-top: 15px;
    line-height: 20px;
    padding-bottom: 3px;
    & + label {
      font-size: ${intToPx(typography.font.fontsize.X2S.value)};
      line-height: 20px;
    }
  }
  > textarea:not(:empty),
  > textarea:focus {
    padding-bottom: 15px;
  }
  > input:required + label {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
    line-height: 38px;
  }
`;

export const FloatingLabelStyle = styled.label`
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 38px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 0;
  transition: 0.25s ease all;
  white-space: nowrap;
`;

export const FormErrorsContainerStyle = styled.div`
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: ${intToPx(Elements.BorderRadius)};
  background-color: ${color.brandSecondary};
  color: ${color.white};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
`;

export const FormErrorsIntroStyle = styled.p`
  font-family: ${MakeFonts.CircularStandardBold};
  margin: 0 0 10px;
`;

export const FormErrorsListItemStyle = styled.li`
  margin: 0 0 5px;
  label {
    color: ${color.white};
    font-family: ${MakeFonts.CircularStandardBold};
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
  font-family: ${MakeFonts.CircularStandardBold};
  text-decoration: underline;
  margin-left: 5px;
`;

export const InputIconStyle = styled.span`
  display: flex;
  color: ${color.brandSecondary};
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  margin-right: 5px;
  svg {
    fill: ${color.brandSecondary};
  }
`;

export const CenterInputIconStyle = styled(InputIconStyle)`
  align-items: center;
`;

export const TextAreaIconStyle = styled(InputIconStyle)`
  margin-top: 10px;
`;

export const BasicInputStyle = styled.input`
  border: none;
  background: transparent;
  background-color: transparent;
  width: 100%;
  font-family: ${MakeFonts.CircularStandardBold};
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 38px;
  padding: 0 5px;
`;

export const FormSuccessMessageStyle = styled.p`
  display: flex;
  align-content: center;
  margin-top: 10px;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
`;

export const FormSuccessSvgStyle = {
  display: 'inline-flex',
  fontSize: '16px',
  marginRight: '5px',
  fill: color.success,
};

export const BasicTextAreaStyle = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  background: transparent;
  background-color: transparent;
  font-family: ${MakeFonts.CircularStandardBold};
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  padding: 10px 5px;
  resize: none;
`;

export const TextAreaCounterStyle = styled.div`
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  line-height: 1;
  position: absolute;
  right: 5px;
  bottom: 5px;
`;
