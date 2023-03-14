import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { SvgCheckedSymbol } from '@make.org/ui/Svg/elements';
import { RedLinkStyle } from '@make.org/ui/elements/LinkElements';
import { colors } from '@make.org/designsystem/tokens/colors';

export const AuthorInfosStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.14px;
  color: ${colors.Content.Interface.DarkSecondary};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const InfosWrapperStyle = styled.span`
  display: inline-flex;
  align-items: center;
  word-break: break-word;
`;

export const AuthorLinkStyle = styled(RedLinkStyle)`
  text-align: center;
  align-items: center;
`;

export const CertifiedIconStyle = styled(SvgCheckedSymbol)`
  flex: none;
  margin-left: 5px;
  margin-bottom: -2px;
  .tofill {
    fill: rgb(74, 144, 226);
  }
`;
