/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';
export const SvgClock: React.FC = (props: SvgPropsType) => (
  <svg width={12} height={13} viewBox="0 0 12 13" {...props}>
    <path
      className="tofill"
      d="M6 12.312c3.21 0 5.812-2.601 5.812-5.812C11.812 3.29 9.211.688 6 .688 2.79.688.187 3.289.187 6.5c0 3.21 2.602 5.812 5.813 5.812zm0-1.125c-2.59 0-4.688-2.097-4.688-4.687C1.312 3.91 3.41 1.813 6 1.813S10.687 3.91 10.687 6.5c0 2.59-2.097 4.687-4.687 4.687zM7.842 8.68l.44-.607c.092-.127.066-.303-.06-.394l-1.566-1.14V3.22c0-.155-.126-.281-.281-.281h-.75c-.155 0-.281.126-.281.28v3.85c0 .088.042.173.115.227l1.99 1.446c.126.091.302.063.393-.061z"
    />
  </svg>
);
