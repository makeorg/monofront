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

const buttonIdentifiers = {
  ...sequenceButtons,
  ...headerButtons,
  ...notificationButtons,
  ...footerButtons,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getIdentifierButtonByName = buttonName =>
  buttonIdentifiers[buttonName] ? buttonIdentifiers[buttonName] : buttonName;
