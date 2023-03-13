import styled from 'styled-components';
import { typography } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { colors } from '@make.org/designsystem/tokens/colors';

export const SearchBackStyle = styled(UnstyledButtonStyle)`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
  margin-left: 0;
  color: ${colors.Content.Make.Secondary};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  padding: 0;
  text-decoration: underline;
  &:hover,
  &:focus {
    color: ${colors.Content.Make.Secondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const SearchBackArrowStyle = {
  fontSize: '11px',
  marginRight: '4px',
  fill: colors.Content.Make.Secondary,
};
