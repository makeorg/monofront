import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const SearchBackStyle = styled(UnstyledButtonStyle)`
  display: flex;
  align-items: flex-end;
  margin-bottom: ${spacings.s};
  margin-left: 0;
  color: ${colors.Content.Make.Secondary};
  font-size: ${typography.FontSize.RueDeLappe};
  padding: 0;
  text-decoration: underline;
  &:hover,
  &:focus {
    color: ${colors.Content.Make.Secondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const SearchBackArrowStyle = {
  fontSize: '11px',
  marginRight: '4px',
  fill: colors.Content.Make.Secondary,
};
