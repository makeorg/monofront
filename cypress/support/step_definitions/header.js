/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('I see Make logo', () => {
  cy.get('h1 a svg').should('be.visible');
});

Then("I don't see even if it exists Make logo", () => {
  cy.get('h1 a svg').should('not.be.visible');
});

Then('the search input in header is not visible', () => {
  cy.get(`[data-cy-container=header]`).find('input').should('not.be.visible');
});

Then('the search input in header is visible', () => {
  cy.get(`[data-cy-container=header]`).find('input').should('be.visible');
});

Then('the search input in header is not visible', () => {
  cy.get(`[data-cy-container=header]`).find('input').should('not.be.visible');
});

Then('the search input in header has focus', () => {
  cy.get(`[data-cy-container=header]`).find('input').should('has.focus');
});

Then('the search input in header has a {string} label', label => {
  cy.get(`[data-cy-container=header]`).find('form label').contains(label);
});

Then("I don't see even if it exists the mobile header menu container", () => {
  cy.get(`[data-cy-container=header]`).find('input').should('not.be.visible');
});
