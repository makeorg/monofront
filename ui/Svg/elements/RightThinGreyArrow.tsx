import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgRightGreyArrow: React.FC<SvgPropsType> = (
  props: SvgPropsType
) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <svg
    width="12"
    height="7"
    viewBox="0 0 12 7"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M-2.62251e-07 3.49971C-2.98515e-07 3.0849 0.335129 2.74977 0.749941 2.74977L8.24701 2.74977L8.24701 1.0624C8.24701 0.838657 8.37966 0.636103 8.58495 0.546812C8.79011 0.457476 9.02906 0.498137 9.19287 0.650094L11.82 3.0874C12.06 3.31004 12.06 3.68947 11.82 3.9121L9.19288 6.34941C9.02901 6.50137 8.79025 6.54201 8.58495 6.45267C8.38059 6.36355 8.24701 6.15966 8.24701 5.95811L8.24701 4.24965L0.749941 4.24965C0.33513 4.24965 -2.25987e-07 3.91452 -2.62251e-07 3.49971Z"
      fill="black"
      fillOpacity="0.65"
    />
  </svg>
);
