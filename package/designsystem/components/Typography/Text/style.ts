import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';

export const TextStyle = styled.p`
  font-family: ${typography.FontFamily.Default};
  line-height: ${typography.LineHeight.l150};
  &.condensed {
    font-family: ${typography.FontFamily.Condensed};
    line-height: ${typography.LineHeight.l100};
  }
  &.highlight {
    font-family: ${typography.FontFamily.Highlight};
    font-weight: 'bold';
  }
`;

export const TextLStyle = styled(TextStyle)`
  font-size: ${typography.FontSize.PetiteCouronne};
`;

export const TextMStyle = styled(TextStyle)`
  font-size: ${typography.FontSize.Arrondissement};
`;

export const TextSStyle = styled(TextStyle)`
  font-size: ${typography.FontSize.Bastille};
`;
export const TextXSStyle = styled(TextStyle)`
  font-size: ${typography.FontSize.RueDeLappe};
`;
