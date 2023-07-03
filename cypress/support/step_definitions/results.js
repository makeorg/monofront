/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const resultsPage = '/FR/consultation/:questionSlug/results';

Given(
  'I am/go on/to the results page of the question {string}',
  questionSlug => {
    const page = resultsPage.replace(':questionSlug', questionSlug);
    cy.intercept(
      'GET',
      'http://localhost:9009/api/question/question-0-id/results',
      {
        fixture: 'results.json',
      }
    ).as('getResultsPageData');
    cy.visit(page, {
      headers: { 'Accept-language': 'fr' },
    });
    cy.wait('@getResultsPageData', { timeout: 8000 });
  }
);
