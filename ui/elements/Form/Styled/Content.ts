import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { intToPx } from '@make.org/utils/helpers/styled';
import { ParagraphStyle } from '../../ParagraphElements';

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

export const FakeFieldStyle = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding: 0 15px;
  border-radius: 30px;
  background-color: ${color.greyLighter};
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.hasError ? color.error : color.grey)};
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

export const InlineParagraphStyle = styled(ParagraphStyle)`
  display: inline;
`;

export const ExtraParagraphStyle = styled(InlineParagraphStyle)`
  margin-top: 15px;
`;

export const ExtraAltParagraphStyle = styled(InlineParagraphStyle)`
  margin-top: 10px;
`;

export const ConditionParagraphStyle = styled(InlineParagraphStyle)`
  margin-bottom: 15px;
  a {
    color: ${color.brandSecondary};
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
