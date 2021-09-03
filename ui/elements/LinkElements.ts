import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { SvgExternalLink } from '../Svg/elements';
import {
  BasicButtonStyle,
  GreyButtonStyle,
  RedButtonStyle,
  RedStyle,
  GreyStyle,
} from './ButtonsElements';

const linkStyle = (linkColor: string) => `
  color: ${linkColor};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  &:hover,
  &:focus {
    color: ${linkColor};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const NewWindowIconStyle = styled(SvgExternalLink)`
  margin-left: 5px;
  fill: ${color.brandSecondary};
`;

export const RedLinkRouterStyle = styled(Link)`
  ${linkStyle(color.brandSecondary)}
`;

export const RedLinkHTMLElementStyle = styled.a`
  ${linkStyle(color.brandSecondary)}
`;

export const LinkAsRedButton = styled(RedButtonStyle)`
  display: inline-flex;
  text-decoration: none;
  &:hover,
  &:focus {
    color: ${color.white};
    text-decoration: none;
  }
`;

export const SimpleLinkAsRedButton = styled.a`
  ${BasicButtonStyle};
  ${RedStyle};
  &:disabled {
    ${GreyStyle};
  }
  display: inline-flex;
  text-decoration: none;
  &:hover,
  &:focus {
    color: ${color.white};
    text-decoration: none;
  }
`;

export const LinkAsGreyButton = styled(GreyButtonStyle)`
  display: inline-flex;
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

export const RedLinkElementStyle = styled(Link)`
  ${linkStyle(color.brandSecondary)};
  text-transform: uppercase;
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
`;

export const RedHTMLLinkElementStyle = styled.a`
  ${linkStyle(color.brandSecondary)};
  text-transform: uppercase;
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
`;
