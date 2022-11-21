import React from 'react';
import i18n from 'i18next';

export const AccountActivationSuccessMessage: React.FC = () => (
  <>{i18n.t('common.notifications.activate_account', { context: 'success' })}</>
);
