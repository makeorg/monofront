/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const TWITTER_SCRIPT = 'https://static.ads-twitter.com/oct.js';
export const twitter = {
  initialized() {
    return window && window.twttr !== undefined;
  },

  track(eventName) {
    return window.twttr.conversion.trackPid(eventName, {
      tw_sale_amount: 0,
      tw_order_quantity: 0,
    });
  },
};
