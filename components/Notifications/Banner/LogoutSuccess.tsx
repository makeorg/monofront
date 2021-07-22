import React from 'react';
import i18n from 'i18next';

export const LogoutSuccessMessage: React.FC = () => (
  <>{i18n.t('common.notifications.logout', { context: 'success' })}</>
);
