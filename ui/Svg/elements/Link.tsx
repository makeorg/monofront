/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';
export const SvgLink: React.FC = (props: SvgPropsType) => (
  <svg width={14} height={14} viewBox="0 0 14 14" {...props}>
    <path
      className="tofill"
      d="M13.278 8.543L11.494 6.76a2.382 2.382 0 00-1.75-.72c-.698 0-1.292.251-1.784.754l-.755-.754c.503-.492.755-1.09.755-1.793 0-.686-.237-1.267-.712-1.741L5.48.729A2.35 2.35 0 003.73 0c-.685 0-1.265.237-1.74.712L.73 1.964A2.34 2.34 0 000 3.706c0 .686.24 1.27.72 1.75l1.785 1.783c.48.48 1.063.721 1.75.721.697 0 1.292-.252 1.783-.755l.755.755a2.413 2.413 0 00-.755 1.793c0 .686.238 1.266.712 1.74l1.768 1.776a2.35 2.35 0 001.75.73c.685 0 1.266-.238 1.74-.713l1.261-1.252a2.34 2.34 0 00.73-1.741c0-.686-.24-1.27-.721-1.75zm-7.24-3.67l-.158-.164a5.32 5.32 0 00-.184-.184 2.074 2.074 0 00-.163-.129.691.691 0 00-.455-.141.794.794 0 00-.583.24.794.794 0 00-.24.583.689.689 0 00.141.455c.054.074.097.128.129.163.031.034.093.095.184.184l.163.159a.83.83 0 01-.618.266.79.79 0 01-.583-.232L1.887 4.29a.794.794 0 01-.24-.583c0-.223.08-.415.24-.575l1.26-1.252a.828.828 0 01.584-.232c.229 0 .423.08.584.24L6.08 3.663c.16.16.24.354.24.583 0 .24-.094.449-.282.626zm6.074 5.994L10.85 12.12a.827.827 0 01-.584.223.79.79 0 01-.583-.232l-1.767-1.775a.794.794 0 01-.24-.583c0-.24.095-.45.283-.627l.159.163c.089.092.15.153.185.185.034.031.088.074.162.129a.687.687 0 00.455.141c.229 0 .423-.08.583-.24.16-.16.24-.354.24-.583a.686.686 0 00-.142-.455 2.07 2.07 0 00-.128-.163 5.695 5.695 0 00-.184-.184 35.733 35.733 0 01-.163-.159.817.817 0 01.617-.274c.229 0 .423.08.583.24L12.11 9.71c.16.16.24.355.24.583 0 .223-.08.415-.24.574z"
    />
  </svg>
);
