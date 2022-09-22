import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { A11yFR } from './FR';
import { A11yDE } from './DE';

export const A11y: FC = () => {
  const { state } = useAppContext();
  const { country } = state.appConfig;

  switch (country) {
    case 'FR':
      return <A11yFR />;
    case 'DE':
      return <A11yDE />;
    default:
      return null;
  }
};
// default export needed for loadable component
export default A11y; // eslint-disable-line import/no-default-export
