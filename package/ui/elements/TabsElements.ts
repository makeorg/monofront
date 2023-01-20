import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import {
  Layouts,
  DefaultPadding,
  Breakpoints,
} from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { MakeFonts } from '@make.org/assets/vars/Fonts';

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
    background-color: ${color.black};
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
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  background-color: ${color.white};
  border-top: ${props =>
    props.isSelected ? `4px solid ${color.black}` : `1px solid ${color.black}`};
  border-bottom: ${props =>
    props.isSelected
      ? `1px solid ${color.greyLighter}`
      : `1px solid ${color.black}`};
  border-left: 1px solid ${color.black};
  border-right: 1px solid ${color.black};
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
    font-family: ${MakeFonts.TradeGothicBoldCondensed};
    width: 100%;
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
    padding: ${props => (props.isSelected ? '7px 5px' : '5px')};
    text-decoration: none;
    text-align: center;
    color: ${props => (props.isSelected ? color.black : color.greyDark)};
    text-transform: uppercase;
    &.inline {
      display: inline;
    }
    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      flex-flow: row;
      font-size: ${intToPx(typography.font.fontsize.S.value)};
      padding: ${props => (props.isSelected ? '15px' : '10px 15px')};
    }
  }
`;

export { TabStyle, TabListStyle };
