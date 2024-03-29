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

  // padding-top needed to be at the height of the header since it is fixed position
  #app {
    padding-top: 80px;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', Arial, sans-serif;
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
    font-family: 'Inter', Arial, sans-serif;
    font-style: normal;
    font-weight: 600;
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

  label {
    font-family: 'Inter', Arial, sans-serif;
    font-weight: 400;
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
  span,
  blockquote,
  dl,
  dd {
    font-family: 'Inter', Arial, sans-serif;
    font-weight: 400;
    margin: 0;
    line-height: ${typography.LineHeight.l150};
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: none;
  }

  table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
`;
