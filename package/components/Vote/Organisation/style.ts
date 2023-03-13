import styled from 'styled-components';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { colors } from '@make.org/designsystem/tokens/colors';

export const OrganisationsVoteWrapperStyle = styled(ParagraphStyle)`
  border-left: 2px solid ${colors.Border.Interface.DarkSecondary};
  color: ${colors.Content.Interface.DarkSecondary};
  padding: 0 8px;
`;
