import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import i18n from 'i18next';
import { translationRessources } from '../i18n';

export const serverInitI18n = (): void => {
  i18n.init({
    interpolation: {
      escapeValue: false,
    },
    lng: DEFAULT_LANGUAGE,
    debug: false,
    resources: translationRessources,
    defaultNS: 'common',
  });
};
