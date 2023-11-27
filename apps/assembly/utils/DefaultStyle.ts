import { createGlobalStyle } from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';

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
    font-family: ${typography.FontFamily.Default};
    color: ${colors.Content.Interface.Dark};
    line-height: ${typography.LineHeight.l150};
    &.locked {
      overflow-y: hidden;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${typography.FontFamily.Condensed};
    text-transform: uppercase;
    font-style: normal;
    font-weight: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    margin: 0;
  }

  a {
    font-family: ${typography.FontFamily.Default};
    color: ${colors.Content.Interface.Dark};
    text-decoration: underline;
  }

  input,
  a:hover,
  a:focus {
    color: ${colors.Content.Interface.Dark};
  }

  img {
    display: flex;
    max-width: 100%;
  }

  label {
    font-family: ${typography.FontFamily.Highlight};
    font-weight: bold;
    color: ${colors.Content.Interface.Dark};
  }

  a,
  label,
  button {
    cursor: pointer;
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

`;
