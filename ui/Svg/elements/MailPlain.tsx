/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgPropsType } from '@make.org/types';

export const SvgMailPlain: React.FC<SvgPropsType> = (props: SvgPropsType) => (
  <svg width={20} height={20} viewBox="0 0 20 20" {...props}>
    <path
      className="tofill"
      d="M19.621 6.953a.235.235 0 01.379.184v7.988C20 16.16 19.16 17 18.125 17H1.875A1.876 1.876 0 010 15.125V7.141c0-.196.223-.305.379-.184.875.68 2.035 1.543 6.02 4.438.824.601 2.214 1.867 3.601 1.859 1.395.012 2.813-1.281 3.605-1.86 3.985-2.894 5.141-3.761 6.016-4.44zM10 12c.906.016 2.21-1.14 2.867-1.617 5.184-3.762 5.578-4.09 6.774-5.028A.934.934 0 0020 4.617v-.742C20 2.84 19.16 2 18.125 2H1.875C.84 2 0 2.84 0 3.875v.742c0 .29.133.559.36.738 1.195.934 1.59 1.266 6.773 5.028.656.476 1.96 1.633 2.867 1.617z"
    />
  </svg>
);
