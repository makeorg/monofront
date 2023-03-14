import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { FourthLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { colors } from '@make.org/designsystem/tokens/colors';
import { shadows } from '@make.org/designsystem/tokens/shadows';

export const PieChartWrapperStyle = styled.div`
  width: 100%;
  padding: 20px;
`;

export const PieChartTitleStyle = styled(FourthLevelTitleStyle)`
  width: 100%;
  text-align: center;
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  color: ${colors.Content.Interface.Dark};
  text-transform: none;
`;

export const PieChartCanvasStyle = styled.canvas`
  display: block;
  margin: 0 auto;
`;

export const PieChartLegendStyle = styled.p`
  background-color: ${colors.Background.Interface.Lighter};
  padding: 20px;
  border-radius: ${intToPx(BorderRadius)};
  box-shadow: ${shadows.s10};
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
`;
