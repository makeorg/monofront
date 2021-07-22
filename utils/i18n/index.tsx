/* eslint no-restricted-imports: 0 */
import React, { createContext } from 'react';
import i18next, { InitOptions, Callback, TFunction, Resource } from 'i18next';
import { env } from '@make.org/assets/env';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import { useAppContext } from '@make.org/store';

let instance = i18next;

export const I18nContext = createContext({
  initLocales: (keys: Resource) => {}, // eslint-disable-line
});

export const i18n = {
  t: instance.t,
  getLanguage: (): string => instance.language,
  init: (options: InitOptions, callback?: Callback): Promise<TFunction> =>
    instance.init(options, callback),
  changeLanguage: (lng: string, callback?: Callback): Promise<TFunction> =>
    instance.changeLanguage(lng, callback),
  cloneInstance: (options?: InitOptions, callback?: Callback): void => {
    instance = i18next.cloneInstance(options, callback);
  },
  getResourceBundle: (lng: string, ns: string): any =>
    instance.getResourceBundle(lng, ns),
  getResource: (
    lng: string,
    ns: string,
    key: string,
    options?: InitOptions
  ): any => instance.getResource(lng, ns, key, options),
};

export const LocalesContext: React.FC = ({ children }) => {
  const { state } = useAppContext();
  const { language } = state.appConfig;

  const initLocales = (keys: Resource) => {
    i18n.init({
      interpolation: {
        escapeValue: false,
      },
      debug: env.isDev(),
      lng: language || DEFAULT_LANGUAGE,
      resources: keys,
    });
  };

  return (
    <I18nContext.Provider value={{ initLocales }}>
      {children}
    </I18nContext.Provider>
  );
};
