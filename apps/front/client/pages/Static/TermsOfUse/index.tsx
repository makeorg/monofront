import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { TermsOfUseFR } from './FR';
import { TermsOfUseEN } from './EN';
import { TermsOfUseDE } from './DE';
import { TermsOfUseUK } from './UK';

export const TermsOfUse: FC = () => {
  const { state } = useAppContext();
  const { language } = state.appConfig;

  switch (language) {
    case 'fr':
      return <TermsOfUseFR />;
    case 'de':
      return <TermsOfUseDE />;
    case 'uk':
      return <TermsOfUseUK />;
    default:
      return <TermsOfUseEN />;
  }
};

// default export needed for loadable component
export default TermsOfUse; // eslint-disable-line import/no-default-export
