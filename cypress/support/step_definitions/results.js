/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const resultsPage = '/FR/consultation/:questionSlug/results';

Given(
  'I am/go on/to the results page of the question {string}',
  questionSlug => {
    const page = resultsPage.replace(':questionSlug', questionSlug);
    cy.visit(page, {
      headers: { 'Accept-language': 'fr' },
    });
  }
);
