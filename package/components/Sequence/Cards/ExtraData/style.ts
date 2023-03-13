import {
  ActiveButtonStyle,
  BlackBorderButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { colors } from '@make.org/designsystem/tokens/colors';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { CenterRowStyle } from '@make.org/ui/elements/FlexElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { SvgFastForward } from '@make.org/ui/Svg/elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import SvgSelectArrow from '@make.org/ui/Svg/source/selectArrow.svg';
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
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  font-size: ${typography.FontSize.Arrondissement};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Paris};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.PetiteCouronne};
  }
`;

export const ExtraDataDescriptionStyle = styled(ParagraphStyle)`
  font-size: 14px;
  text-align: center;
  margin: 5px auto 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
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
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const SubmitButtonStyle = styled(ActiveButtonStyle)`
  font-size: 14px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const RadioAsButtonWrapperStyle = styled.div`
  display: flex;
  border-radius: 20px;
  border: 1px solid ${colors.Border.Interface.DarkMain};
  text-decoration: none;
  min-height: 31px;
  min-width: 72px;
  align-items: center;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    min-width: 97px;
  }
  &:hover {
    border: 1px solid ${colors.Border.Make.Primary};
  }
  &.selected {
    background-color: ${colors.Background.Make.Primary};
  }
  &.selected label {
    color: ${colors.Content.Interface.Light};
  }
`;

export const RadioAsButtonLabelStyle = styled.label`
  font-family: ${typography.FontFamily.Default};
  font-weight: normal;
  color: ${colors.Content.Interface.DarkSecondary};
  font-size: ${typography.FontSize.Arrondissement};
  width: 100%;
  text-align: center;
  &.widget {
    font-size: 14px;
    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      font-size: ${typography.FontSize.Arrondissement};
    }
  }
`;

export const SelectStyle = styled.select`
  width: 100%;
  max-width: ${intToPx(MAX_WIDTH)};
  border: 1px solid ${colors.Border.Interface.DarkMain};
  border-radius: 20px;
  padding: 8px 15px;
  font-size: ${typography.FontSize.Arrondissement};
  color: ${colors.Content.Interface.DarkSecondary};
  appearance: none;
  background: transparent url(${SvgSelectArrow as never}) no-repeat 95% center;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
`;

export const SkipIconStyle = styled(SvgFastForward)<SvgPropsType>`
  margin-right: 5px;
  width: 16px;
`;
