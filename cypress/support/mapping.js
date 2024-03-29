const sequenceButtons = {
  'intro card start': 'start-sequence',
  'next proposal': 'next-proposal',
  'skip demographics': 'skip-demographics',
  'submit demographics': 'submit-demographics',
  'back to proposals': 'back-to-proposals',
  'back to proposals arrow': 'back-to-proposals-arrow',
  'push proposal next': 'push-proposal-next',
  'skip sign up': 'skip-sign-up',
  'previous card': 'progress-previous',
  'proposal submit': 'proposal-submit',
  'open propose panel': 'proposal-panel',
  'close panel': 'close-panel',
  'cancel proposal form': 'proposal-form-cancel',
  'demographic continue': 'demographic-continue-vote',
  'accept cookies': 'accept-cookies',
};

const headerButtons = {
  'mobile header menu': 'mobile-header-menu',
  'mobile search': 'mobile-search',
  'close mobile menu': 'mobile-header-close-menu',
  'mobile search cancel': 'mobile-header-search-cancel',
  'search submit': 'search-submit',
  'search clear': 'search-clear',
};

const footerButtons = {
  'country language switch': 'country-language-switch-panel',
};

const notificationButtons = {
  'cookie accept': 'cookie-accept',
};

const participateButtons = {
  'display propose panel': 'proposal-button',
};

const registerButtons = {
  'email register': 'email-button-register',
};

const proposalJourneyButtons = {
  'keep voting': 'keep-voting',
  'keep proposing': 'keep-proposing',
};

const proposalButtons = {
  'translation report': 'translation-report',
  'show report form': 'show-report-form',
  'submit report': 'submit-report',
  'close report confirmation': 'report-confirmation-close',
};

const buttonIdentifiers = {
  ...sequenceButtons,
  ...headerButtons,
  ...notificationButtons,
  ...footerButtons,
  ...participateButtons,
  ...registerButtons,
  ...proposalJourneyButtons,
  ...proposalButtons,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getIdentifierButtonByName = buttonName =>
  buttonIdentifiers[buttonName] ? buttonIdentifiers[buttonName] : buttonName;
