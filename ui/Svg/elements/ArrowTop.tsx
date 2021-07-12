/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

export const SvgArrowTop: React.FC = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={16} height={15} viewBox="0 0 16 15" {...props}>
    <path
      className="tofill"
      d="M7.076.377L.39 7.011a1.26 1.26 0 0 0-.39.927c0 .354.13.66.39.917l.77.765c.247.258.555.387.925.387s.677-.13.924-.387l3.02-2.986v7.174c0 .353.128.64.384.86.257.222.567.332.93.332h1.314c.363 0 .673-.11.93-.331.256-.22.385-.508.385-.861V6.634L12.98 9.62c.26.258.571.387.934.387.363 0 .675-.13.935-.387l.77-.765c.253-.265.38-.57.38-.917a1.3 1.3 0 0 0-.38-.927L8.934.377A1.275 1.275 0 0 0 8 0c-.377 0-.685.126-.924.377z"
    />
  </svg>
);
