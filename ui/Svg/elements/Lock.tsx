/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgLock: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={13} height={16} viewBox="0 0 13 16" {...props}>
    <path
      className="tofill"
      d="M12.684 7.59a1.041 1.041 0 0 0-.768-.317h-.36V5.09c0-1.394-.497-2.59-1.49-3.59S7.884 0 6.5 0 3.927.5 2.934 1.5c-.993 1-1.49 2.197-1.49 3.59v2.183h-.36c-.302 0-.557.106-.768.318-.21.212-.316.47-.316.773v6.545c0 .303.105.56.316.773.21.212.466.318.767.318h10.834c.3 0 .556-.106.767-.318.21-.212.316-.47.316-.773V8.364c0-.303-.105-.56-.316-.773zm-3.295-.317H3.61V5.09c0-.803.282-1.489.846-2.057A2.774 2.774 0 0 1 6.5 2.182c.798 0 1.478.284 2.043.852.564.568.846 1.254.846 2.057z"
    />
  </svg>
);
