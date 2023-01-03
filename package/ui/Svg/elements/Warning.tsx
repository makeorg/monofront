/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgWarning: FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg
    width={15}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.832 11.53 8.584.865c-.478-.82-1.686-.82-2.167 0L.169 11.53c-.48.817.119 1.846 1.082 1.846H13.75c.96 0 1.56-1.026 1.082-1.846ZM6.796 4.235a.703.703 0 0 1 1.406 0v3.75c0 .388-.315.703-.676.703-.362 0-.73-.314-.73-.703v-3.75Zm-.218 6.344a.921.921 0 1 0 1.843 0 .921.921 0 0 0-1.843 0Z"
      fill="#121212"
    />
  </svg>
);
