/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgMap: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={21} height={18} viewBox="0 0 21 18" {...props}>
    <path
      className="tofill"
      d="M20.713.115A.62.62 0 0121 .648v14.134a.629.629 0 01-.41.592l-6.563 2.57a.576.576 0 01-.492 0L7.22 15.476l-6.317 2.47a.555.555 0 01-.246.05.679.679 0 01-.369-.11.62.62 0 01-.287-.533V3.218a.629.629 0 01.41-.592L6.973.055a.576.576 0 01.492 0l6.316 2.469 6.317-2.47a.63.63 0 01.615.06zM7.547 1.471v12.75l5.906 2.308V3.78L7.547 1.472zM1.313 3.649V16.4l5.577-2.18V1.47L1.312 3.65zm18.375 10.702V1.6l-5.58 2.18v12.75l5.579-2.18z"
    />
  </svg>
);
