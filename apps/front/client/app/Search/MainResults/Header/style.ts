import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';

export const MainResultsHeaderStyle = styled.div`
  padding: 0 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0;
  }
`;

export const MainResultsHeaderContentStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid ${colors.Border.Interface.DarkSecondary};
  margin-bottom: 20px;
`;

export const MainResultsTitleWrapperStyle = styled(ParagraphStyle)`
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const MainResultsTitleStyle = styled.p`
  display: inline-flex;
  margin-right: 10px;
  font-family: ${typography.FontFamily.Italic};
  font-size: ${typography.FontSize.Arrondissement};

  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Paris};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${typography.FontSize.PetiteCouronne};
  }
`;
