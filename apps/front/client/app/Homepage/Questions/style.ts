import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { LinkAsRedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { FigureSeparationLineStyle } from '../Highlights/style';

export const HomepageQuestionsButtonStyle = styled(LinkAsRedButtonStyle)`
  display: inline-flex;
  align-self: flex-start;
  margin-top: ${spacings.m};
  fill: ${colors.Content.Interface.Light};
`;

export const FeaturedSeparatorStyle = styled(FigureSeparationLineStyle)`
  margin: 25px 0 40px;
`;
