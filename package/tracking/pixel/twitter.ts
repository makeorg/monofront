/* eslint-disable @typescript-eslint/ban-ts-comment */

export const twitterPixel = {
  load(twPixelId: string): void {
    if (window.twq) {
      return;
    }

    try {
      // @ts-ignore
      // eslint-disable-next-line no-unused-expressions, prettier/prettier, func-names, no-multi-assign, no-param-reassign, prefer-spread, prefer-rest-params, prefer-destructuring
        !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script'); // eslint-disable-line no-use-before-define

      // @ts-ignore
      twq('config', twPixelId);
    } catch (e) {
      // @ts-ignore
      Logger.logError(e);
    }
  },
  isLoaded(): boolean {
    return !!(window && window.twq);
  },
  track(action: string, eventId: string): void {
    if (!this.isLoaded()) {
      return;
    }
    // @ts-ignore
    window.twq('event', action, {
      description: action,
      conversion_id: eventId,
    });
  },
};
