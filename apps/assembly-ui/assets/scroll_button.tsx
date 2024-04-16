/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgScrollButton: React.FC<SvgPropsType> = (
  props: SvgPropsType
) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse
      cx="11.7645"
      cy="11.7557"
      rx="10.8055"
      ry="10.806"
      fill="#4C41AB"
    />
    <path
      d="M17.1033 12.2451C17.3738 11.9745 17.3738 11.536 17.1033 11.2655L12.2546 6.41697C11.984 6.14648 11.5455 6.1465 11.275 6.41701C11.0045 6.68753 11.0045 7.12611 11.275 7.3966L14.9412 11.0627L6.91604 11.063C6.53349 11.0631 6.22337 11.3732 6.22337 11.7558C6.22337 12.1383 6.53349 12.4484 6.91604 12.4484L14.9412 12.448L11.275 16.1145C11.0045 16.385 11.0045 16.8235 11.275 17.094C11.5455 17.3645 11.984 17.3645 12.2546 17.094L17.1033 12.2451Z"
      fill="white"
    />
  </svg>
);
