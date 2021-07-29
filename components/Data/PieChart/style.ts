import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { ShadowColors } from 'Client/app/assets/vars/Colors';
import { FourthLevelTitleStyle } from 'Client/ui/Elements/TitleElements';
import { MakeFonts } from 'Client/app/assets/vars/Fonts';
import { intToPx } from 'Shared/helpers/styled';
import { Elements } from 'Client/app/assets/vars/Elements';

export const PieChartWrapperStyle = styled.div`
  width: 100%;
  padding: 20px;
`;

export const PieChartTitleStyle = styled(FourthLevelTitleStyle)`
  width: 100%;
  text-align: center;
  font-family: ${MakeFonts.CircularStandardBold};
  color: ${color.black};
  text-transform: none;
`;

export const PieChartCanvasStyle = styled.canvas`
  display: block;
  margin: 0 auto;
`;

export const PieChartLegendStyle = styled.p`
  background-color: ${color.white};
  padding: 20px;
  border-radius: ${intToPx(Elements.BorderRadius)};
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.greyDark};
`;
