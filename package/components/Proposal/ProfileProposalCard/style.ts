import { CardStyle } from '@make.org/ui/elements/CardsElements';
import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const ProfileProposalCardStyle = styled(CardStyle)`
  margin: ${spacings.sm} 0;
  &:first-child {
    margin: 0 0 15px;
  }
  &:only-child {
    margin: 0;
  }
  &:last-child {
    margin: ${spacings.sm} 0 0;
  }
  &.proposal-refused,
  &.proposal-postponed,
  &.proposal-pending {
    * {
      color: ${colors.Content.Interface.DarkSecondary};
    }
    a {
      color: ${colors.Content.Make.Secondary};
    }
    header,
    .status-refused {
      color: ${colors.Content.Interface.Light};
    }
  }
`;
