/* eslint-disable no-undef */
import { asserts, xhrRequests, xhrTrackingRequests } from './requests.js';

let executed = false;

beforeEach(() => {
  asserts.list = {};
  xhrRequests.list = {};
  xhrTrackingRequests.list = {};
  executed = false;
  cy.setCookie(
    'make-cookie-preferences',
    JSON.stringify({
      tracking_consent: {
        facebook_tracking: true,
        twitter_tracking: true,
        facebook_sharing: true,
        twitter_sharing: true,
        linkedin_sharing: true,
      },
    })
  );
});

afterEach(() => {
  // avoid to execute twice due to async in hook
  if (!executed) {
    executed = true;
    const endpoints = Object.keys(asserts.list);
    const executeAsserts = endpoint => {
      while (asserts.list[endpoint].length) {
        asserts.list[endpoint].shift()();
      }
    };
    endpoints.forEach(endpoint => {
      if (!xhrRequests.list[endpoint]) {
        executeAsserts(endpoint);
        return;
      }
      cy.waitForAll(endpoint);
      executeAsserts(endpoint);
    });
  }
});
