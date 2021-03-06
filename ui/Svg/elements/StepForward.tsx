/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgStepForward: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={10} height={16} viewBox="0 0 10 16" {...props}>
    <path
      className="tofill"
      d="M9.814.212a.583.583 0 0 0-.44-.197h-1.25a.583.583 0 0 0-.439.197A.661.661 0 0 0 7.5.68v7.05a.665.665 0 0 0-.128-.198L.44.15C.316.018.212-.027.127.015.042.057 0 .168 0 .348v15.304c0 .18.042.291.127.333.085.042.189-.004.312-.136l6.934-7.381A.91.91 0 0 0 7.5 8.27v7.05c0 .18.062.336.185.467.124.132.27.198.44.198h1.25c.17 0 .316-.066.44-.198a.66.66 0 0 0 .185-.468V.68a.663.663 0 0 0-.186-.468z"
    />
  </svg>
);
