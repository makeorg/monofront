import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { typography } from 'athena-design-tokens';

export const ProfileLinkStyle = styled(Link)`
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  display: inline-flex;
  text-decoration: none;
  text-transform: uppercase;
  align-items: center;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  flex-shrink: 0;
  > span {
    margin-right: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    > span {
      margin-right: 5px;
    }
  }
`;
