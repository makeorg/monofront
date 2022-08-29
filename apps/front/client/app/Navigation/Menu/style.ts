import styled, { keyframes } from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { SpaceBetweenColumnStyle } from '@make.org/ui/elements/FlexElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { Link } from 'react-router-dom';
import { SvgExternalLink, SvgWorldMap } from '@make.org/ui/Svg/elements';
import { SEARCH } from '@make.org/types/enums';
import { intToPx } from '@make.org/utils/helpers/styled';
import { ShadowColors } from '@make.org/assets/vars/Colors';

export const MenuOpenTriggerStyle = styled(UnstyledButtonStyle)`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  margin-right: 20px;
`;

export const MenuBarStyle = styled.span`
  width: 16px;
  height: 3px;
  border-radius: 1.5px;
  background-color: ${color.black};
  &.first {
    width: 21px;
  }
  &.second {
    width: 26px;
    margin: 6px 0;
  }
`;

export const MenuPanelStyle = styled.div`
  position: fixed;
  top: 0;
  left: -105%;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2; // custom color to avoid rbga value
  box-shadow: 0px 0px 20px ${ShadowColors.BlackZeroEightOpacity};
  transition: 0.5s ease-in left;
  overflow: auto;
  &.expanded {
    left: 0;
  }
  &[aria-hidden='true'] a,
  &[aria-hidden='true'] button {
    visibility: hidden;
  }
`;

export const MenuCloseTriggerStyle = styled(UnstyledButtonStyle)`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 11;
  &.tofill {
    fill: ${color.black};
  }
`;

export const MenuInnerStyle = styled(SpaceBetweenColumnStyle)`
  height: 100%;
  padding: 100px 0 40px;
  align-items: center;
`;

export const MenuNavStyle = styled.nav`
  width: 100%;
`;

export const MenuItemStyle = styled.li`
  line-height: 67px;
  width: 100%;
  &.white {
    background-color: ${color.white};
    margin-bottom: 2px;
  }
  &.extra-margin-top {
    margin-top: 15px;
  }
`;

export const MenuItemTitleStyle = styled.span`
  font-family: ${MakeFonts.CircularStandardBold};
  padding: 0 30px;
`;

export const MenuInternalLinkStyle = styled(Link)`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 67px;
  text-decoration: none;
  padding: 0 30px;
  &.current {
    font-family: ${MakeFonts.CircularStandardBold};
  }
`;

export const MenuExternalLinkStyle = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 67px;
  padding: 0 30px;
`;

export const MenuNewWindowIconStyle = styled(SvgExternalLink)`
  width: 14px;
  height: 14px;
  margin-left: 5px;
`;

export const DesktopMenuNavStyle = styled.nav`
  margin-left: 45px;
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const DesktopMenuItemStyle = styled.li`
  display: inline-flex;
  animation-duration: 1s;
  animation-iteration-count: 1;
  &.with-border {
    border-left: 1px solid ${ShadowColors.BlackZeroOneOpacity};
  }
  &.${SEARCH.ADD_SEARCH_DESKTOP_ANIMATION} {
    animation-name: ${fadeOut};
  }
  &.${SEARCH.REMOVE_SEARCH_DESKTOP_ANIMATION} {
    animation-name: ${fadeIn};
  }
  &.${SEARCH.SEARCH_DESKTOP_EXPANDED}[aria-hidden='true'] {
    display: none;
    visibility: hidden;
  }
`;

const DesktopLinkStyle = `
  display: inline-flex;
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  text-transform: uppercase;
  text-decoration: none;
  align-items: center;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 40px;
  padding: 0 30px;
`;

export const DesktopMenuInternalLinkStyle = styled(Link)`
  ${DesktopLinkStyle};
`;

export const DesktopMenuExternalLinkStyle = styled.a`
  ${DesktopLinkStyle};
`;

export const MenuItemCountryLanguageLinkStyle = styled(Link)`
  display: inline-flex;
  align-items: center;
  font-family: ${MakeFonts.CircularStandardBold};
  text-decoration: none;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.black};
`;

export const MenuItemCountryLanguageIconStyle = styled(SvgWorldMap)`
  margin-right: 10px;
`;

export const MenuBulletPointStyle = styled.span`
  font-size: 12px;
`;
