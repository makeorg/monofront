import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgSmallArrowUp: React.FC<SvgPropsType> = (
  props: SvgPropsType
) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <svg width="15" height="15" {...props}>
    <path
      d="M14.019 6.345 7.287.09A.35.35 0 0 0 7.048 0a.35.35 0 0 0-.238.092L.098 6.345a.297.297 0 0 0-.072.34.338.338 0 0 0 .31.193h4.152v7.81c0 .172.151.312.337.312h4.539c.185 0 .336-.14.336-.312v-7.81h4.081a.338.338 0 0 0 .311-.193.295.295 0 0 0-.073-.34z"
      fill="#000"
      fillRule="nonzero"
    />
  </svg>
);
