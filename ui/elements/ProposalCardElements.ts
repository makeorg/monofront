import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { intToPx } from '@make.org/utils/helpers/styled';
import { CardStyle } from '@make.org/ui/elements/CardsElements';
import { Elements } from '@make.org/assets/vars/Elements';
import { typography } from 'athena-design-tokens';
import { ColumnElementStyle } from './FlexElements';

export const ProposalInnerStyle = styled(ColumnElementStyle)`
  height: 100%;
  justify-content: space-between;
`;
export const ProposalStyle = styled(Link)`
  width: 100%;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  font-family: ${MakeFonts.CircularStandardBold};
  align-self: flex-start;
  flex: 1 1 auto;
  margin-top: 15px;
  text-decoration: none;
  justify-self: flex-start;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
`;

export const ProposalCardStyle = styled(CardStyle)`
  margin: 20px 0 0;
  &.mobile-radius {
    border-radius: ${intToPx(Elements.BorderRadius)};
  }
  &:first-child {
    margin: 0;
  }
  &:only-child {
    margin: 0;
  }
  height: 100%;
`;
