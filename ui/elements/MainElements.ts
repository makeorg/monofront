import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { color } from 'athena-design-tokens';
import {
  Breakpoints,
  Layouts,
  DefaultPadding,
} from '@make.org/assets/vars/Breakpoints';
import {
  ColumnElementStyle,
  CenterColumnStyle,
} from './FlexElements';
import { LinkAsRedButtonStyle } from './ButtonsElements';

export const ContainerWithPadding = `
  width: 100%;
  max-width: ${intToPx(Layouts.ContainerWithPadding)};
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
`;

export const AppWrapperStyle = styled(ColumnElementStyle)`
  position: relative;
  min-height: 100vh;
  background-color: ${color.greyLighter};
  &.white {
    background-color: ${color.white};
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
  background-color: ${color.white};
  border: 1px solid ${color.greyLighter};
  padding: ${intToPx(DefaultPadding.Mobile)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: ${intToPx(DefaultPadding.Desktop)};
  }
`;

export const SkipLink = styled(LinkAsRedButtonStyle)`
  position: absolute;
  top: -100%;
  left: ${intToPx(DefaultPadding.Mobile)};
  max-width: calc(100% - 15px);
  z-index: 4;
  &:active,
  &:focus {
    top: ${intToPx(DefaultPadding.Mobile)};
  }
`;
