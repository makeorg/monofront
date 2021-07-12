/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

export const SvgArrowBottom: React.FC = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={12} height={12} viewBox="0 0 12 12" {...props}>
    <path
      className="tofill"
      d="M5.742 12.384c.174.155.339.155.494 0l6.126-6.109c.174-.174.184-.347.029-.521l-.233-.203c-.154-.154-.319-.154-.493 0l-5.168 5.183V-.153c0-.231-.116-.347-.348-.347h-.29c-.233 0-.35.116-.35.347v10.887L.314 5.55c-.155-.154-.31-.154-.465 0l-.232.203c-.155.174-.155.347 0 .521l6.126 6.11z"
    />
  </svg>
);
