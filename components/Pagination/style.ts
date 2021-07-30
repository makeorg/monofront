import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { SvgPreviousArrow, SvgNextArrow } from '@make.org/ui/Svg/elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { Link } from 'react-router-dom';

export const PaginationNavStyle = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

export const PaginationTextStyle = styled.span`
  align-self: center;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.greyDark};
  padding: 0px 30px;
`;

export const PaginationLinkStyle = styled(Link)`
  background: none;
  border: none;
  padding: 0px;
  .tofill {
    fill: ${color.brandSecondary};
  }
  &:disabled .tofill {
    fill: ${color.greyDark};
  }
`;

export const PaginationDisabledStyle = styled.span`
  .tofill {
    fill: ${color.greyDark};
  }
`;

export const MobileStyle = `
  width: 10px;
  height: 17px;
`;

export const DesktopStyle = `
  width: 7px;
  height: 12px;
`;

export const PreviousArrowStyle = styled(SvgPreviousArrow)`
  ${MobileStyle}
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    ${DesktopStyle}
  }
`;

export const NextArrowStyle = styled(SvgNextArrow)`
  ${MobileStyle}
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    ${DesktopStyle}
  }
`;
