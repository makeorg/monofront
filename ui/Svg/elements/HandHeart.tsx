/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgHandHeart: React.FC = (props: SvgPropsType) => (
  <svg width={34} height={31} viewBox="0 0 34 31" {...props}>
    <path
      className="tofill"
      d="M17.625 15.428l6.38-6.686c1.852-1.945 1.747-5.162-.327-6.955-2.069-1.793-4.77-.996-6.147.451l-.656.68-.65-.68c-1.348-1.412-4.061-2.261-6.147-.45C8.01 3.58 7.898 6.802 9.75 8.741l6.38 6.686c.411.433 1.079.433 1.495 0zm-.75-1.916l-5.8-6.082c-.98-1.02-1.19-3.018.198-4.225 1.22-1.055 2.825-.51 3.627.334l1.975 2.068L18.85 3.54c.79-.826 2.402-1.389 3.626-.334 1.395 1.207 1.184 3.194.2 4.225l-5.801 6.082zm7.06 17.244c.997 0 1.958-.34 2.73-.961l5.913-4.729c.715-.574 1.143-1.43 1.172-2.343.03-.914-.352-1.805-1.037-2.426-1.155-1.037-2.895-1.031-4.096-.07l-3.61 2.888c-.11.088-.245.135-.392.135h-2.437c.27-.562.38-1.213.28-1.893-.233-1.634-1.733-2.794-3.386-2.794h-8.449c-1.219 0-2.402.392-3.375 1.125l-2.25 1.687H.468c-.257 0-.468.21-.468.469v.937c0 .258.21.469.469.469h5.156l2.748-2.062c.65-.487 1.441-.75 2.25-.75h8.596c.779 0 1.406.626 1.406 1.406 0 .779-.627 1.406-1.406 1.406h-5.157c-.515 0-.937.422-.937.938 0 .515.422.937.937.937h10.559c.568 0 1.12-.193 1.565-.545l3.609-2.883c.451-.357 1.172-.445 1.664 0 .592.533.545 1.436-.053 1.91L25.5 28.336c-.445.357-.996.545-1.565.545H.47c-.258 0-.469.21-.469.469v.937c0 .258.21.469.469.469h23.466z"
    />
  </svg>
);
