import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Elements } from '@make.org/assets/vars/Elements';
import { typography } from '@make.org/designsystem/tokens/typography';
import { CardStyle } from './CardsElements';
import { ColumnElementStyle } from './FlexElements';

export const ProposalInnerStyle = styled(ColumnElementStyle)`
  height: 100%;
  justify-content: space-between;
`;

const ProposalStyle = `
  width: 100%;
  font-size: ${typography.FontSize.RueDeLappe};
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  align-self: flex-start;
  flex: 1 1 auto;
  margin: 15px auto;
  text-decoration: none;
  justify-self: flex-start;
  align-content: flex-start;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${typography.FontSize.Paris};
  }
`;

export const ProposalLinkElementStyle = styled(Link)`
  ${ProposalStyle};
`;

export const ProposalElementStyle = styled.p`
  ${ProposalStyle};
`;

export const ProposalCardStyle = styled(CardStyle)`
  position: relative;
  margin: 20px 0 0;
  height: 100%;
  &.mobile-radius {
    border-radius: ${intToPx(Elements.BorderRadius)};
  }
  &:first-child,
  &:only-child {
    margin: 0;
  }
`;
