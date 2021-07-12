export const TWITTER_SCRIPT = 'https://platform.twitter.com/oct.js';
export const twttr = {
  initialized(): boolean {
    return window && window.twttr !== undefined;
  },

  track(eventName: string): void {
    return window.twttr.conversion.trackPid(eventName, {
      tw_sale_amount: 0,
      tw_order_quantity: 0,
    });
  },
};
