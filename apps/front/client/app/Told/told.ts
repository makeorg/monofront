/* eslint-disable */
// @ts-nocheck

import { ILogger } from '@make.org/types';
import { env } from '@make.org/assets/env';

const defaultLogger = {
  logError: (data: unknown) => console.error(data),
  logWarning: (data: unknown) => console.warn(data),
  logInfo: (data: unknown) => console.info(data),
};

export const told = {
  load(toldToken: string, logger: ILogger = defaultLogger): void {
    try {
      (function (w, d, e, v, o, l, t) {
        w['ToldWidget'] = o;
        w[o] =
          w[o] ||
          function () {
            (w[o].q = w[o].q || []).push(arguments);
          };
        w[o].l = 1 * new Date();
        l = document.createElement(e);
        t = document.getElementsByTagName(e)[0];
        l.async = 1;
        l.src = v;
        l.onload = () => window.told('init', toldToken);
        t.parentNode.insertBefore(l, t);
      })(
        window,
        document,
        'script',
        'https://scripts.told.club/sdk/sdk.js',
        'told'
      );
    } catch (e) {
      const error = e as string;
      logger.logError(error);
    }
  },
};
