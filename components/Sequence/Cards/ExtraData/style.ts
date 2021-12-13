import {
  ActiveButtonStyle,
  BlackBorderButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
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
import { SequenceIntroParagraphStyle } from '../style';

const MAX_WIDTH = 275;

export const ExtraDataFormStyle = styled.form`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const ExtraDataTitleStyle = styled(SequenceIntroParagraphStyle)`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.M.value)};
  }
`;

export const ExtraDataDescriptionStyle = styled(ParagraphStyle)`
  font-size: 14px;
  text-align: center;
  margin: 5px auto 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
    margin-bottom: 30px;
  }
`;

export const ExtraDataRadioGroupStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-gap: 10px 5px;
  max-width: ${intToPx(MAX_WIDTH)};
  &.three-columns {
    @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
      max-width: 425px;
    }
  }
  &.one-column > div {
    width: 100%;
  }
`;

export const SubmitWrapperStyle = styled(CenterRowStyle)`
  width: 100%;
  gap: 10px;
  margin-top: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-top: 30px;
  }
`;

export const SkipButtonStyle = styled(BlackBorderButtonStyle)`
  font-size: 14px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const SubmitButtonStyle = styled(ActiveButtonStyle)`
  font-size: 14px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const RadioAsButtonWrapperStyle = styled.div`
  display: flex;
  border-radius: 20px;
  border: 1px solid ${color.grey};
  text-decoration: none;
  min-height: 31px;
  min-width: 72px;
  align-items: center;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    min-width: 97px;
  }
  &:hover {
    border: 1px solid ${color.brandPrimary};
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
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.greyDark};
  appearance: none;
  background: transparent url(${SvgSelectArrow as never}) no-repeat 95% center;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
`;

export const SkipIconStyle = styled(SvgFastForward)<SvgPropsType>`
  margin-right: 5px;
  width: 16px;
`;
