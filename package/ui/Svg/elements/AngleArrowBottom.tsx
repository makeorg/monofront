/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgAngleArrowBottom: React.FC<SvgPropsType> = (
  props: SvgPropsType
) => (
  <svg width={21} height={21} viewBox="0 0 21 21" {...props}>
    <path
      className="tofill"
      transform="rotate(90 5 12)"
      d="M7.945 6.648l-5.797 5.797a.48.48 0 01-.351.149.48.48 0 01-.352-.149L.148 11.148A.48.48 0 010 10.797a.48.48 0 01.148-.352l4.149-4.148L.148 2.148A.48.48 0 010 1.797a.48.48 0 01.148-.352L1.445.148A.48.48 0 011.797 0a.48.48 0 01.351.148l5.797 5.797a.48.48 0 01.149.352.48.48 0 01-.149.351z"
    />
  </svg>
);
