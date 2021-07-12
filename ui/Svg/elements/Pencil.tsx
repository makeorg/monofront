/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';
export const SvgPencil: React.FC = (props: SvgPropsType) => (
  <svg width={16} height={16} viewBox="0 0 16 16" {...props}>
    <path
      className="tofill"
      d="M0 11.607V16h4.393l8.787-8.787L8.787 2.82zm3.834 3.041h-1.13v-1.352H1.352v-1.13l.96-.96 2.483 2.481zm5.29-10.033c.156 0 .233.078.233.233 0 .07-.024.13-.074.18L3.56 10.75a.245.245 0 0 1-.18.074c-.154 0-.232-.078-.232-.232 0-.07.025-.13.074-.18L8.945 4.69a.244.244 0 0 1 .18-.074zm6.486-1.743L13.126.402a1.312 1.312 0 0 0-.96-.402c-.381 0-.698.134-.951.401L9.463 2.144l4.393 4.393 1.753-1.753c.26-.26.391-.577.391-.95 0-.366-.13-.687-.39-.962z"
    />
  </svg>
);
