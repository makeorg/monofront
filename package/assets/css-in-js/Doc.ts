import { createGlobalStyle } from 'styled-components';
import { typography } from 'athena-design-tokens';
import { colors } from '@make.org/designsystem/tokens/colors';
import { MakeFonts } from '../vars/Fonts';

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
    font-size: ${typography.font.fontsize.X2S};
    font-family: ${MakeFonts.TradeGothicBoldCondensed};
    text-transform: uppercase;
    background-color: ${colors.Background.Interface.DarkMain};
    color: ${colors.Content.Interface.Light};
  }

  tbody th,
  tbody td {
    border: 1px solid ${colors.Border.Interface.DarkSecondary};
  }

`;
