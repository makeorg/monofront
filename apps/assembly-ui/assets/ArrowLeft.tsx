/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const ArrowLeft: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.82621 8.56335L10.8662 1.1645C11.0916 0.929542 11.4561 0.929542 11.6814 1.16451L12.631 2.15435C12.8564 2.38931 12.8564 2.76925 12.631 3.00422L6.94816 8.98828L12.631 14.9723C12.8564 15.2073 12.8564 15.5873 12.631 15.8222L11.6814 16.8121C11.456 17.047 11.0916 17.047 10.8662 16.8121L3.82621 9.41322C3.60082 9.17825 3.60082 8.79831 3.82621 8.56335Z"
      fill="#DFCDE5"
    />
  </svg>
);
