/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgEmptyAvatar: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={30} height={30} viewBox="0 0 30 30" {...props}>
    <defs>
      <circle cx={15} cy={15} r={15} />
      <path d="M17 15.24c0 .757-.228 1.406-.684 1.947-.455.542-1.004.813-1.646.813H5.33c-.642 0-1.19-.27-1.646-.813C3.228 16.646 3 15.998 3 15.24c0-.59.031-1.148.093-1.672a8.612 8.612 0 0 1 .345-1.584c.167-.53.38-.986.64-1.364a3.005 3.005 0 0 1 1.027-.927c.427-.24.917-.36 1.472-.36.955.89 2.096 1.334 3.423 1.334s2.468-.445 3.423-1.334c.555 0 1.045.12 1.472.36.426.24.769.548 1.028.927.259.378.472.833.64 1.364.167.532.282 1.06.344 1.584S17 14.649 17 15.24zM12.964 3.177C13.788 3.955 14.2 4.896 14.2 6c0 1.104-.41 2.047-1.23 2.828C12.15 9.61 11.16 10 10 10c-1.16 0-2.15-.39-2.97-1.172C6.21 8.047 5.8 7.104 5.8 6c0-1.104.41-2.047 1.23-2.828C7.85 2.39 8.84 2 10 2c1.16 0 2.147.392 2.964 1.177z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask fill="#fff">
        <circle cx={15} cy={15} r={15} />
      </mask>
      <circle fill="#FFF" cx={15} cy={15} r={15} />
      <circle
        cx={15}
        cy={15}
        r={14.5}
        fill="#000"
        fillOpacity={0.1}
        stroke="#000"
        strokeLinecap="square"
        strokeOpacity={0.2}
      />
      <g>
        <g transform="translate(5 5)">
          <mask fill="#fff">
            <path d="M17 15.24c0 .757-.228 1.406-.684 1.947-.455.542-1.004.813-1.646.813H5.33c-.642 0-1.19-.27-1.646-.813C3.228 16.646 3 15.998 3 15.24c0-.59.031-1.148.093-1.672a8.612 8.612 0 0 1 .345-1.584c.167-.53.38-.986.64-1.364a3.005 3.005 0 0 1 1.027-.927c.427-.24.917-.36 1.472-.36.955.89 2.096 1.334 3.423 1.334s2.468-.445 3.423-1.334c.555 0 1.045.12 1.472.36.426.24.769.548 1.028.927.259.378.472.833.64 1.364.167.532.282 1.06.344 1.584S17 14.649 17 15.24zM12.964 3.177C13.788 3.955 14.2 4.896 14.2 6c0 1.104-.41 2.047-1.23 2.828C12.15 9.61 11.16 10 10 10c-1.16 0-2.15-.39-2.97-1.172C6.21 8.047 5.8 7.104 5.8 6c0-1.104.41-2.047 1.23-2.828C7.85 2.39 8.84 2 10 2c1.16 0 2.147.392 2.964 1.177z" />
          </mask>
          <path
            fill="#000"
            fillOpacity={0.3}
            fillRule="nonzero"
            d="M17 15.24c0 .757-.228 1.406-.684 1.947-.455.542-1.004.813-1.646.813H5.33c-.642 0-1.19-.27-1.646-.813C3.228 16.646 3 15.998 3 15.24c0-.59.031-1.148.093-1.672a8.612 8.612 0 0 1 .345-1.584c.167-.53.38-.986.64-1.364a3.005 3.005 0 0 1 1.027-.927c.427-.24.917-.36 1.472-.36.955.89 2.096 1.334 3.423 1.334s2.468-.445 3.423-1.334c.555 0 1.045.12 1.472.36.426.24.769.548 1.028.927.259.378.472.833.64 1.364.167.532.282 1.06.344 1.584S17 14.649 17 15.24zM12.964 3.177C13.788 3.955 14.2 4.896 14.2 6c0 1.104-.41 2.047-1.23 2.828C12.15 9.61 11.16 10 10 10c-1.16 0-2.15-.39-2.97-1.172C6.21 8.047 5.8 7.104 5.8 6c0-1.104.41-2.047 1.23-2.828C7.85 2.39 8.84 2 10 2c1.16 0 2.147.392 2.964 1.177z"
          />
          <mask fill="#fff">
            <path fill="#6A6A6A" d="M0 0h20v20H0z" />
          </mask>
        </g>
      </g>
    </g>
  </svg>
);
