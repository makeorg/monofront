import styled from 'styled-components';
import { color } from 'athena-design-tokens';

import { LinkAsRedButtonStyle } from '@make.org/ui/elements/ButtonsElements';

export const HomepageQuestionsButtonStyle = styled(LinkAsRedButtonStyle)`
  display: inline-flex;
  align-self: flex-start;
  fill: ${color.white};
`;
