import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { DataFR } from './FR';
import { DataEN } from './EN';
import { DataDE } from './DE';
import { DataUA } from './UA';

export const Data: FC = () => {
  const { state } = useAppContext();
  const { language } = state.appConfig;

  switch (language) {
    case 'fr':
      return <DataFR />;
    case 'de':
      return <DataDE />;
    case 'uk':
      return <DataUA />;
    default:
      return <DataEN />;
  }
};
// default export needed for loadable component
export default Data; // eslint-disable-line import/no-default-export
