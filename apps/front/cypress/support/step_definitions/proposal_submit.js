import { Then, When } from "cypress-cucumber-preprocessor/steps";

When('I begin typing a proposal', () => {
  cy.get('#proposal').focus();
});

Then('I dont see proposal submit description', () => {
  cy.get('#proposal-submit-description').should('not.exist');
});

Then('I see proposal submit description', () => {
  cy.get('#proposal-submit-description').should('exist');
  cy.get('#proposal-submit-description').contains('Ne vous inquiétez pas, nous corrigerons vos éventuelles fautes d\'orthographe.');
});

Then('The submit button is {string}', (state) => {
  cy.get('#proposal-submit-button').should(state);
})

When('I type a proposal Il faut {string}', (content) => {
  cy.get('#proposal').type(content);
});

When('I submit a proposal Il faut {string}', (content) => {
  cy.get('#proposal').type(content);
  cy.get('#proposal-submit-button').click();
});

When('I submit proposal', () => {
  cy.get('#proposal-submit-button').click();
});
