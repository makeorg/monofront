import React, { FC } from 'react';
import i18n from 'i18next';

export const PasswordRecoveryFailureMessage: FC = () => (
  <>{i18n.t('reset_password.failure.bad_link')}</>
);
