import { CardStyle } from '@make.org/ui/elements/CardsElements';
import styled from 'styled-components';
import { color } from 'athena-design-tokens';

export const ProfileProposalCardStyle = styled(CardStyle)`
  margin: 15px 0;
  &:first-child {
    margin: 0 0 15px;
  }
  &:only-child {
    margin: 0;
  }
  &:last-child {
    margin: 15px 0 0;
  }
  &.proposal-refused,
  &.proposal-postponed,
  &.proposal-pending {
    * {
      color: ${color.greyDark};
    }
    a {
      color: ${color.brandSecondary};
    }
    header,
    .status-refused {
      color: ${color.white};
    }
  }
`;
