import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { StartColumnStyle } from '@make.org/ui/elements/FlexElements';
import { BackgroundColors, ShadowColors } from '@make.org/assets/vars/Colors';
import { intToPx } from '@make.org/utils/helpers/styled';
import { SvgClose } from '@make.org/ui/Svg/elements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';

export const PanelOverlayStyle = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
  background-color: ${ShadowColors.BlackZeroEightOpacity};
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
    top: 11px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    top: 43px;
    &.widget {
      top: 11px;
    }
  }
`;

export const PanelCloseIconStyle = styled(SvgClose)`
  width: 14px;
  height: 14px;
  .tofill {
    fill: ${color.white};
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
  background-color: ${BackgroundColors.LightGrey};
  transition: 0.5s ease-in bottom;
  overflow-y: auto;
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
