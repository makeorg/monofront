import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const ProfileLinkStyle = styled(Link)`
  font-family: ${typography.FontFamily.Condensed};
  display: inline-flex;
  text-decoration: none;
  align-items: center;
  font-size: ${typography.FontSize.Arrondissement};
  flex-shrink: 0;
  > span {
    margin-right: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    > span {
      margin-right: ${spacings.xs};
    }
  }
`;
