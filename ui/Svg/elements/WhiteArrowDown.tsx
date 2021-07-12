import React from 'react';

export const SvgWhiteArrowDown: React.FC = (props: React.SVGProps<SVGSVGElement>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <svg width="14" height="14" viewBox="0 0 14 14" {...props}>
    <path
      fill="#FFF"
      d="M6.75 13.906c.188.167.365.167.531 0l6.594-6.594c.188-.187.198-.375.031-.562l-.25-.219c-.166-.166-.344-.166-.531 0l-5.563 5.594V.375c0-.25-.125-.375-.375-.375h-.312C6.625 0 6.5.125 6.5.375v11.75L.906 6.531c-.166-.166-.333-.166-.5 0l-.25.219c-.166.188-.166.375 0 .563l6.594 6.593z"
    />
  </svg>
);
