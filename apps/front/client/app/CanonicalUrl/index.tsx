import React, { FC } from 'react';
import { Link } from 'react-head';
import { useLocation } from 'react-router';
import { env } from '@make.org/assets/env';
import { handleSearchParams } from '../../helpers/url';

declare global {
  interface Window {
    FRONT_URL?: string;
  }
}

export const CanonicalUrl: FC = () => {
  const { pathname, search } = useLocation();
  const FRONT_URL = env.frontUrl() || window.FRONT_URL;
  const sanitizedParams = handleSearchParams(search);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: remove after upgrade to react18
    <Link
      rel="canonical"
      href={`${FRONT_URL}${pathname}${sanitizedParams}`}
      data-cy="canonical_url"
    />
  );
};
