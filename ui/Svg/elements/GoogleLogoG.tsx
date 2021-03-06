/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgGoogleLogoG: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={16} height={16} viewBox="0 0 16 16" {...props}>
    <g fill="none">
      <path
        d="M15.985 8.188c0-.543-.045-1.088-.14-1.621H8.166v3.071h4.397a3.688 3.688 0 01-1.627 2.424v1.992h2.623c1.54-1.389 2.425-3.44 2.425-5.866z"
        fill="#4285F4"
      />
      <path
        d="M8.167 15.98c2.196 0 4.047-.707 5.396-1.926l-2.623-1.992c-.73.486-1.672.761-2.77.761-2.123 0-3.923-1.403-4.57-3.29H.895v2.054c1.382 2.693 4.196 4.392 7.273 4.392z"
        fill="#34A853"
      />
      <path
        d="M3.598 9.533a4.686 4.686 0 010-3.054V4.425H.894a7.838 7.838 0 000 7.162l2.704-2.054z"
        fill="#FBBC04"
      />
      <path
        d="M8.167 3.185a4.473 4.473 0 013.123 1.196l2.323-2.277A7.912 7.912 0 008.167.029C5.09.03 2.276 1.73.894 4.425l2.704 2.054c.643-1.89 2.446-3.294 4.57-3.294z"
        fill="#EA4335"
      />
    </g>
  </svg>
);
