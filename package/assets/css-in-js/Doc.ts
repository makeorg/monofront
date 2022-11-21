import { createGlobalStyle } from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { MakeFonts } from '../vars/Fonts';

export const DocStylesheet = createGlobalStyle`
  .red-link {
    color: ${color.brandSecondary};
    fill: ${color.brandSecondary};
    &:hover,
    &:focus {
      color: ${color.brandSecondary};
      fill: ${color.brandSecondary};
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
    background-color: ${color.black};
    color: ${color.white};
  }

  tbody th,
  tbody td {
    border: 1px solid ${color.greyLighter};
  }

`;
