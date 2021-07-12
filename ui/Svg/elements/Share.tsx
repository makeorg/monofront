/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';
export const SvgShare: React.FC = (props: SvgPropsType) => (
  <svg width={25} height={25} viewBox="0 0 25 25" {...props}>
    <path
      className="tofill"
      d="M24.735 8.297l-7.143-8A.816.816 0 0 0 16.964 0a.815.815 0 0 0-.627.297A1.021 1.021 0 0 0 16.07 1v4h-3.125C6.315 5 2.246 7.1.74 11.297.246 12.693 0 14.427 0 16.5c0 1.73.59 4.078 1.772 7.047a39.28 39.28 0 0 0 .334.844c.056.135.117.25.182.343.112.177.242.266.39.266a.39.39 0 0 0 .329-.156.628.628 0 0 0 .118-.39 3.63 3.63 0 0 0-.035-.415 3.608 3.608 0 0 1-.035-.367 29.955 29.955 0 0 1-.07-1.922c0-1.052.082-1.994.244-2.828.163-.833.389-1.554.677-2.164.289-.61.66-1.135 1.116-1.578a6.537 6.537 0 0 1 1.472-1.086c.526-.281 1.144-.502 1.855-.664a15.914 15.914 0 0 1 2.149-.336c.72-.062 1.537-.093 2.448-.093h3.125v4c0 .27.089.505.265.703a.817.817 0 0 0 .628.297.82.82 0 0 0 .628-.297l7.143-8A1.02 1.02 0 0 0 25 9c0-.27-.088-.505-.265-.703z"
    />
  </svg>
);
