/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';
export const SvgPreviousArrow: React.FC = (props: SvgPropsType) => (
  <svg width={9} height={16} viewBox="0 0 9 16" {...props}>
    <path
      className="tofill"
      d="M0 8.444c0 .251.11.487.297.665l7 6.61c.187.178.437.281.703.281.547 0 1-.428 1-.944V1.833C9 1.317 8.547.89 8 .89c-.266 0-.516.103-.703.28l-7 6.611C.109 7.957 0 8.194 0 8.444z"
    />
  </svg>
);
