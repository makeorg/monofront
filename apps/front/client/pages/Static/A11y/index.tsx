import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { LocaleType } from '@make.org/types/enums';
import { A11yFR } from './FR';
import { A11yDE } from './DE';
import { A11yUK } from './UK';
import { A11yCS } from './CS';

export const A11y: FC = () => {
  const { state } = useAppContext();
  const { language } = state.appConfig;

  switch (language) {
    case [LocaleType.fr].toString():
      return <A11yFR />;
    case [LocaleType.de].toString():
      return <A11yDE />;
    case [LocaleType.uk].toString():
      return <A11yUK />;
    case [LocaleType.cs].toString():
      return <A11yCS />;
    default:
      return null;
  }
};
// default export needed for loadable component
export default A11y; // eslint-disable-line import/no-default-export
