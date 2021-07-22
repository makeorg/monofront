/* eslint no-restricted-imports: 0 */
import i18next, { InitOptions, Callback, TFunction } from 'i18next';

let instance = i18next;

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
