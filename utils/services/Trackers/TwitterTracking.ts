/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-spread */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { env } from '@make.org/assets/env';
import { Logger } from '../Logger';
import trackingConfiguration from '../trackingConfiguration.yaml';
import { twttr } from './twttr.js';

const TWITTER_UNIVERSAL_MAKE_TAG = 'o2q8v';
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

const isTWInitialized = () => {
  if (!twttr.initialized()) {
    Logger.logWarning({
      message: 'Twitter Tracking not initialized',
      name: 'tracking-init',
    });
  }

  return twttr.initialized();
};

export const TwitterTracking = {
  track(action: string): void {
    // @ts-ignore
    if (twitterEventMapping[action] === undefined) {
      return;
    }

    // @ts-ignore
    const eventName = twitterEventMapping[action];

    if (env.isDev()) {
      console.log(`Tracking Twitter: event ${eventName}`);
      return;
    }

    if (!isTWInitialized()) {
      return;
    }

    twttr.track(eventName);
  },
};

export const TwitterUniversalTag = {
  init(): void {
    if (env.isTest() || env.isDev()) {
      return;
    }

    try {
      // @ts-ignore
      !(function (e, t, n, s, u, a) {
        // @ts-ignore
        e.twq ||
          // @ts-ignore
          ((s = e.twq =
            function (): void {
              // @ts-ignore
              s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
            }),
          // @ts-ignore
          (s.version = '1.1'),
          // @ts-ignore
          (s.queue = []),
          // @ts-ignore
          (u = t.createElement(n)),
          // @ts-ignore
          (u.async = !0),
          // @ts-ignore
          (u.src = 'https://static.ads-twitter.com/uwt.js'),
          // @ts-ignore
          (a = t.getElementsByTagName(n)[0]),
          // @ts-ignore
          a.parentNode.insertBefore(u, a));
      })(window, document, 'script');
      // @ts-ignore
      twq('init', TWITTER_UNIVERSAL_MAKE_TAG);
    } catch (e) {
      // @ts-ignore
      Logger.logError(e);
    }
  },
  pageView(): void {
    if (env.isTest() || env.isDev()) {
      console.log(`Tracking Twitter: event PageView`);
      return;
    }

    try {
      // @ts-ignore
      twq('track', 'PageView');
    } catch (e) {
      // @ts-ignore
      Logger.logError(e);
    }
  },
};
