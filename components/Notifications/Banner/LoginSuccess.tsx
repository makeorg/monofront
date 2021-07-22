import React from 'react';
import i18n from 'i18next';

export const LoginSuccessMessage: React.FC = () => (
  <>{i18n.t('common.notifications.login', { context: 'success' })}</>
);
