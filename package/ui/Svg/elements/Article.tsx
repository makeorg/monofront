/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgArticle: FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg
    width={32}
    height={33}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="tofill"
      d="M27 5.083H5a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2v-18a2 2 0 0 0-2-2Zm0 20H5v-18h22v18Zm-4-13a1 1 0 0 1-1 1H10a1 1 0 0 1 0-2h12a1 1 0 0 1 1 1Zm0 4a1 1 0 0 1-1 1H10a1 1 0 0 1 0-2h12a1 1 0 0 1 1 1Zm0 4a1 1 0 0 1-1 1H10a1 1 0 0 1 0-2h12a1 1 0 0 1 1 1Z"
      fill="#343330"
    />
  </svg>
);
