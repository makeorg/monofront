import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { LocaleType } from '@make.org/types/enums';
import { TermsOfUseFR } from './FR';
import { TermsOfUseEN } from './EN';
import { TermsOfUseDE } from './DE';
import { TermsOfUseUK } from './UK';

export const TermsOfUse: FC = () => {
  const { state } = useAppContext();
  const { language } = state.appConfig;

  switch (language) {
    case [LocaleType.fr].toString():
      return <TermsOfUseFR />;
    case [LocaleType.de].toString():
      return <TermsOfUseDE />;
    case [LocaleType.uk].toString():
      return <TermsOfUseUK />;
    default:
      return <TermsOfUseEN />;
  }
};

// default export needed for loadable component
export default TermsOfUse; // eslint-disable-line import/no-default-export
