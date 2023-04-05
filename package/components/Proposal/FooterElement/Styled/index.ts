import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { typography } from '@make.org/designsystem/tokens/typography';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const ProposalFooterStyle = styled.div`
  width: 100%;
  display: inline-block;
  margin-top: ${spacings.sm};
  padding-top: ${spacings.sm};
  border-top: 1px solid ${colors.Border.Interface.DarkSecondary};
`;

export const ProposalFooterTagListStyle = styled(UnstyledListStyle)`
  margin-top: ${spacings.sm};
  padding-top: ${spacings.sm};
  border-top: 1px solid ${colors.Border.Interface.DarkSecondary};
`;

export const ProposalFooterTagListItemStyle = styled(ParagraphStyle)`
  display: inline-flex;
  margin-right: ${spacings.m};
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  span::first-letter {
    text-transform: uppercase;
  }
`;

export const PostedInLabelStyle = styled(ParagraphStyle)`
  margin-right: ${spacings.xs};
`;
