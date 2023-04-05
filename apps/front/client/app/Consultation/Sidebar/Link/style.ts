import styled from 'styled-components';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const NewWindowLinkStyle = styled(RedHTMLLinkElementStyle)`
  display: inline-flex;
  align-items: center;
  margin-top: ${spacings.xs};
`;
