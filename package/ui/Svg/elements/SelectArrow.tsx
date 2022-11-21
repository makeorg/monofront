/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgSelectArrow: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 6"
    width={10}
    height={6}
    {...props}
  >
    <path
      fill="black"
      fillRule="evenodd"
      d="M4.73442 5.60821L0.110139 1.20823C-0.0367132 1.06736 -0.0367132 0.839564 0.110139 0.698692L0.728792 0.105234C0.875644 -0.0356372 1.11311 -0.0356372 1.25996 0.105234L5 3.65699L8.74004 0.105235C8.88689 -0.0356365 9.12436 -0.0356365 9.27121 0.105235L9.88986 0.698693C10.0367 0.839565 10.0367 1.06736 9.88986 1.20823L5.26558 5.60821C5.11873 5.74908 4.88127 5.74908 4.73442 5.60821Z"
    />
  </svg>
);
