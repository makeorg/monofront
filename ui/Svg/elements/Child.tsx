/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgChild: React.FC = (props: SvgPropsType) => (
  <svg width={12} height={16} viewBox="0 0 12 16" {...props}>
    <path
      className="tofill"
      d="M3.75 2.25a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0zm7.957.043a1 1 0 0 0-1.414 0L7.586 5H4.414L1.707 2.293A1 1 0 1 0 .293 3.707L3.25 6.664V15a1 1 0 0 0 1 1h.5a1 1 0 0 0 1-1v-3.5h.5V15a1 1 0 0 0 1 1h.5a1 1 0 0 0 1-1V6.664l2.957-2.957a1 1 0 0 0 0-1.414z"
    />
  </svg>
);
