import styled from 'styled-components';
import { typography } from '../../../tokens/typography';

// @todo to remove styles (except Basic) after decision on how to proceed

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

export const TextBaseStyle = styled.p<{
  font: string;
  size: string;
  lineHeight: string;
  transform: string;
  decoration: string;
}>`
  font-family: ${props => props.font};
  font-size: ${props => props.size};
  line-height: ${props => props.lineHeight};
  text-transform: ${props => props.transform};
  text-decoration: ${props => props.decoration};
`;
