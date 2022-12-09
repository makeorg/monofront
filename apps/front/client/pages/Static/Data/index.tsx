import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { LocaleType } from '@make.org/types/enums';
import { DataFR } from './FR';
import { DataEN } from './EN';
import { DataDE } from './DE';
import { DataCS } from './CS';
import { DataUK } from './UK';

export const Data: FC = () => {
  const { state } = useAppContext();
  const { language } = state.appConfig;

  switch (language) {
    case [LocaleType.fr].toString():
      return <DataFR />;
    case [LocaleType.de].toString():
      return <DataDE />;
    case [LocaleType.uk].toString():
      return <DataUK />;
    case [LocaleType.cs].toString():
      return <DataCS />;
    default:
      return <DataEN />;
  }
};
// default export needed for loadable component
export default Data; // eslint-disable-line import/no-default-export
