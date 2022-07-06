/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { pages } from './shared.js';

const checkPageExist = page => {
  if (!pages[page]) {
    throw Error(`You should define "${page}" path`);
  }
};

const resultsPage = '/FR/consultation/:questionSlug/results';

Given(
  'I am/go on/to the results page of the question {string}',
  questionSlug => {
    const page = resultsPage.replace(':questionSlug', questionSlug);
    cy.intercept('GET', 'http://localhost:9009/api/results/question-0-slug', {
      fixture: 'results.json',
    }).as('getResultsPageData');
    cy.visit(page, {
      headers: { 'Accept-language': 'fr' },
    });
    cy.wait('@getResultsPageData', { timeout: 8000 });
  }
);

When(
  'I am/go on/to the results page of the question {string}',
  questionSlug => {
    const page = resultsPage.replace(':questionSlug', questionSlug);
    cy.intercept('GET', 'http://localhost:9009/api/results/question-0-slug', {
      fixture: 'results.json',
    }).as('getResultsPageData');
    cy.visit(page, {
      headers: { 'Accept-language': 'fr' },
    });
    cy.wait('@getResultsPageData', { timeout: 8000 });
  }
);
