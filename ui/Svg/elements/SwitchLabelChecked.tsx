/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgSwitchLabelChecked: React.FC = (props: SvgPropsType) => (
  <svg width={9} height={7} viewBox="0 0 9 7" {...props}>
    <path
      d="M2.635 6.274L8.307.602a.226.226 0 000-.321L8.093.066a.228.228 0 00-.321 0L2.474 5.364.602 3.491a.228.228 0 00-.321 0l-.215.214a.228.228 0 000 .321l2.248 2.248a.228.228 0 00.321 0z"
      fill="#FFF"
      fillRule="nonzero"
    />
  </svg>
);
