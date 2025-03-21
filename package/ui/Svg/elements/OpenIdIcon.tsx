/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgOpenId: FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="22"
    viewBox="0 0 24 22"
    fill="none"
    {...props}
  >
    <path
      d="M21.233 8.71301C19.0484 7.35279 15.9982 6.50781 12.6595 6.50781C5.94086 6.50781 0.5 9.86713 0.5 14.0096C0.5 17.8017 5.03405 20.9137 10.9077 21.4496V19.265C6.95072 18.7704 3.98298 16.6064 3.98298 14.0096C3.98298 11.0625 7.85753 8.65118 12.6595 8.65118C15.0502 8.65118 17.2142 9.24885 18.7805 10.2175L16.5547 11.5983H23.5V7.31158L21.233 8.71301Z"
      fill="#CCCCCC"
    />
    <path
      d="M10.9072 2.7972V19.264V21.4486L14.3902 19.264V0.550781L10.9072 2.7972Z"
      fill="#FF6200"
    />
  </svg>
);
