import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { StartColumnStyle } from '@make.org/ui/elements/FlexElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { SvgClose } from '@make.org/ui/Svg/elements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const PanelOverlayStyle = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  transition: 0.5s ease-in opacity;
  border: none;
  &.expanded {
    opacity: 1;
  }
  &[aria-hidden='true'] {
    height: 0;
    visibility: hidden;
  }
`;

export const PanelCloseButtonStyle = styled.button`
  position: absolute;
  top: 25px;
  left: 50%;
  z-index: 15;
  opacity: 0;
  transition: 0.5s ease-in opacity;
  transform: translateX(-50%);
  background-color: transparent;
  border: none;
  &.expanded {
    opacity: 1;
  }
  &[aria-hidden='true'] {
    height: 0;
    visibility: hidden;
  }
  &.widget {
    top: ${spacings.s};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    top: 43px;
    &.widget {
      top: ${spacings.s};
    }
  }
`;

export const PanelCloseIconStyle = styled(SvgClose)`
  width: 14px;
  height: 14px;
  .tofill {
    fill: ${colors.Content.Interface.Light};
  }
`;

export const PanelInnerStyle = styled(StartColumnStyle)`
  align-items: center;
  position: absolute;
  bottom: -100%;
  left: 0;
  width: 100%;
  height: calc(100% - 65px);
  z-index: 15;
  background-color: #f2f4fc;
  transition: 0.5s ease-in bottom;
  overflow-y: auto;
  padding: ${spacings.l} ${spacings.m};
  border-radius: 8px 8px 0 0;
  &.widget {
    height: calc(100% - 36px);
    @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
      height: calc(100% - 36px);
    }
  }
  &.expanded {
    bottom: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    height: calc(100% - 100px);
    padding: ${spacings.xl} ${spacings.l};
  }
`;
export const PanelWrapperStyle = styled.div<{
  ref: any;
}>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  &.widget {
    position: absolute;
  }
  &[aria-hidden='true'] {
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
`;
