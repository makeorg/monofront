import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { typography } from '@make.org/designsystem/tokens/typography';
import {
  Breakpoints,
  Layouts,
  DefaultPadding,
} from '@make.org/assets/vars/Breakpoints';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { ColumnElementStyle, CenterColumnStyle } from './FlexElements';

export const ContainerWithPadding = `
  width: 100%;
  max-width: ${intToPx(Layouts.ContainerWithPadding)};
  padding-left: ${spacings.m};
  padding-right: ${spacings.m};
  margin-left: auto;
  margin-right: auto;
`;

export const AppWrapperStyle = styled(ColumnElementStyle)`
  position: relative;
  min-height: 100vh;
  background-color: ${colors.Background.Interface.DarkSecondary};
  &.white {
    background-color: ${colors.Background.Interface.Lighter};
  }
`;

export const AppMainContentStyle = styled.main`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  &[aria-hidden='true'],
  &[aria-hidden='true'] div,
  &[aria-hidden='true'] a,
  &[aria-hidden='true'] input,
  &[aria-hidden='true'] button {
    visibility: hidden;
    opacity: 1;
  }
`;

export const PageWrapperStyle = styled(CenterColumnStyle)`
  width: 100%;
  flex: 1 1 auto;
  padding: ${intToPx(DefaultPadding.Mobile)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: ${intToPx(DefaultPadding.Desktop)};
  }
`;

export const MiddlePageWrapperStyle = styled(PageWrapperStyle)`
  justify-content: center;
`;

export const PageContainerStyle = styled(CenterColumnStyle)`
  width: 100%;
  flex: 1 1 auto;
  max-width: ${intToPx(Layouts.ContainerWidth)};
  background-color: ${colors.Background.Interface.Lighter};
  border: 1px solid ${colors.Border.Interface.DarkSecondary};
  padding: ${intToPx(DefaultPadding.Mobile)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: ${intToPx(DefaultPadding.Desktop)};
  }
`;

export const SkipLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${typography.FontFamily.Condensed};
  text-transform: uppercase;
  border-radius: 20px;
  border: none;
  font-size: ${typography.FontSize.Arrondissement};
  padding: ${spacings.s} ${spacings.m} 7px ${spacings.m};
  text-decoration: none;
  position: absolute;
  top: -100%;
  left: ${intToPx(DefaultPadding.Mobile)};
  max-width: calc(100% - 15px);
  z-index: 4;
  color: ${colors.Content.Interface.Light};
  background-color: ${colors.Content.Make.Secondary};
  .tofill {
    fill: ${colors.Content.Interface.Light};
  }
  &:hover,
  &:focus {
    color: ${colors.Content.Interface.Light};
    text-decoration: none;
  }
  &:active,
  &:focus {
    top: ${intToPx(DefaultPadding.Mobile)};
  }
`;
