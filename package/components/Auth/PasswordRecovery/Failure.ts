import i18n from 'i18next';

export const PasswordRecoveryFailureMessage = (): JSX.Element =>
  i18n.t('reset_password.failure.bad_link');
