/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgExternalLink: React.FC<SvgPropsType> = (
  props: SvgPropsType
) => (
  <svg
    width={16}
    height={14}
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.857 0h14.286A2.858 2.858 0 0 1 20 2.857v14.286A2.857 2.857 0 0 1 17.143 20H2.857A2.857 2.857 0 0 1 0 17.143V2.857A2.857 2.857 0 0 1 2.857 0Zm11.457 13.691c.267-.11.44-.37.44-.66h-.04v-7.11a.671.671 0 0 0-.675-.674H6.968a.714.714 0 0 0-.504 1.217l2.02 1.982-3.033 3.032c-.558.598-.554 1.5.003 2.058l1.01 1.01c.558.559 1.46.56 2.019.002l3.032-3.032 2.02 2.02a.714.714 0 0 0 .779.155Z"
      fill="#000"
    />
  </svg>
);
