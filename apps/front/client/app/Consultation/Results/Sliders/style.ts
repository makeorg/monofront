import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import { Elements } from '@make.org/assets/vars/Elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';

export const ResultsSliderArrowsStyle = styled(UnstyledButtonStyle)`
  position: absolute;
  top: 50%;
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  transform: translateY(-50%);
  z-index: 2;
  svg {
    fill: ${color.black};
  }
  &.glider-prev {
    left: 5px;
  }
  &.glider-next {
    right: 5px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    &.glider-prev {
      left: 10px;
    }
    &.glider-next {
      right: 10px;
    }
  }
`;

export const ResultsSliderPagination = styled(ParagraphStyle)<{
  focusable: string;
}>`
  text-align: center;
  margin-top: 10px;
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  line-height: 1.5;
  letter-spacing: 0.12px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-top: 20px;
  }
`;

export const ResultsSliderStyle = styled.div<{
  isResultsPage: boolean;
}>`
  background-color: ${color.greyLighter};
  border-radius: ${intToPx(Elements.BorderRadius)};
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
  &.results-page {
    box-shadow: none;
    margin-top: 10px;
    @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
      margin-top: ${props => (props.isResultsPage ? '0px' : '15px')};
    }
  }
`;
