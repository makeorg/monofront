import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgPopular: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={24} height={23} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#popular_svg__a)">
      <path
        d="m12.549 18.785 7.425-7.442c1.825-1.828 2.094-4.836.367-6.758a4.766 4.766 0 0 0-3.418-1.583 4.756 4.756 0 0 0-3.497 1.397L12.03 5.797 10.825 4.59C9.001 2.76 6 2.492 4.082 4.222a4.775 4.775 0 0 0-1.58 3.425 4.785 4.785 0 0 0 1.394 3.505l7.616 7.633a.732.732 0 0 0 1.037 0Z"
        fill="#D5153C"
      />
      <path
        d="M12.718 3.692h0a5.765 5.765 0 0 1 4.233-1.69 5.757 5.757 0 0 1 4.134 1.915l-8.367-.225Zm0 0-.688.69m.688-.69-.688.69m0 0-.497-.499C9.384 1.73 5.778 1.345 3.413 3.48l8.617.903Z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="popular_svg__a"
        x={-1.5}
        y={0}
        width={27.002}
        height={24}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_3031_3804"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_3031_3804"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
