import { createGlobalStyle } from 'styled-components';
import TradeGothicBoldCondensed from '../fonts/TradeGothicBoldCondensed.woff';
import TradeGothicBoldCondensed2 from '../fonts/TradeGothicBoldCondensed.woff2';
import CircularStandardBook from '../fonts/CircularStandardBook.woff';
import CircularStandardBook2 from '../fonts/CircularStandardBook.woff2';
import CircularStandardBold from '../fonts/CircularStandardBold.woff';
import CircularStandardBold2 from '../fonts/CircularStandardBold.woff2';
import PlayfairDisplayRegularItalic from '../fonts/PlayfairDisplayRegularItalic.woff';
import PlayfairDisplayRegularItalic2 from '../fonts/PlayfairDisplayRegularItalic.woff2';

export const FontFacesStylesheet = createGlobalStyle`
  @font-face {
    font-family: 'Trade Gothic LT Pro Bold Condensed';
    font-display: swap;
    src: url(${TradeGothicBoldCondensed}) format('woff'),
      url(${TradeGothicBoldCondensed2}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Standard Book';
    font-display: swap;
    src: url(${CircularStandardBook}) format('woff'),
      url(${CircularStandardBook2}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular Standard Bold';
    font-display: swap;
    src: url(${CircularStandardBold}) format('woff'),
      url(${CircularStandardBold2}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Playfair Display Regular Italic';
    font-display: swap;
    src: url(${PlayfairDisplayRegularItalic}) format('woff'),
      url(${PlayfairDisplayRegularItalic2}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;
