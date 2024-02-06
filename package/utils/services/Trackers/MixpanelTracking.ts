/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable block-scoped-var */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-multi-assign */
/* eslint-disable prefer-rest-params */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
import { env } from '@make.org/assets/env';
import { Logger } from '../Logger';

const PRODUCTION_DOMAIN = 'make.org';
const FRONT_URL = env.frontUrl() || window.FRONT_URL;
const isProductionUrl = FRONT_URL?.includes(PRODUCTION_DOMAIN);

const MIXPANEL_TOKEN = isProductionUrl
  ? 'c1b88044cfaf328aeada3e6c16bec5ba'
  : 'd6ee57431516162bc7bbbcd173bb876d';
const MIXPANEL_SCRIPT_URL =
  'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';

type MixpanelEventParams = {
  source?: string;
  location?: string;
  url?: string;
  country?: string;
  language?: string;
  referer?: string;
  question?: string;
  cardPosition?: string;
  sequenceId?: string;
  proposalId?: string;
  questionId?: string;
  questionSlug?: string;
  distinctId?: string;
};

const mixpnl = {
  load() {
    if (this.isLoaded()) {
      return;
    }

    try {
      // @ts-ignore
      // eslint-disable-next-line func-names
      (function (f, b) {
        if (!b.__SV) {
          var e;
          var g;
          var i;
          var h;
          // @ts-ignore
          window.mixpanel = b;
          b._i = [];
          // @ts-ignore
          // eslint-disable-next-line func-names
          b.init = function (e, f, c) {
            // @ts-ignore
            function g(a, d) {
              var b = d.split('.');
              b.length == 2 && ((a = a[b[0]]), (d = b[1]));
              // eslint-disable-next-line func-names
              a[d] = function () {
                a.push([d].concat(Array.prototype.slice.call(arguments, 0)));
              };
            }
            var a = b;
            typeof c !== 'undefined' ? (a = b[c] = []) : (c = 'mixpanel');
            a.people = a.people || [];
            // @ts-ignore
            // eslint-disable-next-line func-names
            a.toString = function (a) {
              var d = 'mixpanel';
              c !== 'mixpanel' && (d += `.${c}`);
              a || (d += ' (stub)');
              return d;
            };
            // eslint-disable-next-line func-names
            a.people.toString = function () {
              return `${a.toString(1)}.people (stub)`;
            };
            i =
              'disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove'.split(
                ' '
              );
            for (h = 0; h < i.length; h++) g(a, i[h]);
            var j = 'set set_once union unset remove delete'.split(' ');
            // eslint-disable-next-line func-names
            a.get_group = function () {
              // @ts-ignore
              function b(c) {
                // @ts-ignore
                // eslint-disable-next-line func-names
                d[c] = function () {
                  // @ts-ignore
                  call2_args = arguments;
                  // @ts-ignore
                  call2 = [c].concat(Array.prototype.slice.call(call2_args, 0));
                  // @ts-ignore
                  a.push([e, call2]);
                };
              }
              for (
                var d = {},
                  e = ['get_group'].concat(
                    Array.prototype.slice.call(arguments, 0)
                  ),
                  c = 0;
                c < j.length;
                c++
              )
                b(j[c]);
              return d;
            };
            b._i.push([e, f, c]);
          };
          b.__SV = 1.2;
          e = f.createElement('script');
          e.type = 'text/javascript';
          e.async = !0;
          e.src =
            // @ts-ignore
            typeof MIXPANEL_CUSTOM_LIB_URL !== 'undefined'
              ? // @ts-ignore
                MIXPANEL_CUSTOM_LIB_URL
              : MIXPANEL_SCRIPT_URL;
          g = f.getElementsByTagName('script')[0];
          // @ts-ignore
          g.parentNode.insertBefore(e, g);
        }
        // @ts-ignore
      })(document, window.mixpanel || []);

      // @ts-ignore
      window.mixpanel.init(MIXPANEL_TOKEN, {
        api_host: 'https://api-eu.mixpanel.com',
        opt_out_tracking_by_default: false,
        disable_persistence: true,
        // debug: true
      });
    } catch (e) {
      const error = e as string;
      Logger.logError(error);
    }
  },
  isLoaded() {
    // @ts-ignore
    return window && window.mixpanel;
  },
};

const isMixpanelInitialized = (): boolean => !!mixpnl.isLoaded();
let isEnabled = false;

export const MixpanelTracking = {
  init(): void {
    mixpnl.load();
    isEnabled = true;
  },
  isInitialized(): void {
    isMixpanelInitialized();
  },
  track(eventName: string, eventParameters: MixpanelEventParams): void {
    if (!isEnabled) {
      return;
    }

    if (!isMixpanelInitialized()) {
      // Todo handle cleanly with and without init
      Logger.logWarning({
        message: `Failed to track event ${eventName}: MixpanelTracking should be initialized`,
        name: 'tracking-init',
      });
      return;
    }

    if (!eventParameters.distinctId) {
      Logger.logWarning({
        message: `Failed to track event ${eventName}: empty distinctId`,
        name: 'tracking-init',
      });
      return;
    }

    if (env.isDev() || env.isTest()) {
      // eslint-disable-next-line no-console
      console.info(
        `Tracking Custom Mixpanel (${MIXPANEL_TOKEN})
        event => ${eventName}
        params => ${JSON.stringify(eventParameters)}`
      );
      return;
    }

    try {
      // @ts-ignore
      window.mixpanel.identify(eventParameters.distinctId);
      // eslint-disable-next-line no-param-reassign
      delete eventParameters.distinctId;
      // @ts-ignore
      window.mixpanel.track(eventName, eventParameters);
    } catch (e) {
      // @ts-ignore
      Logger.logError(e);
    }
  },
};
