/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const ArrowBottom: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.57507 13.162L0.176223 6.12203C-0.05874 5.89664 -0.0587399 5.53217 0.176224 5.30677L1.16607 4.35724C1.40103 4.13185 1.78097 4.13185 2.01594 4.35724L8 10.0401L13.9841 4.35724C14.219 4.13185 14.599 4.13185 14.8339 4.35724L15.8238 5.30678C16.0587 5.53217 16.0587 5.89664 15.8238 6.12203L8.42493 13.162C8.18997 13.3874 7.81003 13.3874 7.57507 13.162Z"
      fill="#DFCDE5"
    />
  </svg>
);
