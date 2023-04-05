import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';

export const ParagraphStyle = styled.p`
  font-size: ${typography.FontSize.Arrondissement};
  color: ${colors.Content.Interface.DarkSecondary};
`;

const InlineParagraphStyle = styled(ParagraphStyle)`
  display: inline;
`;

export const ExtraAltParagraphStyle = styled(InlineParagraphStyle)`
  margin-top: ${spacings.s};
`;

export const ExtraBlackParagraphStyle = styled(InlineParagraphStyle)`
  margin-top: ${spacings.sm};
  color: black;
`;

export const ConditionParagraphMarginStylePanel = styled(InlineParagraphStyle)`
  font-family: ${typography.FontFamily.Default};
  font-size: ${typography.FontSize.RueDeLappe};
  width: 100%;
  margin-bottom: ${spacings.sm};
  color: ${colors.Content.Interface.DarkSecondary};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;
