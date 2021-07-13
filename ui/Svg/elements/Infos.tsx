/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgInfos: React.FC = (props: SvgPropsType) => (
  <svg width={20} height={20} viewBox="0 0 20 20" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        className="tofill"
        fill="#FFF"
        d="M13.333 16.25v-2.083a.406.406 0 00-.117-.3.406.406 0 00-.3-.117h-1.25V7.083a.406.406 0 00-.117-.3.406.406 0 00-.299-.116H7.083a.406.406 0 00-.3.117.406.406 0 00-.116.3v2.083a.41.41 0 00.117.3.406.406 0 00.3.116h1.25v4.167h-1.25a.406.406 0 00-.3.117.406.406 0 00-.117.3v2.083c0 .122.039.221.117.3a.406.406 0 00.3.117h5.833a.41.41 0 00.3-.118.406.406 0 00.116-.299zM11.667 4.583V2.5a.406.406 0 00-.118-.3.406.406 0 00-.299-.117h-2.5a.406.406 0 00-.3.118.406.406 0 00-.117.299v2.083c0 .122.04.222.118.3A.406.406 0 008.75 5h2.5c.122 0 .221-.04.3-.117a.406.406 0 00.117-.3zm6.992.404C19.553 6.515 20 8.186 20 10s-.447 3.487-1.341 5.02a9.955 9.955 0 01-3.64 3.639C13.488 19.553 11.815 20 10 20s-3.487-.447-5.02-1.341a9.955 9.955 0 01-3.639-3.64C.447 13.488 0 11.815 0 10s.447-3.487 1.341-5.02a9.955 9.955 0 013.64-3.639C6.512.447 8.185 0 10 0s3.487.447 5.02 1.341a9.94 9.94 0 013.639 3.646z"
      />
      <path d="M0 0h20v20H0z" />
    </g>
  </svg>
);
