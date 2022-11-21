import React from 'react';
import i18n from 'i18next';

export const AccountDeletionSuccessMessage: React.FC = () => (
  <>{i18n.t('common.notifications.delete_account', { context: 'success' })}</>
);
