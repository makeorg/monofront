/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgAlert: React.FC = (props: SvgPropsType) => (
  <svg width={19} height={17} viewBox="0 0 19 17" {...props}>
    <g fill="none" fillRule="evenodd">
      <path fill="#FFF" d="M6 5h5v11H6z" />
      <path
        fill="#DD1A42"
        fillRule="nonzero"
        d="M18.832 15.11L10.577.63a1.237 1.237 0 00-2.154 0L.168 15.11C-.31 15.947.288 17 1.246 17h16.508c.957 0 1.556-1.052 1.078-1.89zM9.512 5.087a.95.95 0 01.941.981l-.156 5.499a.793.793 0 01-.79.776.795.795 0 01-.789-.776l-.152-5.499a.953.953 0 01.946-.98zM9.5 15.034a.987.987 0 01-.98-.992c0-.548.44-.993.98-.993s.98.445.98.993c0 .547-.44.992-.98.992z"
      />
    </g>
  </svg>
);
