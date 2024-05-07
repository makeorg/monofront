/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SourcesDocumentSvg: React.FC<SvgPropsType> = (
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
    <circle cx="16.5" cy="16" r="16" fill="#6CD29B" />
    <path
      d="M24.0625 8.4375H8.9375C8.57283 8.4375 8.22309 8.58237 7.96523 8.84023C7.70737 9.09809 7.5625 9.44783 7.5625 9.8125V22.1875C7.5625 22.5522 7.70737 22.9019 7.96523 23.1598C8.22309 23.4176 8.57283 23.5625 8.9375 23.5625H24.0625C24.4272 23.5625 24.7769 23.4176 25.0348 23.1598C25.2926 22.9019 25.4375 22.5522 25.4375 22.1875V9.8125C25.4375 9.44783 25.2926 9.09809 25.0348 8.84023C24.7769 8.58237 24.4272 8.4375 24.0625 8.4375ZM24.0625 22.1875H8.9375V9.8125H24.0625V22.1875ZM21.3125 13.25C21.3125 13.4323 21.2401 13.6072 21.1111 13.7361C20.9822 13.8651 20.8073 13.9375 20.625 13.9375H12.375C12.1927 13.9375 12.0178 13.8651 11.8889 13.7361C11.7599 13.6072 11.6875 13.4323 11.6875 13.25C11.6875 13.0677 11.7599 12.8928 11.8889 12.7639C12.0178 12.6349 12.1927 12.5625 12.375 12.5625H20.625C20.8073 12.5625 20.9822 12.6349 21.1111 12.7639C21.2401 12.8928 21.3125 13.0677 21.3125 13.25ZM21.3125 16C21.3125 16.1823 21.2401 16.3572 21.1111 16.4861C20.9822 16.6151 20.8073 16.6875 20.625 16.6875H12.375C12.1927 16.6875 12.0178 16.6151 11.8889 16.4861C11.7599 16.3572 11.6875 16.1823 11.6875 16C11.6875 15.8177 11.7599 15.6428 11.8889 15.5139C12.0178 15.3849 12.1927 15.3125 12.375 15.3125H20.625C20.8073 15.3125 20.9822 15.3849 21.1111 15.5139C21.2401 15.6428 21.3125 15.8177 21.3125 16ZM21.3125 18.75C21.3125 18.9323 21.2401 19.1072 21.1111 19.2361C20.9822 19.3651 20.8073 19.4375 20.625 19.4375H12.375C12.1927 19.4375 12.0178 19.3651 11.8889 19.2361C11.7599 19.1072 11.6875 18.9323 11.6875 18.75C11.6875 18.5677 11.7599 18.3928 11.8889 18.2639C12.0178 18.1349 12.1927 18.0625 12.375 18.0625H20.625C20.8073 18.0625 20.9822 18.1349 21.1111 18.2639C21.2401 18.3928 21.3125 18.5677 21.3125 18.75Z"
      fill="white"
    />
  </svg>
);