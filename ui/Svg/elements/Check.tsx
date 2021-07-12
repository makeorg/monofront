/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';
export const SvgCheck: React.FC = (props: SvgPropsType) => (
  <svg width={16} height={12} viewBox="0 0 16 12" {...props}>
    <path
      className="tofill"
      d="M15.711 1.657L14.307.283A.966.966 0 0 0 13.605 0a.966.966 0 0 0-.702.283L6.132 6.919 3.097 3.94a.966.966 0 0 0-.702-.282.966.966 0 0 0-.702.282L.289 5.313A.925.925 0 0 0 0 6c0 .27.096.498.289.687l3.737 3.656 1.404 1.374a.966.966 0 0 0 .702.283.966.966 0 0 0 .702-.283l1.403-1.374 7.474-7.313A.926.926 0 0 0 16 2.343a.925.925 0 0 0-.289-.686z"
    />
  </svg>
);
