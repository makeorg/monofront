/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgSuitcase: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={16} height={14} viewBox="0 0 16 14" {...props}>
    <path
      className="tofill"
      d="M.59 2.935c-.394.401-.59.881-.59 1.44v7.583c0 .56.196 1.04.59 1.44C.981 13.8 1.451 14 2 14h.571V2.333H2c-.548 0-1.018.2-1.41.602zM11.429.875a.853.853 0 0 0-.25-.62A.818.818 0 0 0 10.57 0H5.43a.818.818 0 0 0-.608.255.853.853 0 0 0-.25.62v1.458H3.43V14h9.143V2.333H11.43zm-1.143 1.458H5.714V1.167h4.572zm5.124.602A1.906 1.906 0 0 0 14 2.333h-.571V14H14c.548 0 1.018-.2 1.41-.602.394-.4.59-.88.59-1.44V4.375c0-.559-.197-1.039-.59-1.44z"
    />
  </svg>
);
