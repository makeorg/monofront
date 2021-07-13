/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgNextArrow: React.FC = (props: SvgPropsType) => (
  <svg width={9} height={16} viewBox="0 0 9 16" {...props}>
    <path
      className="tofill"
      d="M9 7.556c0-.251-.11-.487-.297-.665l-7-6.61C1.516.102 1.266 0 1 0 .453 0 0 .428 0 .944v13.223c0 .516.453.944 1 .944.266 0 .516-.103.703-.28l7-6.611c.188-.177.297-.414.297-.664z"
    />
  </svg>
);
