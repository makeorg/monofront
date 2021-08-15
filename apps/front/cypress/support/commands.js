// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-wait-until';

const endpoints = {
  postVote: {method: 'POST', url: '**/proposals/*/vote'},
  postTracking: {method: 'POST', url: '**/tracking/front'},
  postUnvote: {method: 'POST', url: '**/proposals/*/unvote'},
  postQualify: {method: 'POST', url: '**/proposals/*/qualification'},
  postUnqualify: {method: 'POST', url: '**/proposals/*/unqualification'},
  getStartSequence: {method: 'GET', url: '**/sequences/standard/*'},
  getPopularStartSequence: {method: 'GET', url: '**/sequences/consensus/*'},
}

Cypress.Commands.add('getEndpointParams', (name) => {
  return endpoints[name];
});

Cypress.Commands.add('monitorApiCall', (aliasName) => {
  if (!Object.keys(cy.state('aliases') || {}).includes(aliasName)) {
    cy.server();
    cy.route(endpoints[aliasName]).as(aliasName);
  }
});

Cypress.Commands.add('waitForAll', (aliasName) => {
    const pending = cy.state('requests').filter(item => {
      item.alias === aliasName && !item._hasrequestsBeenWaitedOn
    });
    if (!pending.length) {
      return;
    }
    
    return cy.wait(`@${aliasName}`);
});

// Cypress.Cookies.debug(true);
