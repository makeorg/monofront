/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgArrowRight: React.FC = (props: SvgPropsType) => (
  <svg width={15} height={16} viewBox="0 0 15 16" {...props}>
    <path
      className="tofill"
      d="M14.737 7.076L8.05.39A1.27 1.27 0 0 0 7.117 0c-.356 0-.664.13-.924.39l-.77.77a1.22 1.22 0 0 0-.39.925c0 .37.13.677.39.924l3.008 3.02h-7.23c-.355 0-.645.128-.867.384a1.371 1.371 0 0 0-.334.93v1.314c0 .363.111.673.334.93.222.256.512.385.867.385h7.23L5.422 12.98c-.26.26-.39.571-.39.934 0 .363.13.675.39.935l.77.77c.268.253.576.38.925.38.356 0 .667-.127.934-.38l6.686-6.686a1.27 1.27 0 0 0 .38-.934c0-.377-.127-.685-.38-.924z"
    />
  </svg>
);
