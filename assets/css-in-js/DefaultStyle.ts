import { createGlobalStyle } from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { NAVIGATION, SEARCH } from '@make.org/types/enums';
import { MakeFonts } from '../vars/Fonts';

export const DefaultStylesheet = createGlobalStyle`
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${MakeFonts.CircularStandardBook};
    color: ${color.black};
    line-height: ${typography.font.lineheight.value};
    &.locked {
      overflow-y: hidden;
    }
  }

  .make-widget {
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    min-height: 550px;
    max-height: 550px;
    max-width: 635px;
    margin: 0 auto;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${MakeFonts.TradeGothicBoldCondensed};
    text-transform: uppercase;
    font-style: normal;
    font-weight: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    margin: 0;
  }

  a {
    font-family: ${MakeFonts.CircularStandardBook};
    color: ${color.black};
    text-decoration: underline;
  }

  input,
  a:hover,
  a:focus {
    color: ${color.black};
  }

  img {
    display: flex;
    max-width: 100%;
  }

  label {
    font-family: ${MakeFonts.CircularStandardBold};
    color: ${color.black};
  }

  a,
  label,
  button {
    cursor: pointer
  }

  button:disabled {
    cursor: not-allowed;
  }

  ul,
  p,
  form,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: none;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1
    }
  }


  .${NAVIGATION.NAVIGATION_ELEMENT_ARIA_CLASS}[aria-hidden="true"],
  .${NAVIGATION.NAVIGATION_ARIA_CLASS}[aria-hidden="true"] a,
  .${NAVIGATION.NAVIGATION_ARIA_CLASS}[aria-hidden="true"] input,
  .${NAVIGATION.NAVIGATION_ARIA_CLASS}[aria-hidden="true"] button,
  .${SEARCH.SEARCH_ELEMENT_ARIA_CLASS}[aria-hidden="true"],
  .${SEARCH.SEARCH_ARIA_CLASS}[aria-hidden="true"] a,
  .${SEARCH.SEARCH_ARIA_CLASS}[aria-hidden="true"] input,
  .${SEARCH.SEARCH_ARIA_CLASS}[aria-hidden="true"] button {
    visibility: hidden;
  }

  #panel_content {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%; 
  }
`;
