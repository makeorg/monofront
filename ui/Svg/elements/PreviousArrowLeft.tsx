/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgPreviousArrowLeft: React.FC = (props: SvgPropsType) => (
  <svg width={11} height={10} viewBox="0 0 11 10" {...props}>
    <path
      className="tofill"
      d="M6.82 9.602l-.56.561c-.238.238-.622.238-.857 0L.489 5.252c-.238-.238-.238-.622 0-.857L5.403-.519c.237-.237.621-.237.857 0l.56.562c.24.24.236.631-.01.867L3.766 3.81h7.264c.336 0 .607.27.607.607v.809c0 .336-.27.606-.607.606H3.765L6.81 8.735c.247.235.252.627.01.867z"
    />
  </svg>
);
