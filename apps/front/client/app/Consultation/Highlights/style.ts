import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';

import {
  ColumnElementStyle,
  FlexElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { TitleSStyle } from '@make.org/designsystem/components/Typography/Titles/style';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { TitleStyleType } from '@make.org/designsystem/components/Typography/Titles';

export const HigthlightsWrapperStyle = styled.section`
  width: 100%;
  display: flex;
  flex-flow: column;
  background-color: ${colors.Background.Interface.Lighter};
  padding: 60px 0 45px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-flow: row;
  }
`;

export const HigthlightsColumnStyle = styled(ColumnElementStyle)`
  width: 100%;
  justify-content: space-between;
  &.right-spacing {
    padding-right: ${spacings.m};
  }
  &.left-spacing {
    padding-left: ${spacings.m};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    &.half {
      width: 50%;
    }
    &.right-spacing {
      padding-right: ${spacings.sm};
    }
    &.left-spacing {
      padding-left: ${spacings.sm};
    }
  }
`;

export const FiguresListStyle = styled.ul`
  display: flex;
  width: 100%;
  flex-flow: column;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    align-self: flex-end;
    flex-flow: row;
    max-width: 555px;
  }
`;

export const FiguresListItemStyle = styled.li`
  display: flex;
  flex-flow: column;
  flex: 1;
`;

export const HigthlightsTitleStyle = styled.span`
  font-size: ${typography.FontSize.Arrondissement};
  letter-spacing: 0.14px;
`;

export const FiguresValueStyle = styled(TitleSStyle).attrs({
  as: 'span',
  type: TitleStyleType.highlight,
})`
  display: block;
  letter-spacing: 0.5px;
  margin-bottom: ${spacings.m};
  &.mobile-extra-margin-bottom {
    margin-bottom: ${spacings.l};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.IleDeFrance};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 0px;
    &.mobile-extra-margin-bottom {
      margin-bottom: 0px;
    }
    &.padding-right {
      padding-right: ${spacings.xl};
    }
  }
`;

export const ImageWrapperStyle = styled.div`
  max-width: 555px;
  overflow: hidden;
  border-radius: ${intToPx(BorderRadius)};
`;

export const ProgressWrapperStyle = styled(FlexElementStyle)`
  width: 100%;
  justify-content: flex-end;
  padding: ${spacings.m};
  border-radius: 0 ${intToPx(BorderRadius)} ${intToPx(BorderRadius)} 0;
  background-color: ${colors.Background.Interface.DarkSecondary};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: ${spacings.l};
  }
`;

export const ProgressInnerStyle = styled(ColumnElementStyle)`
  width: 100%;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    max-width: 525px;
  }
`;

export const ProgressTitleStyle = styled(HigthlightsTitleStyle)`
  font-family: ${typography.FontFamily.Default};
  text-transform: none;
`;

export const VotesTargetStyle = styled.span`
  font-size: ${typography.FontSize.Arrondissement};
  letter-spacing: 0.3px;
  color: ${colors.Content.Interface.DarkSecondary};
  span {
    font-family: ${typography.FontFamily.Highlight};
    font-weight: bold;
    font-size: ${typography.FontSize.IleDeFrance};
    color: ${colors.Content.Interface.Dark};
    font-weigth: bolder;
  }
`;

export const ProgressBarContainerStyle = styled.div`
  position: relative;
  width: 100%;
  height: 25px;
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: 12.5px;
  border: 1px solid ${colors.Border.Interface.DarkMain};
  overflow: hidden;
  margin: ${spacings.s} 0 ${spacings.m};
`;

export const ProgressBarStyle = styled.div<{ percent: number }>`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  width: ${props => props.percent}%;
  height: 23px;
  background-color: ${props => props.theme.color};
  &:after {
    display: ${props => (props.percent === 0 ? 'none' : 'block')};
    content: '';
    position: absolute;
    left: 100%;
    top: 0;
    width: 0px;
    height: 0px;
    border-top: 11.5px solid ${colors.Border.Interface.Lighter};
    border-bottom: 11.5px solid ${colors.Border.Interface.Lighter};
    border-left: 11.5px solid ${props => props.theme.color};
  }
`;

export const ProgressParticipateStyle = styled(FlexElementStyle)`
  flex-flow: column;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    flex-flow: row;
  }
`;

export const ProgressDescriptionStyle = styled.p`
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
  margin-bottom: ${spacings.sm};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-right: 55px;
    margin-bottom: 0;
  }
`;
