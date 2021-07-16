/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgSelectArrow: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    width={10}
    height={10}
    {...props}
  >
    <path
      fill="#D5153C"
      fillRule="evenodd"
      d="M4.613 7.401L.175 2.964a.55.55 0 010-.775l.518-.518a.548.548 0 01.774 0L5 5.187l3.533-3.516a.548.548 0 01.774 0l.518.518a.548.548 0 010 .775L5.387 7.401a.547.547 0 01-.774 0z"
    />
  </svg>
);
