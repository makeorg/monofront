/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

export const SvgBigCheck = (props: any) => (
  <svg width={20} height={20} viewBox="0 0 20 20" {...props}>
    <path
      className="tofill"
      fill="#000"
      d="M6.793 14.625l-6.5-6.5c-.39-.39-.39-1.024 0-1.414l1.414-1.414c.39-.39 1.024-.39 1.414 0L7.5 9.675 16.879.297c.39-.39 1.023-.39 1.414 0l1.414 1.414c.39.39.39 1.024 0 1.414l-11.5 11.5c-.39.39-1.024.39-1.414 0z"
      transform="translate(-180 -441) translate(150 411) translate(30 30) translate(0 3)"
    />
  </svg>
);
