/* eslint-disable */

import { ILogger } from '../interface';

const MIXPANEL_SCRIPT_URL =
  'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';
const MIXPANEL_API_HOST = 'https://api-eu.mixpanel.com';

const defaultLogger = {
  logError: (data: unknown) => console.error(data),
  logWarning: (data: unknown) => console.warn(data),
  logInfo: (data: unknown) => console.info(data),
};

export const mixpnl = {
  load(
    mixpanelToken: string,
    mixpanelLibUrl: string = MIXPANEL_SCRIPT_URL,
    logger: ILogger = defaultLogger
  ) {
    if (this.isLoaded()) {
      return;
    }

    try {
      // @ts-ignore
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

          b.init = function (e, f, c) {
            // @ts-ignore
            function g(a, d) {
              var b = d.split('.');
              b.length == 2 && ((a = a[b[0]]), (d = b[1]));

              a[d] = function () {
                a.push([d].concat(Array.prototype.slice.call(arguments, 0)));
              };
            }
            var a = b;
            typeof c !== 'undefined' ? (a = b[c] = []) : (c = 'mixpanel');
            a.people = a.people || [];
            // @ts-ignore

            a.toString = function (a) {
              var d = 'mixpanel';
              c !== 'mixpanel' && (d += `.${c}`);
              a || (d += ' (stub)');
              return d;
            };

            a.people.toString = function () {
              return `${a.toString(1)}.people (stub)`;
            };
            i =
              'disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove'.split(
                ' '
              );
            for (h = 0; h < i.length; h++) g(a, i[h]);
            var j = 'set set_once union unset remove delete'.split(' ');

            a.get_group = function () {
              // @ts-ignore
              function b(c) {
                // @ts-ignore

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
          e.src = mixpanelLibUrl;
          g = f.getElementsByTagName('script')[0];
          // @ts-ignore
          g.parentNode.insertBefore(e, g);
        }
        // @ts-ignore
      })(document, window.mixpanel || []);

      // @ts-ignore
      window.mixpanel.init(mixpanelToken, {
        api_host: MIXPANEL_API_HOST,
        opt_out_tracking_by_default: false,
        disable_persistence: true,
        // debug: true
      });
    } catch (e) {
      const error = e as string;
      logger.logError(error);
    }
  },
  isLoaded() {
    // @ts-ignore
    return window && window.mixpanel;
  },
  identify(distinctId: string) {
    if (this.isLoaded()) {
      // @ts-ignore
      window.mixpanel.identify(distinctId);
    }
  },
  track(eventName: string, eventParameters: unknown) {
    if (this.isLoaded()) {
      // @ts-ignore
      window.mixpanel.track(eventName, eventParameters);
    }
  },
  revoke() {
    // @ts-ignore
    window.mixpanel.opt_out_tracking();
  },
};
