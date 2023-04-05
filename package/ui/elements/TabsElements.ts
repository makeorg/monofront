import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import {
  Layouts,
  DefaultPadding,
  Breakpoints,
} from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const TabNavStyle = styled.nav`
  position: relative;
  z-index: 0;
  width: 100%;
  margin-bottom: ${intToPx(DefaultPadding.Mobile)};
  overflow: auto hidden;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${colors.Background.Interface.DarkMain};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-bottom: ${intToPx(DefaultPadding.Desktop)};
    &::after {
      display: none;
    }
  }
`;

const TabListStyle = styled.ul`
  display: flex;
  width: 100%;
  max-width: ${intToPx(Layouts.ContainerWidth)};
  margin: 0 auto;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 0;
`;

const TabStyle = styled.li<{ isSelected?: boolean }>`
  position: relative;
  z-index: ${props => (props.isSelected ? 1 : 0)};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  min-width: 150px;
  text-transform: uppercase;
  font-family: ${typography.FontFamily.Condensed};
  background-color: ${colors.Background.Interface.Lighter};
  border-top: ${props =>
    props.isSelected
      ? `4px solid ${colors.Border.Interface.Darker}`
      : `1px solid ${colors.Border.Interface.Darker}`};
  border-bottom: ${props =>
    props.isSelected
      ? `1px solid ${colors.Border.Interface.DarkSecondary}`
      : `1px solid ${colors.Border.Interface.Darker}`};
  border-left: 1px solid ${colors.Border.Interface.Darker};
  border-right: 1px solid ${colors.Border.Interface.Darker};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-flow: row;
  }
  > a,
  > span {
    display: inline-flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-family: ${typography.FontFamily.Condensed};
    width: 100%;
    font-size: ${typography.FontSize.Arrondissement};
    padding: ${props => (props.isSelected ? '7px 5px' : '5px')};
    text-decoration: none;
    text-align: center;
    color: ${props =>
      props.isSelected
        ? colors.Content.Interface.Dark
        : colors.Content.Interface.DarkSecondary};
    text-transform: uppercase;
    &.inline {
      display: inline;
    }
    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      flex-flow: row;
      font-size: ${typography.FontSize.Paris};
      padding: ${props =>
        props.isSelected ? `${spacings.sm}` : `${spacings.s} ${spacings.sm}`};
    }
  }
`;

export { TabStyle, TabListStyle };
