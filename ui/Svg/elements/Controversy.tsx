import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgControversy: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={20} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#controversy_svg__b)" clipPath="url(#controversy_svg__a)">
      <path
        d="M14.261 9h-3.626l1.344-4.031c.125-.5-.25-.969-.719-.969H6.758c-.375 0-.719.281-.75.656l-1 7.5c-.063.469.28.844.75.844h3.689l-1.438 6.094c-.094.468.25.906.719.906.281 0 .531-.125.656-.375l5.503-9.5C15.199 9.656 14.824 9 14.26 9Z"
        fill="#FFE360"
      />
      <path
        d="M14.261 8h-2.239l.906-2.715.012-.036.01-.038C13.225 4.106 12.405 3 11.26 3H6.758c-.821 0-1.65.604-1.744 1.543l-.998 7.481C3.87 13.117 4.71 14 5.758 14h2.425l-1.148 4.864-.004.017-.003.017c-.21 1.051.563 2.102 1.7 2.102.57 0 1.201-.263 1.534-.895l5.477-9.457C16.49 9.472 15.553 8 14.261 8Z"
        stroke="#fff"
        strokeWidth={2}
      />
    </g>
    <defs>
      <clipPath id="controversy_svg__a">
        <path fill="#fff" d="M0 0h20v24H0z" />
      </clipPath>
      <filter
        id="controversy_svg__b"
        x={0.999}
        y={1}
        width={18.014}
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
          result="effect1_dropShadow_3031_4490"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_3031_4490"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
