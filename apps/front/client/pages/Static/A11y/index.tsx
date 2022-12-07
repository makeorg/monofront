import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { A11yFR } from './FR';
import { A11yDE } from './DE';
import { A11yUA } from './UA';
import { A11yCZ } from './CZ';

export const A11y: FC = () => {
  const { state } = useAppContext();
  const { country } = state.appConfig;

  switch (country) {
    case 'FR':
      return <A11yFR />;
    case 'DE':
      return <A11yDE />;
    case 'UA':
      return <A11yUA />;
    case 'CZ':
      return <A11yCZ />;
    default:
      return null;
  }
};
// default export needed for loadable component
export default A11y; // eslint-disable-line import/no-default-export
