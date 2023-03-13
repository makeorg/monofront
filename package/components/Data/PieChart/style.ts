import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import { FourthLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Elements } from '@make.org/assets/vars/Elements';
import { colors } from '@make.org/designsystem/tokens/colors';

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
  border-radius: ${intToPx(Elements.BorderRadius)};
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
`;
