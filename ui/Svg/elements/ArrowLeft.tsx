/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';
export const SvgArrowLeft: React.FC = (props: SvgPropsType) => (
  <svg width={15} height={16} viewBox="0 0 15 16" {...props}>
    <path
      className="tofill"
      d="M.377 8.924l6.634 6.686c.258.26.567.39.927.39.354 0 .66-.13.917-.39l.765-.77c.258-.247.387-.555.387-.925s-.13-.677-.387-.924l-2.986-3.02h7.174c.353 0 .64-.128.86-.384.222-.257.332-.567.332-.93V7.343c0-.363-.11-.673-.331-.93a1.082 1.082 0 0 0-.861-.385H6.634L9.62 3.02a1.28 1.28 0 0 0 .387-.934c0-.363-.13-.675-.387-.935L8.855.38A1.288 1.288 0 0 0 7.938 0a1.3 1.3 0 0 0-.927.38L.377 7.066A1.275 1.275 0 0 0 0 8c0 .377.126.685.377.924z"
    />
  </svg>
);
