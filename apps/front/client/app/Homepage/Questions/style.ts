import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { LinkAsRedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { FigureSeparationLineStyle } from '../Highlights/style';

export const HomepageQuestionsButtonStyle = styled(LinkAsRedButtonStyle)`
  display: inline-flex;
  align-self: flex-start;
  fill: ${color.white};
`;

export const FeaturedSeparatorStyle = styled(FigureSeparationLineStyle)`
  margin: 25px 0 40px;
`;
