/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgSearch: React.FC = (props: SvgPropsType) => (
  <svg width={20} height={20} viewBox="0 0 20 20" {...props}>
    <g fill="none" fillRule="evenodd">
      <g>
        <path
          className="tofill"
          fill="#DE1A42"
          d="M12.384 12.395c.982-.982 1.473-2.161 1.473-3.538 0-1.376-.49-2.554-1.467-3.532-.979-.979-2.156-1.468-3.533-1.468-1.376 0-2.554.49-3.532 1.468-.979.978-1.468 2.156-1.468 3.532 0 1.377.49 2.554 1.468 3.533.978.978 2.156 1.467 3.532 1.467 1.377 0 2.552-.487 3.527-1.462zm7.187 5.748c0 .387-.14.722-.424 1.004a1.373 1.373 0 01-1.004.424c-.402 0-.737-.14-1.005-.424L13.31 15.33a7.643 7.643 0 01-4.453 1.384 7.72 7.72 0 01-3.052-.62 7.856 7.856 0 01-2.511-1.673 7.856 7.856 0 01-1.675-2.511A7.72 7.72 0 011 8.857a7.72 7.72 0 01.62-3.052 7.856 7.856 0 011.674-2.511 7.856 7.856 0 012.51-1.675A7.72 7.72 0 018.858 1a7.72 7.72 0 013.053.62 7.856 7.856 0 012.51 1.674 7.856 7.856 0 011.675 2.51 7.72 7.72 0 01.62 3.053 7.643 7.643 0 01-1.385 4.453l3.828 3.828c.276.276.413.61.413 1.005z"
        />
        <path d="M0 0h20v20H0z" />
      </g>
    </g>
  </svg>
);
