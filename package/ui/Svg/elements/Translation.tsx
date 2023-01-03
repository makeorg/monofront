/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgTranslation: FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg
    width={15}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.5 2.844c.258 0 .469.19.469.469v.093h1.406c.258 0 .469.19.469.469a.47.47 0 0 1-.469.469h-.047l-.037.105a4.813 4.813 0 0 1-.93 1.533c.02.012.041.005.062.038l.443.264a.469.469 0 0 1-.482.804l-.443-.265c-.104-.063-.228-.128-.307-.199a4.654 4.654 0 0 1-.795.455l-.087.037a.469.469 0 1 1-.38-.857l.085-.038c.15-.068.295-.164.434-.23l-.284-.286a.463.463 0 0 1 0-.66.463.463 0 0 1 .661 0l.342.34.014-.008c.29-.286.528-.642.699-1.054h-2.51a.445.445 0 0 1-.47-.47c0-.257.19-.468.47-.468h1.218v-.094c0-.257.19-.468.469-.468v.02ZM3.75 4.466l.445 1.003h-.911l.466-1.003ZM0 2A1.5 1.5 0 0 1 1.5.5h12A1.5 1.5 0 0 1 15 2v6c0 .827-.673 1.5-1.5 1.5h-12A1.5 1.5 0 0 1 0 8V2Zm7.5 6h6V2h-6v6ZM4.179 3.123a.47.47 0 0 0-.858 0l-1.5 3.375c-.104.215.002.513.239.618a.47.47 0 0 0 .619-.239l.209-.492h1.724l.21.492a.469.469 0 0 0 .618.24c.237-.106.344-.404.239-.62l-1.5-3.374Z"
      fill="#121212"
    />
  </svg>
);
