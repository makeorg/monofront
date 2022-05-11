/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Then, Given } from 'cypress-cucumber-preprocessor/steps';

// register requests by endpoint
export const xhrRequests = { list: {} };

// register tracking requests by tracking name
export const xhrTrackingRequests = { list: {} };

// register asserts by endpoint
export const asserts = { list: {} };

const getExpectedValue = values => {
  switch (Cypress.env('application')) {
    case 'widget': {
      if (values.widgetValue === undefined && values.value === undefined) {
        throw new Error('Missing widgetValue column');
      }
      const value =
        values.widgetValue !== undefined ? values.widgetValue : values.value;

      return value === 'null' ? null : value;
    }
    default: {
      if (values.frontValue === undefined && values.value === undefined) {
        throw new Error('Missing frontValue column');
      }
      const value =
        values.frontValue !== undefined ? values.frontValue : values.value;

      return value === 'null' ? null : value;
    }
  }
};

Then(
  'some make data header should be sent to {string}:',
  (endpoint, expectedHeaders) => {
    const assertCallback = () => {
      expect(xhrRequests.list).to.have.any.keys(endpoint);
      const xhrRequest = xhrRequests.list[endpoint].shift();
      expect(xhrRequest, `Endpoint ${endpoint} not called`).to.not.be.undefined;
      expectedHeaders.hashes().forEach(expectedHeader => {
        const headerValue =
          xhrRequest.request.headers[`x-make-${expectedHeader.name}`];
        const expectedValue = getExpectedValue(expectedHeader);
        expect(
          headerValue ? headerValue.trim() : null,
          `header x-make-${expectedHeader.name} on ${endpoint}`
        ).to.equal(expectedValue);
      });
    };
    if (!asserts.list[endpoint]) {
      asserts.list[endpoint] = [];
    }
    asserts.list[endpoint].push(assertCallback);
  }
);

Then('event {string} should not be tracked by Make', trackerName => {
  const assertCallback = () =>
    expect(xhrTrackingRequests.list).to.not.have.any.keys(trackerName);
  if (!asserts.list.postTracking) {
    asserts.list.postTracking = [];
  }
  asserts.list.postTracking.push(assertCallback);
});

Then(
  'event {string} should be tracked by Make with parameters values:',
  (trackerName, expectedParameters) => {
    const assertCallback = () => {
      expect(xhrTrackingRequests.list).to.have.any.keys(trackerName);
      const xhrRequest = xhrTrackingRequests.list[trackerName].shift();
      expect(xhrRequest, `Track "${trackerName}" not called`).to.not.be
        .undefined;
      expectedParameters.hashes().forEach(expectedParameter => {
        const body = xhrRequest.request.body || {};
        if (expectedParameter.name === 'eventType') {
          expect(
            body.eventType,
            `tracking Make ${expectedParameter.name}`
          ).to.equal(getExpectedValue(expectedParameter));
        } else {
          expect(
            body.eventParameters[expectedParameter.name],
            `tracking Make ${expectedParameter.name}`
          ).to.equal(getExpectedValue(expectedParameter));
        }
      });
    };
    if (!asserts.list.postTracking) {
      asserts.list.postTracking = [];
    }
    asserts.list.postTracking.push(assertCallback);
  }
);

Given('I monitor API {string} requests', endpoint => {
  cy.server();
  const onRequest = xhr => {
    if (!xhrRequests.list[endpoint]) {
      xhrRequests.list[endpoint] = [];
    }
    xhrRequests.list[endpoint].push(xhr);
    if (xhr.request.body && xhr.request.body.eventName) {
      if (!xhrTrackingRequests.list[xhr.request.body.eventName]) {
        xhrTrackingRequests.list[xhr.request.body.eventName] = [];
      }
      xhrTrackingRequests.list[xhr.request.body.eventName].push(xhr);
    }
  };

  cy.getEndpointParams(endpoint).then(params =>
    cy
      .route({
        ...params,
        onRequest,
      })
      .as(endpoint)
  );
});
