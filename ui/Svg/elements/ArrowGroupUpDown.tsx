import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgArrowGroupUpDown: React.FC<SvgPropsType> = (
  props: SvgPropsType
) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <svg width="14" height="24" {...props}>
    <g fill="#000" fillRule="nonzero">
      <path d="m13.06 15.265-4.935 4.97a1.394 1.394 0 0 1-.947.365c-.354 0-.636-.121-.88-.364l-4.934-4.97a1.242 1.242 0 0 1 .879-2.12h9.904c.503 0 .956.302 1.149.766.192.465.12 1-.236 1.353zM.94 8.735l4.935-4.97c.276-.244.594-.365.947-.365.354 0 .636.121.88.364l4.934 4.97a1.242 1.242 0 0 1-.879 2.12H1.853c-.503 0-.956-.302-1.149-.766-.192-.465-.12-1 .236-1.353z" />
    </g>
  </svg>
);
