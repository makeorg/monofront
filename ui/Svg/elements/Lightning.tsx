/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgLightning: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={9} height={18} viewBox="0 0 9 18" {...props}>
    <path
      className="tofill"
      d="M8.89 5.257c.12.134.143.28.07.442L3.536 17.32a.442.442 0 01-.422.251.847.847 0 01-.14-.02.428.428 0 01-.257-.19.381.381 0 01-.045-.302L4.65 8.943.573 9.958a.535.535 0 01-.121.01.466.466 0 01-.311-.11.375.375 0 01-.131-.393L2.029 1.18a.456.456 0 01.442-.321h3.295c.127 0 .234.041.321.125.087.083.13.182.13.296a.412.412 0 01-.05.18L4.45 6.11l3.977-.984a.55.55 0 01.121-.02c.127 0 .241.05.342.15z"
    />
  </svg>
);
