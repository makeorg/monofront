// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const cucumber = require('cypress-cucumber-preprocessor').default;
const htmlvalidate = require('cypress-html-validate/dist/plugin');

const htmlvalidateConfig = {
  rules: {
    'require-sri': 'off',
    'script-type': 'off',
    'no-dup-class': 'off',
    'void-style': 'warn', // fix this and pass as error,
    'long-title': 'warn',
    'aria-label-misuse': 'warn', // fix this and pass as error,
  },
};

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  require('@cypress/code-coverage/task')(on, config);
  on('file:preprocessor', cucumber());
  htmlvalidate.install(on, htmlvalidateConfig);

  return config;
};
