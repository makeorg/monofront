/* eslint-disable @typescript-eslint/ban-ts-comment */
import { env } from '@make.org/assets/env';
import { twitter } from '@make.org/utils/services/Trackers/twttr.js';
import { Logger } from '../Logger';
import trackingConfiguration from '../trackingConfiguration.yaml';
import { ExpressService } from '../Express';

const twPixelId: string = env.twPixelId();
const twitterEventMapping = {
  [trackingConfiguration.CLICK_PROPOSAL_SUBMIT.key]: 'o2q9h',
  [trackingConfiguration.CLICK_PROPOSAL_UNVOTE.key]: 'o2q9n',
  [trackingConfiguration.CLICK_PROPOSAL_VOTE.key]: 'o2q9d',
  [trackingConfiguration.CLICK_SEQUENCE_FIRST_VOTE.key]: 'o2q9f',
  [trackingConfiguration.CLICK_START_SEQUENCE.key]: 'o2q9t', // = click-sequence-launch on twitter
  [trackingConfiguration.CLICK_SEQUENCE_OPEN.key]: 'o2q9j',
  [trackingConfiguration.DISPLAY_PAGE_OPERATION.key]: 'o2q9i',
  [trackingConfiguration.DISPLAY_PROPOSAL_SUBMIT_VALIDATION.key]: 'o2q9g',
  [trackingConfiguration.DISPLAY_SEQUENCE.key]: 'o2q9e',
  [trackingConfiguration.DISPLAY_INTRO_CARD.key]: 'o2q9l', // = display-sequence-intro-card on twitter
  [trackingConfiguration.CLICK_PROPOSAL_QUALIFY.key]: 'o2q9o',
  [trackingConfiguration.CLICK_PROPOSAL_UNQUALIFY.key]: 'o2q9p',
  [trackingConfiguration.CLICK_PROPOSAL_VIEW_MORE.key]: 'o2q9q', // = click-proposal-viewmore on twitter
};

export const TwitterTracking = {
  async track(action: string, eventId: string): Promise<void> {
    // @ts-ignore
    if (twitterEventMapping[action] === undefined) {
      return;
    }

    // @ts-ignore
    const eventName = `tw-${twPixelId}-${twitterEventMapping[action]}`;

    if (env.isDev()) {
      console.log(`Tracking Twitter: event ${eventName}`);
      return;
    }
    if (!twitter.initialized()) {
      Logger.logInfo({
        message: `Twitter Tracking not initialized. Action : ${action}`,
        name: 'tracking-init',
      });
      return;
    }

    // pixel TW
    try {
      twitter.track(eventName, action, eventId);
    } catch (e) {
      const error = e as string;
      Logger.logError(error);
    }

    const searchParams = new URLSearchParams(window.location.search);
    const twclid = searchParams.get('twclid');

    // Conversion API requires Twitter Click ID (twclid) as the identifier for a conversion event
    // More informations : https://developer.twitter.com/en/docs/twitter-ads-api/measurement/web-conversions/conversion-api
    if (twclid) {
      ExpressService.sendTwEventConversion(eventName, twclid, eventId);
    }
  },
};

declare global {
  interface Window {
    twq?: unknown;
  }
}

export const TwitterPixel = {
  init(): void {
    if (env.isTest() || env.isDev()) {
      return;
    }
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
};
