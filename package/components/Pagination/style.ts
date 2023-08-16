import styled from 'styled-components';
import {
  SvgChevronArrowLeft,
  SvgChevronArrowRight,
} from '@make.org/ui/Svg/elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { Link } from 'react-router-dom';
import { TextMStyle } from '@make.org/designsystem/components/Typography/Text/style';
import { colors } from '@make.org/designsystem/tokens/colors';
import { shadows } from '@make.org/designsystem/tokens/shadows';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const PaginationNavStyle = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacings.sm};
  margin-bottom: ${spacings.xl};
  margin-top: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    gap: ${spacings.l};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    gap: ${spacings.xl};
  }
`;

export const PaginationTextStyle = styled(TextMStyle).attrs({
  as: 'div',
})`
  display: flex;
  align-items: center;
  gap: ${spacings.s};
  align-self: center;
  color: ${colors.Content.Interface.Dark};
`;

const sharedArrowPaginationStyle = `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${colors.Border.Interface.DarkSecondary};
  .tofill {
    fill: ${colors.Content.Interface.Dark};
  }`;

export const PaginationLinkStyle = styled(Link)`
  ${sharedArrowPaginationStyle}
  background-color: ${colors.Background.Interface.Lighter};
`;

export const PaginationDisabledStyle = styled.span`
  ${sharedArrowPaginationStyle}
  background-color: ${colors.Background.Interface.DarkMain};
`;

const MobileStyle = `
  width: 10px;
  height: 17px;
`;

const DesktopStyle = `
  width: 7px;
  height: 12px;
`;

export const PreviousArrowStyle = styled(SvgChevronArrowLeft)`
  ${MobileStyle}
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    ${DesktopStyle}
  }
`;

export const NextArrowStyle = styled(SvgChevronArrowRight)`
  ${MobileStyle}
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    ${DesktopStyle}
  }
`;

export const DropDownContainerStyle = styled.div`
  width: 60px;
  position: relative;
  border-radius: 8px;
  border: 1px solid ${colors.Border.Interface.DarkSecondary};
`;

export const DropDownCurrentStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    box-shadow: {shadows.s20};
  }
`;

export const DropDownListStyle = styled.ul`
  position: absolute;
  top: -56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #ffffff;
  box-shadow: ${shadows.s20};
  border-radius: 8px;
  box-sizing: border-box;
  padding-left: 0;
  max-height: 206px;
  overflow: auto;
`;

export const ListItemStyle = styled.li`
  width: 100%;
  list-style: none;
  margin-bottom: ${spacings.xs};
  &.selected {
    font-weight: bold;
  }
`;

export const ListLinkStyle = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
  &:hover {
    color: white;
    background-color: ${colors.Background.Make.Secondary};
  }
`;
