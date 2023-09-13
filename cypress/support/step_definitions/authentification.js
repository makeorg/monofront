/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { guid } from '../index.js';
import * as user from '../../fixtures/user.json';

const now = new Date();
const userData = user;
const loginFunction = () => {
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
};

When('I login with valid identifiers', () => {
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
  loginFunction();
  cy.get(`button[data-cy-button=login]`).scrollIntoView();
  cy.get(`button[data-cy-button=login]`).click({ force: true });
  cy.get('[name=email]').type(userData.email);
  cy.get('[name=password]').type(userData.password);
  cy.get('#authentication-login-submit').click();
  cy.wait('@postUserPrivacyPolicy');
  cy.wait('@postLogin');
  cy.wait('@getUser');
  cy.wait('@getProfile');
});

When(
  'I register with email {string} and password {string}',
  (email, password) => {
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.intercept({ method: 'POST', url: '/user/check-registration' }, req => {
      expect(req.body).to.include({
        email: userData.email,
        password: userData.password,
      }),
        req.reply({
          statusCode: 200,
          body: {
            ...userData,
            email,
            password,
            lastConnection: now.toISOString(),
          },
        });
    }).as('postUser');
    cy.get('#authentication-register-submit').click();
    cy.wait('@postUser');
  }
);

// Register with or without postal code completed
When(
  'I register with firstname {string} and age {string} and postal code {string} and I accept the data policy before submitting',
  (firstname, age, postalcode) => {
    cy.get('[name=firstname]').type(firstname);
    cy.get('[name=age]').type(age);
    cy.get('[name=postalcode]')
      .clear()
      .then(() => {
        if (postalcode) cy.get('[name=postalcode]').type(postalcode);
      });
    cy.get('#registerCheckbox').click({ force: true });
    cy.intercept({ method: 'POST', url: '/user' }, req => {
      expect(req.body).to.include({
        password: userData.password,
        firstName: firstname,
        dateOfBirth: `${new Date().getFullYear() - Number(age)}-01-01`,
        postalCode: postalcode ? userData.profile?.postalCode : null,
        approvePrivacyPolicy: true,
      }),
        req.reply({
          statusCode: 200,
          body: {
            ...userData,
            email: 'unique@example.com',
            firstName: firstname,
            lastConnection: now.toISOString(),
          },
        });
    }).as('postUser');
    loginFunction();
    cy.get('#authentication-register-submit').click();
    cy.wait('@postUser');
    cy.wait('@postLogin');
    cy.wait('@getUser');
    cy.wait('@getProfile');
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
  cy.get('[name=age]').type('35');
});

When('I register with a missing age', () => {
  cy.get('[name=age]').clear();
  cy.get('[name=firstname]').type('firstnameCypress');
});

When('I register with an invalid postal code', () => {
  cy.get('[name=age]').type('35');
  cy.get('[name=firstname]').type('firstnameCypress');
  cy.get('[name=postalcode]').type('941');
});

When('I register with a wrong password {string}', password => {
  cy.get('#password').type(password);
});

When('I register with a missing data policy', () => {
  cy.get('[name=age]').type('35');
});

When('I register as minor', () => {
  cy.get('[name=firstname]').type('firstnameCypress');
  cy.get('[name=age]').type('15');
  cy.get('#registerCheckbox').click({ force: true });
  cy.get('#authentication-register-submit').click();
});

Then('I see the legal consent form', () => {
  cy.get('#legal_consent').should('exist');
});

Then('I see the register form', () => {
  cy.get('[data-cy-container=register-form]').should('exist');
});

Then('register form is closed', () => {
  cy.get('[data-cy-container=register-form]').should('not.exist');
});

Then('login form is closed', () => {
  cy.get('[data-cy-container=login-form]').should('not.exist');
});

Then('banner is closed', () => {
  cy.get(`[data-cy-container=banner]`).should('not.exist');
});

Then('I see the login form', () => {
  cy.get('[data-cy-container=login-form]').should('visible');
});

Then('I should not see login form', () => {
  cy.get('[data-cy-container=login-form]').should('not.visible');
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

Then('I clear the {string} field', fieldName => {
  cy.get(`[name=${fieldName}]`).clear();
});

Then('I display the register panel', () => {
  cy.get(`button[data-cy-button=login]`).click({ force: true }); // @todo: change this line to not force click on hidden elements
  cy.get(`button[data-cy-button=register]`).click({ force: true }); // @todo: change this line to not force click on hidden elements
  cy.get('[data-cy-container=register-form]').should('exist');
});
