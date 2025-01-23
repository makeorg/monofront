/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgBank: FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg
    width={27}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="tofill"
      d="M3.113 10.563h2.438v6.5H3.926a.812.812 0 1 0 0 1.625h19.5a.812.812 0 1 0 0-1.625H21.8v-6.5h2.437a.812.812 0 0 0 .426-1.505L14.1 2.558a.813.813 0 0 0-.85 0l-10.563 6.5a.812.812 0 0 0 .425 1.505Zm4.063 0h3.25v6.5h-3.25v-6.5Zm8.125 0v6.5h-3.25v-6.5h3.25Zm4.875 6.5h-3.25v-6.5h3.25v6.5Zm-6.5-12.86 7.692 4.734H5.983l7.693-4.733Zm12.187 16.922a.812.812 0 0 1-.812.813H2.3a.812.812 0 1 1 0-1.625h22.75a.812.812 0 0 1 .812.812Z"
      fill="#343330"
    />
  </svg>
);
