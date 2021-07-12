import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';

export const OrganisationsVoteWrapperStyle = styled(ParagraphStyle)`
  border-left: 2px solid ${color.greyLighter};
  color: ${color.greyDark};
  padding: 0 8px;
`;
