/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgInstagramLogo: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={38} height={38} viewBox="0 0 38 38" {...props}>
    <defs>
      <linearGradient
        id="instagram_svg__a"
        x1="50%"
        x2="50%"
        y1="99.709%"
        y2=".777%"
      >
        <stop offset="0%" stopColor="#E09B3D" />
        <stop offset="30%" stopColor="#C74C4D" />
        <stop offset="60%" stopColor="#C21975" />
        <stop offset="100%" stopColor="#7024C4" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <rect width={38} height={38} fill="url(#instagram_svg__a)" rx={19} />
      <g fill="#FFF" fillRule="nonzero" transform="translate(10 10)">
        <path d="M12.694 0H5.386A5.392 5.392 0 000 5.386v7.308a5.392 5.392 0 005.386 5.386h7.308a5.392 5.392 0 005.386-5.386V5.386A5.392 5.392 0 0012.694 0zm3.567 12.694a3.567 3.567 0 01-3.567 3.567H5.386a3.567 3.567 0 01-3.567-3.567V5.386A3.567 3.567 0 015.386 1.82h7.308a3.567 3.567 0 013.567 3.567v7.308z" />
        <path d="M8.96 4.32a4.645 4.645 0 00-4.64 4.64 4.645 4.645 0 004.64 4.64 4.645 4.645 0 004.64-4.64 4.645 4.645 0 00-4.64-4.64zm0 7.475a2.835 2.835 0 110-5.67 2.835 2.835 0 010 5.67z" />
        <circle cx={13.76} cy={4.32} r={1.12} />
      </g>
    </g>
  </svg>
);
