/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgPaperPlane: React.FC = (props: SvgPropsType) => (
  <svg width={16} height={16} viewBox="0 0 16 16" {...props}>
    <path
      className="tofill"
      d="M14.876.1L.39 8.457a.75.75 0 0 0 .07 1.35L3.781 11.2l8.98-7.911c.171-.153.415.081.268.26L5.5 12.717v2.514a.75.75 0 0 0 1.329.494l1.984-2.415 3.894 1.63a.752.752 0 0 0 1.032-.568L15.989.876A.75.75 0 0 0 14.876.1z"
    />
  </svg>
);
