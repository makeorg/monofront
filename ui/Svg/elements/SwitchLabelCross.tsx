/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgSwitchLabelCross: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={8} height={9} viewBox="0 0 8 9" {...props}>
    <path
      d="M.907 8.442L4 5.349l3.093 3.093a.202.202 0 00.283 0l.566-.566a.202.202 0 000-.283L4.849 4.5l3.093-3.093a.201.201 0 000-.282L7.376.559a.2.2 0 00-.283 0L4 3.652.907.559a.197.197 0 00-.282 0l-.566.565a.199.199 0 000 .283L3.152 4.5.059 7.593a.199.199 0 000 .283l.565.566a.202.202 0 00.283 0z"
      fill="#FFF"
      fillRule="nonzero"
    />
  </svg>
);
