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

  // accept only query param for search
  if (value) {
    canonicalUrlParams.append('query', value);
    canonicalSearch = `?${canonicalUrlParams.toString()}`;
  }

  return (
    <Link
      rel="canonical"
      href={`${env.frontUrl()}${pathname}${canonicalSearch}`}
      data-cy="canonical_url"
    />
  );
};
