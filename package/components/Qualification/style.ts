import styled from 'styled-components';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { TextXSStyle } from '@make.org/designsystem/components/Typography/Text/style';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const QualificationLabelStyle = styled(TextXSStyle).attrs({
  as: 'span',
})`
  color: ${props => props.color};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const QualificationContentStyle = styled.span`
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const CounterStyle = styled.span<{ isWidget?: boolean }>`
  font-size: ${props =>
    props.isWidget
      ? typography.FontSize.RueDeLappe
      : typography.FontSize.Arrondissement};
  margin-left: ${spacings.s};
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${props =>
      props.isWidget
        ? typography.FontSize.RueDeLappe
        : typography.FontSize.Paris};
  }
`;

export const QualifyButtonWrapperStyle = styled(UnstyledListStyle)`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  grid-gap: ${spacings.xs};
`;
