import { useAppContext } from '@make.org/store';
import { useEffect } from 'react';
import { match, useRouteMatch } from 'react-router';
import {
  DEFAULT_COUNTRY,
  DEFAULT_LANGUAGE,
} from '@make.org/utils/constants/config';
import { getLanguageFromCountryCode } from '@make.org/utils/helpers/countries';
import { setCountryCode } from '@make.org/store/actions/appConfig';
import { ROUTE_COUNTRY, BASE_PREVIEW_PATH } from '@make.org/utils/routes';

export const CountryListener = (): null => {
  let country = DEFAULT_COUNTRY;
  const routeMatching: match<{ country: string }> | null = useRouteMatch({
    path: `(${BASE_PREVIEW_PATH})?${ROUTE_COUNTRY}`,
  });

  if (routeMatching) {
    const { params } = routeMatching;
    country = params.country;
  }

  const upperCountry = country && country.toUpperCase();
  const { dispatch } = useAppContext();

  useEffect(
    () => {
      if (upperCountry) {
        dispatch(
          setCountryCode(upperCountry, getLanguageFromCountryCode(upperCountry))
        );
      } else {
        dispatch(setCountryCode(DEFAULT_COUNTRY, DEFAULT_LANGUAGE));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [upperCountry]
  );

  return null;
};
