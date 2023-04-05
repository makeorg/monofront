import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { UnstyledButtonStyle } from '../../elements/ButtonsElements';
import { ColumnElementStyle } from '../../elements/FlexElements';

export const CollapseWrapperStyle = styled(ColumnElementStyle)`
  padding: ${spacings.l} 0px;
  border-bottom: solid 1px ${colors.Border.Interface.DarkMain};
  &:last-child {
    padding-bottom: ${spacings.xs};
    border-bottom: none;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 35px 0px;
  }
`;

export const CollapseTriggerStyle = styled(UnstyledButtonStyle)`
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  display: inline-block;
  justify-content: start;
  width: 100%;
  font-size: ${typography.FontSize.Arrondissement};
  line-height: 1.5;
  letter-spacing: 0.14px;
  text-align: left;
  &:disabled {
    color: ${colors.Content.Interface.Dark};
    cursor: text;
  }
`;

export const CollapseIconStyle = styled.span<{ isCollapsed: boolean }>`
  display: inline-flex;
  padding-left: ${props => (props.isCollapsed ? `${spacings.s}` : `0px`)};
  padding-right: ${props => (props.isCollapsed ? `0px` : `${spacings.s}`)};
  transform: ${props => (props.isCollapsed ? `rotate(0)` : `rotate(180deg)`)};
  .tofill {
    fill: ${colors.Content.Interface.Dark};
  }
`;

export const CollapseContentStyle = styled.div<{ isCollapsed: boolean }>`
  width: 100%;
  ${props =>
    props.isCollapsed ? `height: 0; visibility: hidden;` : `height: auto;`};
`;
