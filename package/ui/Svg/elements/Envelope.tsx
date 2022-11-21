/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgEnvelope: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={16} height={12} viewBox="0 0 16 12" {...props}>
    <path
      d="M6.69404 7.96875L0.477246 3.13184C0.176074 2.89746 0 2.53711 0 2.15625C0 1.37959 0.62959 0.75 1.40625 0.75H13.5938C14.3701 0.75 15 1.37959 15 2.15625C15 2.53711 14.7979 2.89746 14.5239 3.13184L8.30713 7.96875C7.83281 8.33789 7.16836 8.33789 6.69404 7.96875ZM6.11836 8.70674C6.53145 9.02865 7.01572 9.1875 7.5 9.1875C7.9834 9.1875 8.46973 9.0293 8.88281 8.70996L15 3.94922V10.5938C15 11.3704 14.3704 12 13.5938 12H1.40625C0.62959 12 0 11.3701 0 10.5938V3.94922L6.11836 8.70674Z"
      fill="#D5153C"
    />
  </svg>
);
