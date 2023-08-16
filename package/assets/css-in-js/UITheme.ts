import { createGlobalStyle } from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { colors } from '@make.org/designsystem/tokens/colors';
import { shadows } from '@make.org/designsystem/tokens/shadows';
import { Layouts, DefaultPadding, Breakpoints } from '../vars/Breakpoints';

export const UIThemeStylesheet = createGlobalStyle`
  .red-link {
    color: ${colors.Content.Make.Secondary};
    &:hover,
    &:focus {
      color: ${colors.Content.Make.Secondary};
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
    background-color: rgba(0, 0, 0, 0.8);
    padding: ${intToPx(DefaultPadding.Mobile)};
    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      padding: ${intToPx(DefaultPadding.Desktop)};
    }
    &.widget {
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
    background-color: ${colors.Background.Interface.Lighter};
    box-shadow: ${shadows.s10};
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
