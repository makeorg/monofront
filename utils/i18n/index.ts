/* eslint no-restricted-imports: 0 */
import i18next, { InitOptions, Callback } from 'i18next';

let instance = i18next;

export const i18n = {
  t: instance.t,
  getLanguage: (): string => instance.language,
  init: (options: InitOptions, callback?: Callback) => instance.init(options, callback),
  changeLanguage: (lng: string, callback?: Callback) => instance.changeLanguage(lng, callback),
  cloneInstance: (options?: InitOptions, callback?: Callback): void => {
    instance = i18next.cloneInstance(options, callback);
  },
  getResourceBundle: (lng: string, ns: string) => instance.getResourceBundle(lng, ns),
  getResource: (lng: string, ns: string, key: string, options?: InitOptions) => instance.getResource(lng, ns, key, options),
};
