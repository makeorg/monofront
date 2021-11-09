/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('I have already accepted the cookie policy', () => {
  cy.setCookie(
    'make-cookie-preferences',
    JSON.stringify({
      facebook_tracking: true,
      twitter_tracking: true,
      facebook_sharing: true,
      twitter_sharing: true,
      linkedin_sharing: true,
    })
  );
});

Then('I accept the cookie policy', () => {
  cy.getCookie('make-cookie-preferences').should(
    'have.property',
    'value',
    JSON.stringify({
      facebook_tracking: true,
      twitter_tracking: true,
      facebook_sharing: true,
      twitter_sharing: true,
      linkedin_sharing: true,
    })
  );
});

Then("I don't see cookie modal", () => {
  cy.get('[data-cy-container="cookie-modal"').should('not.exist');
});

Then('I see the cookie modal', () => {
  cy.get('[data-cy-container="cookie-modal"').should('exist');
});
