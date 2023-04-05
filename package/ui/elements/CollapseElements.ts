import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { shadows } from '@make.org/designsystem/tokens/shadows';
import { SeparatorStyle } from './SeparatorsElements';
import { UnstyledButtonStyle } from './ButtonsElements';
import { MiddleColumnStyle } from './FlexElements';
import { BorderRadius } from './CardsElements';

export const CollapseWrapperStyle = styled(MiddleColumnStyle)<{
  noMargin: boolean;
}>`
  margin-top: ${spacings.m};
  margin-bottom: ${props => (props.noMargin ? '0' : `${spacings.m}`)};
  &:last-child {
    margin-bottom: 0;
  }
`;

export const TileWithCollapseWrapperStyle = styled(CollapseWrapperStyle)`
  background-color: ${colors.Background.Interface.Lighter};
  box-shadow: ${shadows.s10};
  padding: ${spacings.m};
  &.collapsed {
    padding: ${spacings.sm} ${spacings.m} 8px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    border-radius: ${intToPx(BorderRadius)};
  }
`;

export const CollapseTriggerStyle = styled(UnstyledButtonStyle)`
  font-family: ${typography.FontFamily.Condensed};
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: ${typography.FontSize.RueDeLappe};
  line-height: 15px;
  text-align: left;
  &:disabled {
    color: ${colors.Content.Interface.Dark};
    cursor: text;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
    line-height: 19px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.Arrondissement};
    line-height: 32px;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${typography.FontSize.Paris};
    line-height: 25px;
  }
`;

export const CollapseIconStyle = styled.span<{ iscollapsed: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${props => (props.iscollapsed ? `rotate(0)` : `rotate(90deg)`)};
  .tofill {
    fill: ${colors.Content.Make.Secondary};
  }
`;

export const CollapseContentStyle = styled.div<{
  iscollapsed: boolean;
  forcedexpand?: boolean;
}>`
  width: 100%;
  ${props =>
    props.iscollapsed ? `height: 0; visibility: hidden;` : `height: auto;`};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    ${props => (props.forcedexpand ? `height: auto; visibility: visible;` : '')}
  }
`;

export const CollapseSeparatorStyle = styled(SeparatorStyle)`
  margin: ${spacings.s} 0;
`;
