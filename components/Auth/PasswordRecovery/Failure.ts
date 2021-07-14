import { i18n } from '@make.org/utils/i18n';

export const PasswordRecoveryFailureMessage = (): JSX.Element =>
  i18n.t('reset_password.failure.bad_link');
