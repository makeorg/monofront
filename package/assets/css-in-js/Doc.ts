import { createGlobalStyle } from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { typography } from '@make.org/designsystem/tokens/typography';

export const DocStylesheet = createGlobalStyle`
  .red-link {
    color: ${colors.Content.Make.Secondary};
    fill: ${colors.Content.Make.Secondary};
    &:hover,
    &:focus {
      color: ${colors.Content.Make.Secondary};
      fill: ${colors.Content.Make.Secondary};
    }
  }

  caption {
    padding: 20px;
  }

  table {
    border-spacing: 0;
  }

  .main-row,
  thead,
  tbody {
    width: 100%;
  }

  th, td {
    padding: 5px 10px;
  }

  .no-padding {
    padding: 0;
  }

  thead th {
    font-size: ${typography.FontSize.RueDeLappe};
    font-family: ${typography.FontFamily.Condensed};
    text-transform: uppercase;
    background-color: ${colors.Background.Interface.DarkMain};
    color: ${colors.Content.Interface.Light};
  }

  tbody th,
  tbody td {
    border: 1px solid ${colors.Border.Interface.DarkSecondary};
  }

`;
