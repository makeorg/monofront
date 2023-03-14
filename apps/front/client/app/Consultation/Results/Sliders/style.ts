import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { colors } from '@make.org/designsystem/tokens/colors';
import { shadows } from '@make.org/designsystem/tokens/shadows';

export const ResultsSliderArrowsStyle = styled(UnstyledButtonStyle)`
  position: absolute;
  top: 50%;
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: ${typography.FontSize.Arrondissement};
  transform: translateY(-50%);
  z-index: 2;
  svg {
    fill: ${colors.Content.Interface.Dark};
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
  font-family: ${typography.FontFamily.Default};
  font-size: ${typography.FontSize.RueDeLappe};
  line-height: 1.5;
  letter-spacing: 0.12px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-top: 20px;
  }
`;

export const ResultsSliderStyle = styled.div<{
  isResultsPage: boolean;
}>`
  background-color: ${colors.Background.Interface.DarkSecondary};
  border-radius: ${intToPx(BorderRadius)};
  box-shadow: ${shadows.s10};
  &.results-page {
    box-shadow: none;
    margin-top: 10px;
    @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
      margin-top: ${props => (props.isResultsPage ? '0px' : '15px')};
    }
  }
`;
