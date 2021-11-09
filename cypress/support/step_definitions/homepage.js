/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Then } from 'cypress-cucumber-preprocessor/steps';
import { pages } from './shared.js';

Then('I should be redirect to {string}', targetPage => {
  if (!pages[targetPage]) {
    throw Error(`You should define "${targetPage}" path`);
  }

  cy.url().should('include', pages[targetPage]);
});
Then(`I see {string} in the title`, title => {
  cy.get('title').should('have.text', title);
});
Then(`I see {string} as the title of the first section`, title => {
  cy.get('#featured_title').should('have.text', title);
});
Then(`I see {string} as the title of the second section`, title => {
  cy.get('#current_consultations_title').should('have.text', title);
});
Then('I see the first corporate bloc', () => {
  cy.get('#corporate_title').should(
    'have.text',
    'la politique ne suffit plus, faisons bouger les lignes ensemble'
  );
});
Then('I see the second corporate bloc', () => {
  cy.get('#who_are_we_title').should('have.text', 'nous découvrir');
});
Then('I see a list of consultation', () => {
  cy.get('#business_consultations')
    .find('ul>li')
    .should($lis => {
      expect($lis.length).to.be.at.least(3);
    });
});
Then(
  `I see {string} as the title of the {string} section`,
  (title, sectionName) => {
    cy.get(`#${sectionName}_proposals_title`).contains(title);
  }
);
