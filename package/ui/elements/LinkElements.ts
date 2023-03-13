import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Link } from 'react-router-dom';
import { colors } from '@make.org/designsystem/tokens/colors';
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
  font-size: ${typography.FontSize.Arrondissement};
  &:hover,
  &:focus {
    color: ${linkColor};
  }
`;

export const BlackLinkStyle = styled(Link)`
  ${linkStyle(colors.Content.Interface.Dark)}
`;

export const NewWindowIconStyle = styled(SvgExternalLink)`
  margin-left: 5px;
  fill: ${colors.Content.Make.Secondary};
`;

export const NewWindowGreyIconStyle = styled(NewWindowIconStyle)`
  fill: ${colors.Content.Interface.DarkSecondary};
  width: 15px;
  height: 10px;
`;

export const RedLinkStyle = styled(Link)`
  ${linkStyle(colors.Content.Make.Secondary)}
`;

export const RedHTMLLinkElementStyle = styled.a`
  ${linkStyle(colors.Content.Make.Secondary)}
`;

export const LinkAsRedButton = styled(RedButtonStyle)`
  display: inline-flex;
  text-decoration: none;
  &:hover,
  &:focus {
    color: ${colors.Content.Interface.Light};
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
    color: ${colors.Content.Interface.Light};
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
  ${linkStyle(colors.Content.Make.Secondary)};
  text-transform: uppercase;
  font-family: ${typography.FontFamily.Condensed};
`;

export const RedUppercaseHTMLLinkElementStyle = styled.a`
  ${linkStyle(colors.Content.Make.Secondary)};
  text-transform: uppercase;
  font-family: ${typography.FontFamily.Condensed};
  & svg {
    max-width: 16px;
    max-height: 14px;
  }
`;
