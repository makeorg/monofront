/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';
export const SvgFastForward: React.FC = (props: SvgPropsType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 16"
    width={20}
    height={16}
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M19.55 6.578l-7.5-6.25C11.247-.34 10 .218 10 1.29v12.5c0 1.07 1.246 1.633 2.05.961l7.5-6.25c.598-.5.598-1.422 0-1.922zm-10 0L2.05.328C1.247-.34 0 .218 0 1.29v12.5c0 1.07 1.246 1.633 2.05.961l7.5-6.25c.598-.5.598-1.422 0-1.922z"
    />
  </svg>
);
