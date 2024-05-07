/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SourcesVideoSvg: React.FC<SvgPropsType> = (
  props: SvgPropsType
) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="16.5" cy="16" r="16" fill="#89C5E7" />
    <path
      d="M24.0625 8.4375H8.9375C8.57283 8.4375 8.22309 8.58237 7.96523 8.84023C7.70737 9.09809 7.5625 9.44783 7.5625 9.8125V22.1875C7.5625 22.5522 7.70737 22.9019 7.96523 23.1598C8.22309 23.4176 8.57283 23.5625 8.9375 23.5625H24.0625C24.4272 23.5625 24.7769 23.4176 25.0348 23.1598C25.2926 22.9019 25.4375 22.5522 25.4375 22.1875V9.8125C25.4375 9.44783 25.2926 9.09809 25.0348 8.84023C24.7769 8.58237 24.4272 8.4375 24.0625 8.4375ZM8.9375 12.5625H15.8125V19.4375H8.9375V12.5625ZM17.1875 11.1875V9.8125H19.9375V11.1875H17.1875ZM15.8125 11.1875H13.0625V9.8125H15.8125V11.1875ZM15.8125 20.8125V22.1875H13.0625V20.8125H15.8125ZM17.1875 20.8125H19.9375V22.1875H17.1875V20.8125ZM17.1875 19.4375V12.5625H24.0625V19.4375H17.1875ZM24.0625 11.1875H21.3125V9.8125H24.0625V11.1875ZM11.6875 9.8125V11.1875H8.9375V9.8125H11.6875ZM8.9375 20.8125H11.6875V22.1875H8.9375V20.8125ZM24.0625 22.1875H21.3125V20.8125H24.0625V22.1875Z"
      fill="white"
    />
  </svg>
);