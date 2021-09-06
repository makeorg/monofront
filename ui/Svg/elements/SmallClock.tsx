/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgSmallClock: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width="20" height="20" {...props}>
    <path
      d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.328 12.5a.937.937 0 0 1-1.28.343l-3.517-2.03A.94.94 0 0 1 9.062 10V4.687A.94.94 0 0 1 10 3.75c.516 0 .938.42.938.938v4.769l3.049 1.761a.937.937 0 0 1 .341 1.282z"
      fill="#253186"
      fillRule="nonzero"
    />
  </svg>
);
