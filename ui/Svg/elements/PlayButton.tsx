/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

export const SvgPlayButton: React.FC<React.HTMLAttributes> = (props) => (
  <svg width={14} height={16} viewBox="0 0 13.8 16.1" {...props}>
    <path
      className="tofill"
      d="M13.573 7.726L.55.078C.4-.014.271-.024.163.046.057.116 0 .238 0 .418v15.263c0 .18.057.303.162.373.109.07.237.06.39-.031l13.02-7.65c.153-.09.228-.198.228-.32 0-.126-.077-.234-.227-.325zm0 0"
    />
  </svg>
);
