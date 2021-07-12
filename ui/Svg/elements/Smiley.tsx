/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';
export const SvgSmiley: React.FC = (props: SvgPropsType) => (
  <svg width={14} height={15} viewBox="0 0 14 15" {...props}>
    <path
      d="M6.781 17.531c3.746 0 6.781-3.035 6.781-6.781 0-3.746-3.035-6.781-6.78-6.781C3.034 3.969 0 7.004 0 10.75c0 3.746 3.035 6.781 6.781 6.781zm0-1.312c-3.016 0-5.469-2.453-5.469-5.469 0-3.016 2.453-5.469 5.47-5.469 3.015 0 5.468 2.453 5.468 5.469 0 3.016-2.453 5.469-5.469 5.469zm-2.187-5.906c.484 0 .875-.391.875-.875s-.391-.875-.875-.875-.875.39-.875.875c0 .484.39.875.875.875zm4.375 0c.484 0 .875-.391.875-.875s-.391-.875-.875-.875-.875.39-.875.875c0 .484.39.875.875.875zM6.78 14.685c1.28 0 2.486-.564 3.306-1.548.233-.279.194-.692-.085-.924-.276-.23-.691-.194-.924.085-.569.683-1.408 1.077-2.297 1.077-.888 0-1.728-.391-2.297-1.077-.232-.28-.648-.315-.924-.085-.279.232-.314.645-.085.924.82.984 2.027 1.548 3.306 1.548z"
      transform="translate(-360 -436) translate(330 159) translate(30 207) translate(0 36) translate(0 31)"
    />
  </svg>
);
