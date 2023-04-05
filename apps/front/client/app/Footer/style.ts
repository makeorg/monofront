import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
import {
  SvgExternalLink,
  SvgMailPlain,
  SvgWorldMap,
} from '@make.org/ui/Svg/elements';
import { Layouts, Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const FooterStyle = styled.footer`
  background-color: ${colors.Background.Interface.Lighter};
  padding: 0 ${spacings.m} ${spacings.m};
  &.extra-mobile-padding-bottom {
    padding-bottom: ${spacings.xl};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 0 ${spacings.m};
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
  padding: ${spacings.m} 0;
  fill: ${colors.Content.Interface.DarkSecondary};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: ${spacings.l} 0 ${spacings.m};
  }
`;

export const FooterWrapperSecondListStyle = styled(UnstyledListStyle)`
  padding: ${spacings.m} 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: ${spacings.m} 0 ${spacings.l};
  }
`;

export const FooterItemStyle = styled.li`
  display: inline-flex;
  &.no-bullet {
    margin-right: ${spacings.l};
  }
  &:after {
    content: '.';
    margin: 0 ${spacings.xs};
  }
  &:last-child:after,
  &.no-bullet:after {
    display: none;
  }
  color: ${colors.Content.Interface.DarkSecondary};
`;

const LinkStyle = `
  display: inline-flex;
  align-items: center;
  font-family: ${typography.FontFamily.Default};
  text-decoration: none;
  font-size: ${typography.FontSize.Arrondissement};
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const FooterItemLinkStyle = styled(Link)`
  ${LinkStyle};
`;

export const FooterItemHTMLLinkStyle = styled.a`
  ${LinkStyle};
`;

export const FooterItemAltLinkStyle = styled(FooterItemLinkStyle)`
  width: max-content;
  color: ${colors.Content.Interface.Dark};
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  .tofill {
    fill: ${colors.Content.Interface.Dark};
  }
`;

export const FooterLinkIconStyle = styled(SvgExternalLink)`
  width: 12px;
  height: 12px;
  margin-left: ${spacings.xs};
  .tofill {
    fill: ${colors.Content.Interface.DarkSecondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 14px;
    height: 14px;
  }
`;

export const FooterSeparatorStyle = styled.hr`
  margin-top: ${spacings.m};
  border-top: 1px solid ${colors.Border.Interface.DarkSecondary};
  background-color: ${colors.Background.Interface.DarkSecondary};
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
  margin-right: ${spacings.s};
`;

export const FooterContactIconStyle = styled(SvgMailPlain)`
  margin-right: ${spacings.s};
`;

export const FooterBulletPointStyle = styled.span`
  font-size: 12px;
`;
