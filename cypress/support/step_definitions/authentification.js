/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { When, Then } from 'cypress-cucumber-preprocessor/steps';

import { guid } from '../index.js';
import * as user from '../../fixtures/user.json';

const now = new Date();
const userData = user;

When('I login with email {string} and password {string}', (email, password) => {
  cy.intercept({
    url: 'http://localhost:9000/user/privacy-policy',
    method: 'POST',
  }).as('postUserPrivacyPolicy');
  cy.intercept({
    url: 'http://localhost:9000/oauth/make_access_token',
    method: 'POST',
  }).as('postOauthAccessToken');

  cy.get(`button[data-cy-button=login]`).scrollIntoView();
  cy.get(`button[data-cy-button=login]`).click();
  cy.get('#login_title').should('be.visible');
  cy.get('[name=email]').type(email);
  cy.get('[name=password]').type(password);
  cy.get('#authentication-login-submit').click();

  cy.wait('@postUserPrivacyPolicy');
  cy.wait('@postOauthAccessToken');
});

When(
  'I register with email {string} and password {string}',
  (email, password) => {
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#authentication-register-submit').click();
  }
);

When(
  'I register with email {string} and password {string} and firstname {string} and age {string} and I accept the data policy before submitting',
  (email, password, firstname, age) => {
    const emailValue =
      email === 'unique@example.com' ? `${guid()}-fake@example.com` : email;
    cy.get('[name=email]').type(emailValue);
    cy.get('[name=password]').type(password);
    cy.get('[name=firstname]').type(firstname);
    cy.get('[name=age]').type(age);
    cy.get('#registerCheckbox').click({ force: true });
    cy.intercept({ method: 'POST', url: 'http://localhost:9000/user' }, req => {
      expect(req.body).to.include({
        password: 'TestMake',
        firstName: 'testfirstname',
        dateOfBirth: '1986-01-01',
        approvePrivacyPolicy: true,
      }),
        req.reply({
          statusCode: 200,
          body: {
            ...userData,
            email: emailValue,
            firstName: firstname,
            lastConnection: now.toISOString(),
          },
        });
    }).as('postUser');
    cy.intercept(
      { method: 'POST', url: 'http://localhost:9000/oauth/make_access_token' },
      req => {
        expect(req.body).to.include('TestMake'),
          req.reply({
            token_type: 'Bearer',
            access_token: '1000000d-100f-11b2-9bff-00000000000a',
            expires_in: 300,
            refresh_token: '2000000d-100f-11b2-9bff-00000000000b',
            refresh_expires_in: 1500,
            created_at: now.toISOString(),
          });
      }
    ).as('postLogin');
    cy.get('#authentication-register-submit').click();
    cy.wait('@postUser', { timeout: 8000 });
    cy.wait('@postLogin', { timeout: 8000 });
  }
);

When('I register with an invalid email {string}', email => {
  cy.get('[name=email]').type(email);
});

When('I register with a valid email {string}', email => {
  const emailValue =
    email === 'unique@example.com' ? `${guid()}-fake@example.com` : email;
  cy.get('[name=email]').type(emailValue);
});

When('I register with a missing password', () => {
  cy.get('[name=email]').type('unique@example.com');
});

When('I register with a missing firstname', () => {
  cy.get('[name=password]').type('testCypress');
});

When('I register with a missing age', () => {
  cy.get('[name=firstname]').type('firstnameCypress');
});

When('I register with a missing data policy', () => {
  cy.get('[name=age]').type('35');
});

When('I register as minor', () => {
  cy.get('[name=email]').type('unique@example.com');
  cy.get('[name=password]').type('testCypress');
  cy.get('[name=firstname]').type('firstnameCypress');
  cy.get('[name=age]').type('10');
  cy.get('#registerCheckbox').click({ force: true });
  cy.get('#authentication-register-submit').click();
});

Then('I see the legal consent form', () => {
  cy.get('#legal_consent').should('exist');
});

Then('I see the register form', () => {
  cy.get('form').should('exist');
});

Then('Register form is closed', () => {
  cy.get('form').should('not.visible');
});

Then('I see the login form', () => {
  cy.get('#login_title').should('visible');
});

Then('I should not see login form', () => {
  cy.get('#login_title').should('not.visible');
});

Then('Sign up form is closed', () => {
  cy.get('#register_title').should('not.visible');
});

Then('I see the proposal authentication', () => {
  cy.get('#proposal-submit-authentication').should('exist');
});

Then('I see the proposal success', () => {
  cy.get('#proposal-submit-success').should('exist');
});

Then('I see {string} message as {string} error', (errorMessage, field) => {
  cy.get(`#authentication-${field}-error`).contains(errorMessage);
});

Then('I see {string} as message error', errorMessage => {
  cy.get('#authentication-login-error').children().contains(errorMessage);
});
