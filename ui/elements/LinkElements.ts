import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
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
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  &:hover,
  &:focus {
    color: ${linkColor};
  }
`;

export const NewWindowIconStyle = styled(SvgExternalLink)`
  margin-left: 5px;
  fill: ${color.brandSecondary};
`;

export const RedLinkStyle = styled(Link)`
  ${linkStyle(color.brandSecondary)}
`;

export const RedHTMLLinkElementStyle = styled.a`
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

export const RedUppercaseLinkElementStyle = styled(Link)`
  ${linkStyle(color.brandSecondary)};
  text-transform: uppercase;
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
`;

export const RedUppercaseHTMLLinkElementStyle = styled.a`
  ${linkStyle(color.brandSecondary)};
  text-transform: uppercase;
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
`;
