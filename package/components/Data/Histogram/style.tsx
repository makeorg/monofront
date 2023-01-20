import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { FourthLevelTitleStyle } from '@make.org/ui/elements/TitleElements';

export const HistogramWrapperStyle = styled.div`
  width: 100%;
  padding: 20px 20px 175px;
`;

export const HistogramTitleStyle = styled(FourthLevelTitleStyle)`
  width: 100%;
  text-align: center;
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  color: ${color.black};
  text-transform: none;
  margin-bottom: 30px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-bottom: 50px;
  }
`;

export const HistogramLegendStyle = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  margin-bottom: 10px;
`;

export const HistogramLegendColorsStyle = styled.span<{ background?: boolean }>`
  display: inline-flex;
  width: 20px;
  height: 12.5px;
  margin-left: 10px;
  background-color: ${props =>
    props.background ? color.grey : props.theme.color};
  ${props =>
    props.background
      ? `background: repeating-linear-gradient(
          45deg, rgb(175, 175,175), rgb(175, 175,175) 5px, rgba(0, 0, 0, 0.45) 5px, rgba(0, 0, 0, 0.45) 10px
        )`
      : ``};
`;

export const HistogramListStyle = styled(UnstyledListStyle)<{
  itemGap: number;
}>`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid ${color.black};
  padding: 20px ${props => props.itemGap}% 0;
`;

export const HistogramListItemStyle = styled.li<{
  itemWidth: number;
  itemGap: number;
}>`
  position: relative;
  display: flex;
  flex-flow: column;
  width: ${props => props.itemWidth}%;
  margin: 0 ${props => props.itemGap}%;
`;

export const HistogramBarContainerStyle = styled.div`
  display: flex;
  flex-flow: row;
  align-items: flex-end;
  height: 100%;
  flex: 1;
`;

export const HistogramBarStyle = styled.div<{
  barWidth: number;
  barHeight: number;
  background?: boolean;
}>`
  position: relative;
  width: ${props => props.barWidth}%;
  height: ${props => props.barHeight}%;
  background-color: ${props =>
    props.background ? props.background : props.theme.color};
  ${props =>
    props.background
      ? `background: repeating-linear-gradient(
          45deg, rgb(175, 175,175), rgb(175, 175,175) 5px, rgba(0, 0, 0, 0.45) 5px, rgba(0, 0, 0, 0.45) 10px
        )`
      : ``};
  transition: height 0.25s ease-in;
`;

const HistogramCommonLabelStyle = styled.p`
  font-size: 6px;
  font-family: ${MakeFonts.CircularStandardBook};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  }
`;

export const HistogramLegendLabelStyle = styled(HistogramCommonLabelStyle)`
  margin: 2.5px 0;
`;

const HistogramAbsoluteLabelStyle = styled(HistogramCommonLabelStyle)`
  position: absolute;
  z-index: 2;
`;

export const HistogramLabelStyle = styled(HistogramAbsoluteLabelStyle)`
  width: 175px;
  text-align: right;
  top: 100%;
  left: 50%;
  transform: translate(-75%, 87px) rotate(-60deg);
  white-space: nowrap;
`;

export const HistogramPercentStyle = styled(HistogramAbsoluteLabelStyle)`
  bottom: 102%;
  left: 50%;
  transform: translateX(-50%);
`;
