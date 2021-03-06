import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { Link } from 'react-router-dom';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { intToPx } from '@make.org/utils/helpers/styled';
import {
  SvgExternalLink,
  SvgMailPlain,
  SvgWorldMap,
} from '@make.org/ui/Svg/elements';
import { Layouts, Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';

export const FooterStyle = styled.footer`
  background-color: ${color.white};
  padding: 0 20px 20px;
  &.extra-mobile-padding-bottom {
    padding-bottom: 50px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 0 20px;
    &.extra-mobile-padding-bottom {
      padding-bottom: 0;
    }
  }
`;

export const FooterNavStyle = styled.nav`
  width: 100%;
  margin: 0 auto;
  max-width: ${intToPx(Layouts.ContainerWidth)};
`;

export const FooterWrapperFirstListStyle = styled(UnstyledListStyle)`
  padding: 20px 0;
  fill: ${color.greyDark};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 27px 0 20px;
  }
`;

export const FooterWrapperSecondListStyle = styled(UnstyledListStyle)`
  padding: 20px 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 20px 0 27px;
  }
`;

export const FooterItemStyle = styled.li`
  display: inline-flex;
  &.no-bullet {
    margin-right: 30px;
  }
  &:after {
    content: '.';
    margin: 0 5px;
  }
  &:last-child:after,
  &.no-bullet:after {
    display: none;
  }
  color: ${color.greyDark};
`;

const LinkStyle = `
  display: inline-flex;
  align-items: center;
  font-family: ${MakeFonts.CircularStandardBook};
  text-decoration: none;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.greyDark};
`;

export const FooterItemLinkStyle = styled(Link)`
  ${LinkStyle};
`;

export const FooterItemHTMLLinkStyle = styled.a`
  ${LinkStyle};
`;

export const FooterItemAltLinkStyle = styled(FooterItemLinkStyle)`
  color: ${color.black};
  &.underline {
    text-decoration: underline;
  }
  .tofill {
    fill: ${color.black};
  }
`;

export const FooterLinkIconStyle = styled(SvgExternalLink)`
  width: 12px;
  height: 12px;
  margin-left: 5px;
  .tofill {
    fill: ${color.greyDark};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 14px;
    height: 14px;
  }
`;

export const FooterSeparatorStyle = styled.hr`
  margin-top: 20px;
  border-top: 1px solid ${color.greyLighter};
  background-color: ${color.greyLighter};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-top: 0;
  }
`;

export const FooterWrapperThirdListStyle = styled(UnstyledListStyle)`
  display: flex;
  justify-content: flex-start;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex: 1;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const FooterCountryIconStyle = styled(SvgWorldMap)`
  margin-right: 10px;
`;

export const FooterContactIconStyle = styled(SvgMailPlain)`
  margin-right: 10px;
`;
