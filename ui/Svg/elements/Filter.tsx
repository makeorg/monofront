import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgFilter: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 17 17"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <g fill="#000" fillRule="nonzero">
        <g>
          <g>
            <path
              d="M6.022 7.56c.167.183.26.422.26.669v7.276c0 .438.528.66.84.352l2.03-2.326c.272-.326.422-.487.422-.81v-4.49c0-.247.094-.486.26-.669l5.824-6.32C16.094.77 15.758 0 15.113 0H.743C.096 0-.24.767.197 1.243L6.022 7.56z"
              transform="translate(-948.000000, -1722.000000) translate(928.000000, 1697.000000) translate(20.655995, 25.993374)"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
