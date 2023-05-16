/* eslint-disable no-undef */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import * as user from '../../fixtures/user.json';

const now = new Date();
const userData = user;

When('I begin typing a proposal', () => {
  cy.get('#proposal').focus();
});

Then('I dont see proposal submit description', () => {
  cy.get('#proposal-submit-description').should('not.exist');
});

Then('I see proposal submit description', () => {
  cy.get('#proposal-submit-description').should('exist');
  cy.get('#proposal-submit-description').contains(
    "Ne vous inquiétez pas, nous corrigerons vos éventuelles fautes d'orthographe."
  );
});

Then('The submit button is {string}', state => {
  cy.get('#proposal-submit-button').should(state);
});

When('I type a proposal Il faut {string}', content => {
  cy.get('#proposal').type(content);
});

When('I submit a proposal Il faut {string}', content => {
  cy.get('#proposal').type(content);
  cy.get('#proposal-submit-button').click();
});

When('I submit proposal', () => {
  cy.get('#proposal-submit-button').click();
});

// Submit proposal with anonymous mode
When('I login and submit a proposal in anonymous mode', () => {
  cy.intercept(
    {
      url: '/user/privacy-policy',
      method: 'POST',
    },
    req => {
      req.reply({
        statusCode: 200,
        body: {
          privacyPolicyApprovalDate: now.toISOString(),
        },
      });
    }
  ).as('postUserPrivacyPolicy');
  cy.intercept({ method: 'POST', url: '/oauth/make_access_token' }, req => {
    expect(req.body).to.include('TestMake'),
      req.reply({
        statusCode: 200,
        token_type: 'Bearer',
        access_token: '1000000d-100f-11b2-9bff-00000000000a',
        expires_in: 300,
        refresh_token: '2000000d-100f-11b2-9bff-00000000000b',
        refresh_expires_in: 1500,
        created_at: now.toISOString(),
      });
  }).as('postLogin');
  cy.intercept({ method: 'GET', url: '/user/current' }, req => {
    req.reply(userData);
  }).as('getUser');
  cy.intercept(
    { method: 'GET', url: `/user/${userData.userId}/profile` },
    req => {
      req.reply(userData);
    }
  ).as('getProfile');
  cy.intercept({ method: 'POST', url: '/proposals' }, req => {
    expect(req.body).to.include({
      content: 'Il faut test',
      questionId: 'question-1-id',
      isAnonymous: true,
      language: 'fr',
      country: 'FR',
    }),
      req.reply({
        statusCode: 200,
        body: {
          id: '11111111-2222-3333-4444-555555555555',
          proposalId: '11111111-2222-3333-4444-555555555555',
        },
      });
  }).as('postProposal');

  cy.get('[name=email]').type(userData.email);
  cy.get('[name=password]').type(userData.password);
  cy.get('#authentication-login-submit').click();
  cy.wait('@postUserPrivacyPolicy');
  cy.wait('@postLogin');
  cy.wait('@getUser');
  cy.wait('@getProfile');
  cy.wait('@postProposal');
});
