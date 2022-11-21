import React, { FC } from 'react';
import { Link } from 'react-head';
import { env } from '@make.org/assets/env';
import { isHomepageWithLocale } from '@make.org/utils/routes';
import { useLocation } from 'react-router';
import { translationRessoucesLanguages } from '../../../i18n';

declare global {
  interface Window {
    FRONT_URL?: string;
  }
}

export const Hreflang: FC = () => {
  const { pathname } = useLocation();
  const FRONT_URL = env.frontUrl() || window.FRONT_URL;

  if (!isHomepageWithLocale(pathname)) {
    return null;
  }

  return (
    <>
      {translationRessoucesLanguages.map(language => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: remove after upgrade to react18
        <Link
          key={language}
          rel="alternate"
          hrefLang={language}
          href={`${FRONT_URL}${pathname}?lang=${language}`}
        />
      ))}
    </>
  );
};
