

import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { setLanguageCode } from '@make.org/store/actions/appConfig';
import { useAppContext } from '@make.org/store';

export const LanguageListener = (): null => {
  const { dispatch } = useAppContext();
  const query = new URLSearchParams(useLocation().search);
  const language = query.get('lang');

  useEffect(
    () => {
      if (language) {
        dispatch(setLanguageCode(language));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language]
  );

  return null;
};
