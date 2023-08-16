import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';

export const TitleStyle = styled.h2`
  font-family: ${typography.FontFamily.Highlight};
  font-weight: bold;
  line-height: ${typography.LineHeight.l150};
  &.condensed {
    font-family: ${typography.FontFamily.Condensed};
  }
  &.default {
    font-family: ${typography.FontFamily.Default};
  }
`;

export const TitleXXXLStyle = styled(TitleStyle)`
  font-size: ${typography.FontSize.Universe};
`;

export const TitleXXLStyle = styled(TitleStyle)`
  font-size: ${typography.FontSize.Earth};
`;

export const TitleXLStyle = styled(TitleStyle)`
  font-size: ${typography.FontSize.Europe};
`;

export const TitleLStyle = styled(TitleStyle)`
  font-size: ${typography.FontSize.France};
`;

export const TitleMStyle = styled(TitleStyle)`
  font-size: ${typography.FontSize.IleDeFrance};
`;

export const TitleSStyle = styled(TitleStyle)`
  font-size: ${typography.FontSize.GrandeCouronne};
`;

export const TitleXSStyle = styled(TitleStyle)`
  font-size: ${typography.FontSize.PetiteCouronne};
`;

export const TitleXXSStyle = styled(TitleStyle)`
  font-size: ${typography.FontSize.Paris};
`;

export const TitleXXXSStyle = styled(TitleStyle)`
  font-size: ${typography.FontSize.Arrondissement};
`;
