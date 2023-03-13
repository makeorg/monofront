import styled from 'styled-components';
import { Breakpoints, DefaultPadding } from '@make.org/assets/vars/Breakpoints';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { colors } from '@make.org/designsystem/tokens/colors';

export const ReportOptionsButtonStyle = styled(UnstyledButtonStyle)`
  position: absolute;
  top: ${intToPx(DefaultPadding.Mobile)};
  right: ${intToPx(DefaultPadding.Mobile)};
  fill: ${colors.Content.Interface.DarkSecondary};
  padding: 0 7.5px;
  z-index: 1;
  font-size: ${typography.FontSize.Arrondissement};
  .tofill {
    fill: ${colors.Content.Interface.DarkSecondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    top: ${intToPx(DefaultPadding.Desktop)};
    right: ${intToPx(DefaultPadding.Desktop)};
  }
`;
