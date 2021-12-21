import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import {
  SvgChevronArrowLeft,
  SvgChevronArrowRight,
} from '@make.org/ui/Svg/elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { Link } from 'react-router-dom';

export const PaginationNavStyle = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 50px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    gap: 30px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    gap: 50px;
  }
`;

export const PaginationTextStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: center;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.black};
`;

const sharedArrowPaginationStyle = `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 32px;
  border-radius: 8px;
  .tofill {
    fill: ${color.black};
  }`;

export const PaginationLinkStyle = styled(Link)`
  ${sharedArrowPaginationStyle}
  background-color: ${color.white};
`;

export const PaginationDisabledStyle = styled.span`
  ${sharedArrowPaginationStyle}
  background-color: ${color.grey};
`;

export const MobileStyle = `
  width: 10px;
  height: 17px;
`;

export const DesktopStyle = `
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
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.16);
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
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  box-sizing: border-box;
  padding-left: 0;
  max-height: 206px;
  overflow: auto;
`;

export const ListItemStyle = styled.li`
  width: 100%;
  list-style: none;
  margin-bottom: 5px;
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
    background-color: ${color.brandSecondary};
  }
`;
