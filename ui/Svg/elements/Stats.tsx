/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgStats: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={14} height={11} viewBox="0 0 14 11" {...props}>
    <path
      d="M13.562 16c.242 0 .438-.196.438-.437v-.438c0-.242-.196-.437-.438-.437H1.312v-8.75c0-.242-.195-.438-.437-.438H.437C.196 5.5 0 5.696 0 5.938v9.187c0 .483.392.875.875.875h12.687zm-5.377-3.756l3.013-3.014.807.806c.413.414 1.12.12 1.12-.464v-2.76c0-.241-.196-.437-.438-.437h-2.76c-.584 0-.877.707-.463 1.12l.806.807-2.395 2.395-2.316-2.316c-.17-.17-.448-.17-.619 0l-2.032 2.033c-.171.17-.171.448 0 .619l.309.309c.17.17.448.17.619 0L5.25 9.928l2.316 2.316c.17.17.448.17.619 0z"
      transform="translate(-360 -469) translate(330 159) translate(30 207) translate(0 36) translate(0 62)"
    />
  </svg>
);
