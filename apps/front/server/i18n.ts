import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import i18n from 'i18next';
import { TRANSLATION_COMMON_NAMESPACE } from '@make.org/utils/i18n/constants';
import { translationRessources } from '../i18n';

export const serverInitI18n = (): void => {
  i18n.init({
    interpolation: {
      escapeValue: false,
    },
    lng: DEFAULT_LANGUAGE,
    debug: false,
    resources: translationRessources,
    defaultNS: TRANSLATION_COMMON_NAMESPACE,
  });
};
