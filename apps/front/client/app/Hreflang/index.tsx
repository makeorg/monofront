import React, { FC } from 'react';
import { Link } from 'react-head';
import { env } from '@make.org/assets/env';
import { isHomepageWithLocale } from '@make.org/utils/routes';
import { useLocation } from 'react-router';
import { translationRessoucesLanguages } from '../../../i18n';

export const Hreflang: FC = () => {
  const { pathname } = useLocation();

  if (!isHomepageWithLocale(pathname)) {
    return null;
  }

  return (
    <>
      {translationRessoucesLanguages.map(language => (
        <Link
          key={language}
          rel="alternate"
          hrefLang={language}
          href={`${env.frontUrl()}${pathname}?lang=${language}`}
        />
      ))}
    </>
  );
};
