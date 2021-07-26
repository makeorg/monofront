import React from 'react';
import { useAppContext } from '@make.org/store';
import { FooterDE } from './localized/DE';
import { FooterFR } from './localized/FR';
import { FooterINT } from './localized/INT';

/**
 * Renders Main Footer
 */
export const Footer = () => {
  const { state } = useAppContext();
  const { language } = state.appConfig;

  switch (language) {
    case 'fr':
      return <FooterFR />;
    case 'de':
      return <FooterDE />;
    default:
      return <FooterINT />;
  }
};
