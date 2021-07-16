import { typography, color } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { SvgFastForward } from '@make.org/ui/Svg/elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { SvgPropsType } from '@make.org/types';

const MAX_WIDTH = 275;

export const ExtraDataFormStyle = styled.form`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
`;

export const ExtraDataDescriptionStyle = styled(ParagraphStyle)`
  max-width: ${intToPx(MAX_WIDTH)};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  text-align: center;
`;

export const ExtraDataRadioGroupStyle = styled.div<{ className: string }>`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  width: 100%;
  max-width: ${intToPx(MAX_WIDTH)};
  margin: 15px 0 20px;
  &.three-columns {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 25px 0 35px;
  }
`;
export const SubmitWrapperStyle = styled(SpaceBetweenRowStyle)`
  width: 100%;
  max-width: 360px;
`;

export const RadioAsButtonWrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 20px;
  border: 1px solid ${color.grey};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  padding: 5px 10px;
  text-decoration: none;
  &.focused {
    outline-style: auto;
  }
  &.selected {
    background-color: ${color.brandPrimary};
  }
  &.selected label {
    color: ${color.white};
  }
`;

export const RadioAsButtonLabelStyle = styled.label`
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  width: 100%;
  text-align: center;
`;

export const SelectStyle = styled.select`
  width: 100%;
  max-width: ${intToPx(MAX_WIDTH)};
  border: 1px solid ${color.grey};
  border-radius: 20px;
  padding: 8px 15px;
  margin: 20px 0 80px;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.greyDark};
  appearance: none;
  background: transparent url(@make.org/ui/Svg/source/select-arrow.svg)
    no-repeat 95% center;
`;

export const SkipIconStyle = styled(SvgFastForward)<SvgPropsType>`
  margin-right: 5px;
  width: 16px;
`;
