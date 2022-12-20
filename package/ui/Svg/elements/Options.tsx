/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgOptions: FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg
    width={4}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.75 1.875A1.874 1.874 0 0 0 1.875 0 1.874 1.874 0 0 0 0 1.875C0 2.912.838 3.75 1.875 3.75A1.874 1.874 0 0 0 3.75 1.875Zm0 5.625a1.874 1.874 0 0 0-1.875-1.875A1.873 1.873 0 0 0 0 7.5c0 1.037.838 1.875 1.875 1.875A1.873 1.873 0 0 0 3.75 7.5Zm-1.875 3.75c1.037 0 1.875.838 1.875 1.875A1.873 1.873 0 0 1 1.875 15 1.874 1.874 0 0 1 0 13.125c0-1.037.838-1.875 1.875-1.875Z"
      fill="#000"
    />
  </svg>
);
