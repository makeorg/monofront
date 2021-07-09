/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

export const SvgBigArrowRight: React.FC<React.HTMLAttributes> = (props) => (
  <svg width={5} height={8} viewBox="0 0 5 8" {...props}>
    <path
      className="tofill"
      d="M.875 7.14c.164.165.319.165.465 0L4.566 3.97c.146-.146.146-.292 0-.438L1.34.36c-.146-.164-.3-.164-.465 0L.684.551c-.146.146-.146.3 0 .465L3.473 3.75.683 6.484c-.163.164-.163.32 0 .465l.192.192z"
    />
  </svg>
);
