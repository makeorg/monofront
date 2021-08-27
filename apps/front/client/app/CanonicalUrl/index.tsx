import React, { FC } from 'react';
import { Link } from 'react-head';
import { useLocation } from 'react-router';
import { env } from '@make.org/assets/env';

export const CanonicalUrl: FC = () => {
  const { pathname, search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const canonicalUrlParams = new URLSearchParams();
  let canonicalSearch = '';
  const value = urlParams.get('query');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const FRONT_URL: string = env.frontUrl() || window.FRONT_URL;

  // accept only query param for search
  if (value) {
    canonicalUrlParams.append('query', value);
    canonicalSearch = `?${canonicalUrlParams.toString()}`;
  }

  return (
    <Link
      rel="canonical"
      href={`${FRONT_URL}${pathname}${canonicalSearch}`}
      data-cy="canonical_url"
    />
  );
};
