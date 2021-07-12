/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

export const SvgArrowReturn: React.FC = (props: SvgPropsType) => (
  <svg width={16} height={15} {...props}>
    <g fillRule="evenodd">
      <path
        className="tofill"
        d="M9.316 14.326V5.674c0-.6.767-.9 1.215-.476l4.577 4.326a.646.646 0 010 .951l-4.577 4.327c-.448.423-1.215.123-1.215-.476z"
      />
      <path className="tofill" d="M0 8h10v4H0z" />
      <path className="tofill" d="M4 0v11H0V0z" />
    </g>
  </svg>
);
