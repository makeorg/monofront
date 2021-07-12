/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

export const SvgFacebookLogo: React.FC = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} viewBox="0 0 16 16" {...props}>
    <path d="M15.12.88A2.89 2.89 0 0 0 13 0H3A2.89 2.89 0 0 0 .88.88 2.89 2.89 0 0 0 0 3v10c0 .826.293 1.533.88 2.12A2.89 2.89 0 0 0 3 16h10a2.89 2.89 0 0 0 2.12-.88A2.89 2.89 0 0 0 16 13V3a2.89 2.89 0 0 0-.88-2.12zm-1.505 7.35h-1.823v6.614h-2.73V8.229H7.699V5.948h1.365V4.583c0-.979.229-1.719.687-2.219.458-.5 1.215-.75 2.271-.75h1.823v2.282h-1.146c-.389 0-.637.067-.745.203-.107.135-.161.373-.161.713v1.136h2.062z" />
  </svg>
);
