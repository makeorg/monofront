/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SidebarLogo: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.7358 4.77411H4.77751C4.36863 4.77411 3.9765 4.93653 3.68738 5.22565C3.39826 5.51477 3.23584 5.9069 3.23584 6.31578V20.1908C3.23584 20.5996 3.39826 20.9918 3.68738 21.2809C3.9765 21.57 4.36863 21.7324 4.77751 21.7324H21.7358C22.1447 21.7324 22.5368 21.57 22.826 21.2809C23.1151 20.9918 23.2775 20.5996 23.2775 20.1908V6.31578C23.2775 5.9069 23.1151 5.51477 22.826 5.22565C22.5368 4.93653 22.1447 4.77411 21.7358 4.77411ZM4.77751 6.31578H8.63167V20.1908H4.77751V6.31578ZM21.7358 20.1908H10.1733V6.31578H21.7358V20.1908Z"
      fill="#343330"
    />
  </svg>
);