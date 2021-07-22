import React from 'react';
import i18n from 'i18next';

export const RegisterSuccessMessage: React.FC = () => (
  <>{i18n.t('common.notifications.register', { context: 'success' })}</>
);
