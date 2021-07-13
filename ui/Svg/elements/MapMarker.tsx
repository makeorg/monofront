/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgMapMarker: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={10} height={16} viewBox="0 0 10 16" {...props}>
    <path d="M8.535 1.562C7.56.521 6.38 0 5 0 3.62 0 2.441.52 1.465 1.562.488 2.604 0 3.861 0 5.333c0 .757.107 1.379.322 1.865l3.565 8.063c.097.229.249.41.454.54a1.197 1.197 0 0 0 1.318 0c.205-.13.36-.311.464-.54l3.555-8.063C9.893 6.712 10 6.09 10 5.333c0-1.472-.488-2.729-1.465-3.77zM6.768 7.22C6.279 7.74 5.69 8 5 8s-1.28-.26-1.768-.78C2.744 6.699 2.5 6.07 2.5 5.334s.244-1.364.732-1.885c.489-.52 1.078-.781 1.768-.781s1.28.26 1.768.78c.488.522.732 1.15.732 1.886s-.244 1.365-.732 1.886z" />
  </svg>
);
