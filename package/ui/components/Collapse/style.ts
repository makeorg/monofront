import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { UnstyledButtonStyle } from '../../elements/ButtonsElements';
import { ColumnElementStyle } from '../../elements/FlexElements';

export const CollapseWrapperStyle = styled(ColumnElementStyle)`
  padding: 30px 0px;
  border-bottom: solid 1px ${color.grey};
  &:last-child {
    padding-bottom: 5px;
    border-bottom: none;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 35px 0px;
  }
`;

export const CollapseTriggerStyle = styled(UnstyledButtonStyle)`
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  display: inline-block;
  justify-content: start;
  width: 100%;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1.5;
  letter-spacing: 0.14px;
  text-align: left;
  &:disabled {
    color: ${color.black};
    cursor: text;
  }
`;

export const CollapseIconStyle = styled.span<{ isCollapsed: boolean }>`
  display: inline-flex;
  padding-left: ${props => (props.isCollapsed ? `10px` : `0px`)};
  padding-right: ${props => (props.isCollapsed ? `0px` : `10px`)};
  transform: ${props => (props.isCollapsed ? `rotate(0)` : `rotate(180deg)`)};
  .tofill {
    fill: ${color.black};
  }
`;

export const CollapseContentStyle = styled.div<{ isCollapsed: boolean }>`
  width: 100%;
  ${props =>
    props.isCollapsed ? `height: 0; visibility: hidden;` : `height: auto;`};
`;
