/* eslint-disable */
import { env } from '@make.org/assets/env';
import { Logger } from '../Logger';
import trackingConfiguration from '../trackingConfiguration.yaml';
import { twttr } from './twttr.js';

const TWITTER_UNIVERSAL_MAKE_TAG = 'o2q8v';
const twitterEventMapping = {
  // [trackingConfiguration.CLICK_PROPOSAL_SUBMIT.key]: 'o2q9h',
  // [trackingConfiguration.CLICK_PROPOSAL_UNVOTE.key]: 'o2q9n',
  // [trackingConfiguration.CLICK_PROPOSAL_VOTE.key]: 'o2q9d',
  // [trackingConfiguration.CLICK_SEQUENCE_FIRST_VOTE.key]: 'o2q9f',
  // [trackingConfiguration.CLICK_START_SEQUENCE.key]: 'o2q9t', // = click-sequence-launch on twitter
  // [trackingConfiguration.CLICK_SEQUENCE_OPEN.key]: 'o2q9j',
  // [trackingConfiguration.DISPLAY_PAGE_OPERATION.key]: 'o2q9i',
  // [trackingConfiguration.DISPLAY_PROPOSAL_SUBMIT_VALIDATION.key]: 'o2q9g',
  // [trackingConfiguration.DISPLAY_SEQUENCE.key]: 'o2q9e',
  // [trackingConfiguration.DISPLAY_INTRO_CARD.key]: 'o2q9l', // = display-sequence-intro-card on twitter
  // [trackingConfiguration.CLICK_PROPOSAL_QUALIFY.key]: 'o2q9o',
  // [trackingConfiguration.CLICK_PROPOSAL_UNQUALIFY.key]: 'o2q9p',
  // [trackingConfiguration.CLICK_PROPOSAL_VIEW_MORE.key]: 'o2q9q', // = click-proposal-viewmore on twitter
};

const isTWInitialized = () => {
  if (!twttr.initialized()) {
    Logger.logWarning('Twitter Tracking not initialized');
  }

  return twttr.initialized();
};

export const TwitterTracking = {
  track(action) {
    if (twitterEventMapping[action] === undefined) {
      return;
    }

    const eventName = twitterEventMapping[action];

    if (env.isDev()) {
      Logger.logInfo(`Tracking Twitter: event ${eventName}`);
      return;
    }

    if (!isTWInitialized()) {
      return;
    }

    twttr.track(eventName);
  },
};

export const TwitterUniversalTag = {
  init() {
    if (env.isTest() || env.isDev()) {
      return;
    }

    !(function (e, t, n, s, u, a) {
      e.twq ||
        ((s = e.twq =
          function () {
            s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
          }),
        (s.version = '1.1'),
        (s.queue = []),
        (u = t.createElement(n)),
        (u.async = !0),
        (u.src = 'https://static.ads-twitter.com/uwt.js'),
        (a = t.getElementsByTagName(n)[0]),
        a.parentNode.insertBefore(u, a));
    })(window, document, 'script');
    twq('init', TWITTER_UNIVERSAL_MAKE_TAG);
  },
  pageView() {
    if (env.isTest() || env.isDev()) {
      Logger.logInfo('Tracking Twitter: event pageView');
      return;
    }
    twq('track', 'PageView');
  },
  /* eslint-enable */
};
