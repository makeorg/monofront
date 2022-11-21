import { createGlobalStyle } from 'styled-components';
import { color } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { ShadowColors } from '../vars/Colors';
import { Layouts, DefaultPadding, Breakpoints } from '../vars/Breakpoints';

export const UIThemeStylesheet = createGlobalStyle`
  .red-link {
    color: ${color.brandSecondary};
    &:hover,
    &:focus {
      color: ${color.brandSecondary};
    }
  }

  /** Modal */
  .modal-overlay {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-flow: column;
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: ${ShadowColors.BlackZeroEightOpacity};
    padding: ${intToPx(DefaultPadding.Mobile)};
    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      padding: ${intToPx(DefaultPadding.Desktop)};
    }
    &.widget{
      position: absolute;
    }
  }

  .modal-dialog {
    position: relative;
    z-index: 2;
    align-self: center;
    max-width: ${intToPx(Layouts.ContainerWidth)};
    max-height: 100%;
    padding: ${intToPx(DefaultPadding.Mobile)};
    background-color: ${color.white};
    box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
    overflow-y: auto;
    border-radius: 8px;
    &.expiration {
      max-width: 350px;
    }
    &.widget {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      max-width: 100%;
      display: flex;
      justify-content: center;
      border-radius: 0;
    }
    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      padding: ${intToPx(DefaultPadding.Desktop)};
    }
  }
`;
