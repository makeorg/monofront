/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';
export const SvgTrending: React.FC = (props: SvgPropsType) => (
  <svg width={18} height={14} viewBox="0 0 18 14" {...props}>
    <path
      className="tofill"
      d="M17.438 11.25a.55.55 0 01.404.158.55.55 0 01.158.405v1.124a.547.547 0 01-.158.405.547.547 0 01-.404.158H1.125a1.08 1.08 0 01-.791-.334A1.081 1.081 0 010 12.375V.562C0 .398.053.265.158.158A.547.547 0 01.562 0h1.125c.165 0 .3.053.405.158a.55.55 0 01.158.404V11.25h15.188zM16.313 1.125a.55.55 0 01.404.158.55.55 0 01.158.405v4.148a.814.814 0 01-.246.598.814.814 0 01-.598.246.814.814 0 01-.597-.246l-1.125-1.125-3.375 3.375c-.235.21-.504.316-.809.316-.305 0-.574-.105-.809-.316L6.75 6.082 5.133 7.699a.556.556 0 01-.404.176.556.556 0 01-.405-.176l-.773-.773a.556.556 0 01-.176-.405c0-.152.059-.287.176-.404l2.39-2.426c.235-.21.504-.316.809-.316.305 0 .574.105.809.316l2.566 2.602 2.566-2.602-1.125-1.125a.814.814 0 01-.246-.597c0-.235.082-.434.246-.598a.814.814 0 01.598-.246h4.149z"
    />
  </svg>
);
