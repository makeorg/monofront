import { typography, color } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { CenterRowStyle } from '@make.org/ui/elements/FlexElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { SvgFastForward } from '@make.org/ui/Svg/elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import SvgSelectArrow from '@make.org/ui/Svg/source/select-arrow.svg';
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
  &.widget {
    font-size: 14px;
    max-width: 100%;
    margin-top: 5px;
  }
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
  &.widget {
    grid-gap: 5px;
    margin: 10px 0;
  }
  &.widget.three-columns {
    div:last-of-type {
      grid-column-start: 2;
    }
    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      max-width: 425px;
      justify-content: center;
      gap: 10px;
      margin: 30px 0;
      &.widget > div {
        width: 95px;
      }
    }
  }
`;
export const SubmitWrapperStyle = styled(CenterRowStyle)`
  width: 100%;
  max-width: 360px;
  gap: 10px;
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
  &:hover {
    border: 1px solid ${color.brandPrimary};
  }
  &.selected {
    background-color: ${color.brandPrimary};
  }
  &.selected label {
    color: ${color.white};
  }
  &.widget {
    padding: 2px 10px;
  }
`;

export const RadioAsButtonLabelStyle = styled.label`
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  width: 100%;
  text-align: center;

  &.widget {
    font-size: 14px;
    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      font-size: ${intToPx(typography.font.fontsize.XS.value)};
    }
  }
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
  background: transparent url(${SvgSelectArrow as never}) no-repeat 95% center;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  &.widget {
    padding: 8px 30px 8px 15px;
    margin: 30px 0;
  }
`;

export const SkipIconStyle = styled(SvgFastForward)<SvgPropsType>`
  margin-right: 5px;
  width: 16px;
`;
