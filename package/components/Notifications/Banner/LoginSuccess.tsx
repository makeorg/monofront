import React from 'react';
import i18n from 'i18next';

export const LoginSuccessMessage: React.FC = () => (
  <div data-cy-container="login-banner-success">
    {i18n.t('common.notifications.login', { context: 'success' })}
  </div>
);
