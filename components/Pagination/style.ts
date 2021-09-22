import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import {
  SvgAngleArrowLeft,
  SvgAngleArrowRight,
} from '@make.org/ui/Svg/elements';
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
  background: ${color.white};
  border: none;
  border-radius: 5.8px;
  width: 29px;
  height: 23px;
  padding: 0px;
  .tofill {
    fill: ${color.brandSecondary};
  }
  &:disabled .tofill {
    fill: ${color.greyDark};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 40px;
    height: 32px;
  }
`;

export const PaginationDisabledStyle = styled.span`
  background: ${color.white};
  border: none;
  border-radius: 5.8px;
  width: 29px;
  height: 23px;
  padding: 0px;
  .tofill {
    fill: ${color.greyDark};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 40px;
    height: 32px;
  }
`;

export const MobileStyle = `
  width: 20px;
  height: 27px;
`;

export const DesktopStyle = `
  width: 11px;
  height: 11px;
`;

export const PreviousArrowStyle = styled(SvgAngleArrowLeft)`
  ${MobileStyle}
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    ${DesktopStyle}
  }
`;

export const NextArrowStyle = styled(SvgAngleArrowRight)`
  ${MobileStyle}
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    ${DesktopStyle}
  }
`;
