import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { setLanguageCode } from '@make.org/store/actions/appConfig';
import { getLanguageFromPreferencesCookie } from '@make.org/utils/helpers/clientCookies';
import { useAppContext } from '@make.org/store';
import { translationRessoucesLanguages } from '@make.org/front/i18n/index';

export const LanguageListener = (): null => {
  const { dispatch } = useAppContext();
  const query = new URLSearchParams(useLocation().search);
  const queryLanguage = translationRessoucesLanguages.find(
    v => v === query.get('lang')
  );

  // language from cookies - on mount
  useEffect(
    () => {
      if (!queryLanguage) {
        const language = getLanguageFromPreferencesCookie();
        if (language) {
          dispatch(setLanguageCode(language));
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // language from query param - when query param update
  useEffect(
    () => {
      if (queryLanguage) {
        dispatch(setLanguageCode(queryLanguage));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryLanguage]
  );

  return null;
};
