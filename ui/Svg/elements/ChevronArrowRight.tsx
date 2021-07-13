/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgChevronArrowRight: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={20} height={21} viewBox="0 0 20 21" {...props}>
    <path
      className="tofill"
      d="M11.803 10.775l-8.875 8.874c-.428.428-1.121.428-1.55 0L.345 18.614c-.428-.427-.429-1.12-.002-1.548L7.375 10 .342 2.934c-.427-.428-.426-1.12.002-1.548L1.379.351c.428-.428 1.121-.428 1.55 0l8.874 8.874c.428.428.428 1.122 0 1.55z"
      transform="translate(-839 -4450) translate(150 4158) translate(689 292.5) translate(3)"
    />
  </svg>
);
